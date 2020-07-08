namespace pxsim.input {
    export function onGesture(gesture: number, handler: RefAction) {
        let b = accelerometer();
        b.accelerometer.activate();

        if (gesture == DAL.ACCELEROMETER_EVT_SHAKE && !b.useShake) {
            b.useShake = true;
            runtime.queueDisplayUpdate();
        }
        pxtcore.registerWithDal(DAL.DEVICE_ID_GESTURE, gesture, handler);
    }

    export function rotation(kind: number): number {
        let b = accelerometer();
        let acc = b.accelerometer;
        acc.activate();
        let x = acc.getX(MicroBitCoordinateSystem.NORTH_EAST_DOWN);
        let y = acc.getY(MicroBitCoordinateSystem.NORTH_EAST_DOWN);
        let z = acc.getZ(MicroBitCoordinateSystem.NORTH_EAST_DOWN);

        let roll = Math.atan2(y, z);
        let pitch = Math.atan(-x / (y * Math.sin(roll) + z * Math.cos(roll)));

        let r = 0;
        switch (kind) {
            case 0: r = pitch; break;
            case 1: r = roll; break;
        }
        return Math.floor(r / Math.PI * 180);
    }

    export function setAccelerometerRange(range: number) {
        let b = accelerometer();
        b.accelerometer.setSampleRange(range);
    }

    export function acceleration(dimension: number): number {
        let b = accelerometer();
        let acc = b.accelerometer;
        acc.activate();
        switch (dimension) {
            case 0: return acc.getX();
            case 1: return acc.getY();
            case 2: return acc.getZ();
            default: return Math.floor(Math.sqrt(acc.instantaneousAccelerationSquared()));
        }
    }
}

namespace pxsim {
    interface AccelerometerSample {
        x: number;
        y: number;
        z: number;
    }

    interface ShakeHistory {
        x: boolean;
        y: boolean;
        z: boolean;
        count: number;
        shaken: number;
        timer: number;
    }

    /**
      * Co-ordinate systems that can be used.
      * RAW: Unaltered data. Data will be returned directly from the accelerometer.
      *
      * SIMPLE_CARTESIAN: Data will be returned based on an easy to understand alignment, consistent with the cartesian system taught in schools.
      * When held upright, facing the user:
      *
      *                            /
      *    +--------------------+ z
      *    |                    |
      *    |       .....        |
      *    | *     .....      * |
      * ^  |       .....        |
      * |  |                    |
      * y  +--------------------+  x-->
      *
      *
      * NORTH_EAST_DOWN: Data will be returned based on the industry convention of the North East Down (NED) system.
      * When held upright, facing the user:
      *
      *                            z
      *    +--------------------+ /
      *    |                    |
      *    |       .....        |
      *    | *     .....      * |
      * ^  |       .....        |
      * |  |                    |
      * x  +--------------------+  y-->
      *
      */
    export enum MicroBitCoordinateSystem {
        RAW,
        SIMPLE_CARTESIAN,
        NORTH_EAST_DOWN
    }

    export class Accelerometer {
        private sigma: number = 0;              // the number of ticks that the instantaneous gesture has been stable.
        private lastGesture: number = 0;       // the last, stable gesture recorded.
        private currentGesture: number = 0     // the instantaneous, unfiltered gesture detected.
        private sample: AccelerometerSample = { x: 0, y: 0, z: -1023 }
        private shake: ShakeHistory = { x: false, y: false, z: false, count: 0, shaken: 0, timer: 0 }; // State information needed to detect shake events.
        private pitch: number;
        private roll: number;
        private id: number;
        public isActive = false;
        public sampleRange = 2;

        constructor(public runtime: Runtime) {
            this.id = DAL.DEVICE_ID_ACCELEROMETER;
        }

        public setSampleRange(range: number) {
            this.activate();
            this.sampleRange = Math.max(1, Math.min(8, range));
        }

        public activate() {
            if (!this.isActive) {
                this.isActive = true;
                this.runtime.queueDisplayUpdate();
            }
        }

        /**
         * Reads the acceleration data from the accelerometer, and stores it in our buffer.
         * This is called by the tick() member function, if the interrupt is set!
         */
        public update(x: number, y: number, z: number) {
            // read MSB values...
            this.sample.x = Math.floor(x);
            this.sample.y = Math.floor(y);
            this.sample.z = Math.floor(z);

            // Update gesture tracking
            this.updateGesture();

            // Indicate that a new sample is available
            board().bus.queue(this.id, DAL.ACCELEROMETER_EVT_DATA_UPDATE)
        }

        public instantaneousAccelerationSquared() {
            // Use pythagoras theorem to determine the combined force acting on the device.
            return this.sample.x * this.sample.x + this.sample.y * this.sample.y + this.sample.z * this.sample.z;
        }

        /**
         * Service function. Determines the best guess posture of the device based on instantaneous data.
         * This makes no use of historic data (except for shake), and forms this input to the filter implemented in updateGesture().
         *
         * @return A best guess of the current posture of the device, based on instantaneous data.
         */
        private instantaneousPosture(): number {
            let force = this.instantaneousAccelerationSquared();
            let shakeDetected = false;

            // Test for shake events.
            // We detect a shake by measuring zero crossings in each axis. In other words, if we see a strong acceleration to the left followed by
            // a string acceleration to the right, then we can infer a shake. Similarly, we can do this for each acxis (left/right, up/down, in/out).
            //
            // If we see enough zero crossings in succession (MICROBIT_ACCELEROMETER_SHAKE_COUNT_THRESHOLD), then we decide that the device
            // has been shaken.
            if ((this.getX() < -DAL.ACCELEROMETER_SHAKE_TOLERANCE && this.shake.x) || (this.getX() > DAL.ACCELEROMETER_SHAKE_TOLERANCE && !this.shake.x)) {
                shakeDetected = true;
                this.shake.x = !this.shake.x;
            }

            if ((this.getY() < -DAL.ACCELEROMETER_SHAKE_TOLERANCE && this.shake.y) || (this.getY() > DAL.ACCELEROMETER_SHAKE_TOLERANCE && !this.shake.y)) {
                shakeDetected = true;
                this.shake.y = !this.shake.y;
            }

            if ((this.getZ() < -DAL.ACCELEROMETER_SHAKE_TOLERANCE && this.shake.z) || (this.getZ() > DAL.ACCELEROMETER_SHAKE_TOLERANCE && !this.shake.z)) {
                shakeDetected = true;
                this.shake.z = !this.shake.z;
            }

            if (shakeDetected && this.shake.count < DAL.ACCELEROMETER_SHAKE_COUNT_THRESHOLD && ++this.shake.count == DAL.ACCELEROMETER_SHAKE_COUNT_THRESHOLD)
                this.shake.shaken = 1;

            if (++this.shake.timer >= DAL.ACCELEROMETER_SHAKE_DAMPING) {
                this.shake.timer = 0;
                if (this.shake.count > 0) {
                    if (--this.shake.count == 0)
                        this.shake.shaken = 0;
                }
            }

            if (this.shake.shaken)
                return DAL.ACCELEROMETER_EVT_SHAKE;

            let sq = (n: number) => n * n

            if (force < sq(DAL.ACCELEROMETER_FREEFALL_TOLERANCE))
                return DAL.ACCELEROMETER_EVT_FREEFALL;

            if (force > sq(DAL.ACCELEROMETER_3G_TOLERANCE))
                return DAL.ACCELEROMETER_EVT_3G;

            if (force > sq(DAL.ACCELEROMETER_6G_TOLERANCE))
                return DAL.ACCELEROMETER_EVT_6G;

            if (force > sq(DAL.ACCELEROMETER_8G_TOLERANCE))
                return DAL.ACCELEROMETER_EVT_8G;

            // Determine our posture.
            if (this.getX() < (-1000 + DAL.ACCELEROMETER_TILT_TOLERANCE))
                return DAL.ACCELEROMETER_EVT_TILT_LEFT;

            if (this.getX() > (1000 - DAL.ACCELEROMETER_TILT_TOLERANCE))
                return DAL.ACCELEROMETER_EVT_TILT_RIGHT;

            if (this.getY() < (-1000 + DAL.ACCELEROMETER_TILT_TOLERANCE))
                return DAL.ACCELEROMETER_EVT_TILT_UP;

            if (this.getY() > (1000 - DAL.ACCELEROMETER_TILT_TOLERANCE))
                return DAL.ACCELEROMETER_EVT_TILT_DOWN;

            if (this.getZ() < (-1000 + DAL.ACCELEROMETER_TILT_TOLERANCE))
                return DAL.ACCELEROMETER_EVT_FACE_UP;

            if (this.getZ() > (1000 - DAL.ACCELEROMETER_TILT_TOLERANCE))
                return DAL.ACCELEROMETER_EVT_FACE_DOWN;

            return 0;
        }

        updateGesture() {
            // Determine what it looks like we're doing based on the latest sample...
            let g = this.instantaneousPosture();

            // Perform some low pass filtering to reduce jitter from any detected effects
            if (g == this.currentGesture) {
                if (this.sigma < DAL.ACCELEROMETER_GESTURE_DAMPING)
                    this.sigma++;
            }
            else {
                this.currentGesture = g;
                this.sigma = 0;
            }

            // If we've reached threshold, update our record and raise the relevant event...
            if (this.currentGesture != this.lastGesture && this.sigma >= DAL.ACCELEROMETER_GESTURE_DAMPING) {
                this.lastGesture = this.currentGesture;
                board().bus.queue(DAL.DEVICE_ID_GESTURE, this.lastGesture);
            }
        }

        /**
          * Reads the X axis value of the latest update from the accelerometer.
          * @param system The coordinate system to use. By default, a simple cartesian system is provided.
          * @return The force measured in the X axis, in milli-g.
          *
          * Example:
          * @code
          * uBit.accelerometer.getX();
          * uBit.accelerometer.getX(RAW);
          * @endcode
          */
        public getX(system: MicroBitCoordinateSystem = MicroBitCoordinateSystem.SIMPLE_CARTESIAN): number {
            this.activate();
            let val: number;            
            switch (system) {
                case MicroBitCoordinateSystem.SIMPLE_CARTESIAN:
                    val = -this.sample.x;

                case MicroBitCoordinateSystem.NORTH_EAST_DOWN:
                    val = this.sample.y;
                //case MicroBitCoordinateSystem.SIMPLE_CARTESIAN.RAW:
                default:
                    val = this.sample.x;
            }

            return (board() as AccelerometerBoard).invertAccelerometerXAxis ? val * -1 : val;
        }

        /**
          * Reads the Y axis value of the latest update from the accelerometer.
          * @param system The coordinate system to use. By default, a simple cartesian system is provided.
          * @return The force measured in the Y axis, in milli-g.
          *
          * Example:
          * @code
          * uBit.accelerometer.getY();
          * uBit.accelerometer.getY(RAW);
          * @endcode
          */
        public getY(system: MicroBitCoordinateSystem = MicroBitCoordinateSystem.SIMPLE_CARTESIAN): number {
            this.activate();
            let val: number;
            switch (system) {
                case MicroBitCoordinateSystem.SIMPLE_CARTESIAN:
                    val = -this.sample.y;

                case MicroBitCoordinateSystem.NORTH_EAST_DOWN:
                    val = -this.sample.x;
                //case RAW:
                default:
                    val = this.sample.y;
            }

            return (board() as AccelerometerBoard).invertAccelerometerYAxis ? val * -1 : val;
        }

        /**
          * Reads the Z axis value of the latest update from the accelerometer.
          * @param system The coordinate system to use. By default, a simple cartesian system is provided.
          * @return The force measured in the Z axis, in milli-g.
          *
          * Example:
          * @code
          * uBit.accelerometer.getZ();
          * uBit.accelerometer.getZ(RAW);
          * @endcode
          */
        public getZ(system: MicroBitCoordinateSystem = MicroBitCoordinateSystem.SIMPLE_CARTESIAN): number {
            this.activate();
            let val: number;            
            switch (system) {
                case MicroBitCoordinateSystem.NORTH_EAST_DOWN:
                    val = -this.sample.z;
                //case MicroBitCoordinateSystem.SIMPLE_CARTESIAN:
                //case MicroBitCoordinateSystem.RAW:
                default:
                    val = this.sample.z;
            }

            return (board() as AccelerometerBoard).invertAccelerometerZAxis ? val * -1 : val;
        }

        /**
          * Provides a rotation compensated pitch of the device, based on the latest update from the accelerometer.
          * @return The pitch of the device, in degrees.
          *
          * Example:
          * @code
          * uBit.accelerometer.getPitch();
          * @endcode
          */
        public getPitch(): number {
            this.activate();
            return Math.floor((360 * this.getPitchRadians()) / (2 * Math.PI));
        }

        getPitchRadians(): number {
            this.recalculatePitchRoll();
            return this.pitch;
        }

        /**
          * Provides a rotation compensated roll of the device, based on the latest update from the accelerometer.
          * @return The roll of the device, in degrees.
          *
          * Example:
          * @code
          * uBit.accelerometer.getRoll();
          * @endcode
          */
        public getRoll(): number {
            this.activate();
            return Math.floor((360 * this.getRollRadians()) / (2 * Math.PI));
        }

        getRollRadians(): number {
            this.recalculatePitchRoll();
            return this.roll;
        }

        /**
         * Recalculate roll and pitch values for the current sample.
         * We only do this at most once per sample, as the necessary trigonemteric functions are rather
         * heavyweight for a CPU without a floating point unit...
         */
        recalculatePitchRoll() {
            let x = this.getX(MicroBitCoordinateSystem.NORTH_EAST_DOWN);
            let y = this.getY(MicroBitCoordinateSystem.NORTH_EAST_DOWN);
            let z = this.getZ(MicroBitCoordinateSystem.NORTH_EAST_DOWN);

            this.roll = Math.atan2(y, z);
            this.pitch = Math.atan(-x / (y * Math.sin(this.roll) + z * Math.cos(this.roll)));
        }

    }

    export class AccelerometerState {
        accelerometer: Accelerometer;
        useShake = false;
        private tiltDecayer = 0;
        private element: HTMLElement | SVGElement;

        constructor(runtime: Runtime) {
           this.accelerometer = new Accelerometer(runtime);
        }

        attachEvents(element: HTMLElement | SVGElement) {
            this.element = element;
            this.tiltDecayer = 0;
            this.element.addEventListener(pointerEvents.move, (ev: MouseEvent) => {
                if (!this.accelerometer.isActive) return;
                if (this.tiltDecayer) {
                    clearInterval(this.tiltDecayer);
                    this.tiltDecayer = 0;
                }

                let bbox = element.getBoundingClientRect();
                let ax = (ev.clientX - bbox.width / 2) / (bbox.width / 3);
                let ay = (ev.clientY - bbox.height / 2) / (bbox.height / 3);

                let x = - Math.max(- 1023, Math.min(1023, Math.floor(ax * 1023)));
                let y = Math.max(- 1023, Math.min(1023, Math.floor(ay * 1023)));
                let z2 = 1023 * 1023 - x * x - y * y;
                let z = Math.floor((z2 > 0 ? -1 : 1) * Math.sqrt(Math.abs(z2)));

                this.accelerometer.update(-x, y, z);
                this.updateTilt();
            }, false);
            this.element.addEventListener(pointerEvents.leave, (ev: MouseEvent) => {
                if (!this.accelerometer.isActive) return;

                if (!this.tiltDecayer) {
                    this.tiltDecayer = setInterval(() => {
                        let accx = this.accelerometer.getX();
                        accx = Math.floor(Math.abs(accx) * 0.85) * (accx > 0 ? 1 : -1);
                        let accy = this.accelerometer.getY();
                        accy = Math.floor(Math.abs(accy) * 0.85) * (accy > 0 ? 1 : -1);
                        let accz = -Math.sqrt(Math.max(0, 1023 * 1023 - accx * accx - accy * accy));
                        if (Math.abs(accx) <= 24 && Math.abs(accy) <= 24) {
                            clearInterval(this.tiltDecayer);
                            this.tiltDecayer = 0;
                            accx = 0;
                            accy = 0;
                            accz = -1023;
                        }
                        this.accelerometer.update(accx, accy, accz);
                        this.updateTilt();
                    }, 50)
                }
            }, false);            
        }

        private updateTilt() {
            if (!this.accelerometer.isActive || !this.element) return;
    
            const x = this.accelerometer.getX();
            const y = this.accelerometer.getY();
            const af = 8 / 1023;
            const s = 1 - Math.min(0.1, Math.pow(Math.max(Math.abs(x), Math.abs(y)) / 1023, 2) / 35);
    
            this.element.style.transform = `perspective(30em) rotateX(${y * af}deg) rotateY(${x * af}deg) scale(${s}, ${s})`
            this.element.style.perspectiveOrigin = "50% 50% 50%";
            this.element.style.perspective = "30em";
        }            
    }
}