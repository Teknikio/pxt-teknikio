# Bluebird Hardware Overview
The Bluebird hardware is built around the nRF52840 chipset.  The nRF52840 combines network and application processing into a single chipset and includes support for a variety of on-chip peripherals.  Bluebird leverages the nRF52840’s integrated USB 2.0 controller for both drag-and-drop programming and debugging without requiring any additional hardware. Bluebird includes a 6-axis accelerometer, light/color sensor, piezo speaker, Neopixel LED, and temperature sensor.
 
Two key pieces of information to help understand the internals of the Bluebird is schematic, which shows the detailed component data and connectivity of the device.

![](/static/bluebird/bluebirdspec.png)

# Hardware Description
nRF52 Application Processor
The nRF52 application processor is where user programs run. A single, complete application including user code, runtime code and Bluetooth stack is loaded and run directly from on chip flash memory. All user accessible GPIO pins are provided by this processor. There is an onboard 2.4GHz radio engine used to provide Bluetooth capabilities via an off-chip aerial.

| Item  |     Details     |  
|----------|-------------|
| Model |  Nordic nRF52840|
| Core variant |    ARM Cortex-M4 32 bit processor  |  
| Flash ROM |1MB|  
| RAM | 256kB|
| Speed |64MHz|
| Debug |SWD, jlink/OB|
| More Info |MDBT50Q-1MV2 & MDBT50Q-P1MV2 Spec (Ver.G) (for Revision 2 IC)|

# Bluetooth Wireless Communication
The on board 2.4GHz transceiver supports Bluetooth communications via the Nordic S140 SoftDevice, which provides a fully qualified Bluetooth low energy stack. This allows the Bluebird to communicate with a wide range of Bluetooth devices, including smartphones and tablets.

| Item  |     Details     |  
|----------|-------------|
| Band|  2.4GHz|
| Channels|    0 channels (0 to 39), 3 advertising channels (37,38,39) |  
| Sensitivity|-95dBm in Bluetooth low energy mode|  
| Tx Power| -20dBM to 8dBm in 4 dB steps|
| Role | Dual-mode GAP Peripheral and GAP Central|
| Congestion avoidance| Adaptive Frequency Hopping|
|Profiles | Bluebird GATT profile|
| More Info |Bluetooth|


# Reset Button
The button on the front of the Bluebird, is tactile momentary push to reset purpose.
A pullup resistor ensures a logical ‘1’ when the button is released, and a logical ‘0’ when the button is pressed.

| Item  |     Details     |  
|----------|-------------|
|Type| 1 tactile system button|
|Hardware |Debounce|
|Pullup|  external 10k|


# Display
The display is a smart LED control circuit and light emitting circuit in one controlled LED source. It is connected to the Bluebird through a unipolar NRZ communication mode.

| Item  |     Details     |  
|----------|-------------|
|Type |Integrated light source intelligent control|
|Intensity control| 256 Gray level adjusting circuit|
|Intensity range| 0 lm - 4lm|


# Motion sensor
The 1.7 Bluebird variant has a combined accelerometer and gyroscope chip that provides 6-axis MotionTracking. This device is connected to the application processor via the I2C bus.

| Item  |     Details     |  
|----------|-------------|
|Model |ICM-20600|
|Features |3 gyroscope ±250/±500/±1000 dps/±2000 dps  and 3 acceleration axis , 2/4/8/16g ranges |
|Resolution |16 bits|

# Temperature Sensing
The ICM-20600 has an integrated temperature sensor. It provides an estimate of the ambient temperature

| Item  |     Details     |  
|----------|-------------|
|Type |on-core ICM-20600|
|Sensing range |-40C .. 85C|
|Resolution |1.9m°C steps|
|Accuracy |+/-2.5%|

# Light/Color Sensing
The Bluebird integrates an analog ambient light sensor. This sensor is placed next to Neopixel LED in order to allow color sensor measurements via software using the measurement for a specific color emitted by the Neopixel LED and measured by the ALS.

| Item  |     Details     |  
|----------|-------------|
|Type| Analog Output|
|Sensing range |0 - 4000 Lux|
|Resolution |Continuous|
|More Info |ALS-PT19-315C/L177/TR8|

# Speaker
The Bluebird integrates a speaker controlled by PWM.

| Item  |     Details     |  
|----------|-------------|
|Type |ELECTRO-MAGNETIC TRANSDUCER|
|Resonant Frequency |4kHz|
|Sound Power |75db at 15cm|
|More Info |HQT5020 Datasheet|

# General Purpose Input/Output Pins

The central breakout connector brings out many of the GPIO circuits of the application processor. None of these circuits are shared with other functions of the Bluebird.
Note: the nRF52840 datasheet states that GPIO pins may be in std-drive (15mA) and high-drive (5mA) mode, with a maximum of 3 pins in high-drive mode at any one time.


| Item  |    Details V1.6    |  Details V1.7 |
|----------|-------------|-------------|
|I/O Pads| 4  outer I/O pads, 2.4mm plug, conductive tape, thread, and crocodile clip compatible |4 outer I/O pads, 4mm plug conductive tape, thread, and crocodile clip compatible |
|Power Pads | 2 outer 3.3vout power rings and 4 ground power pads, 2.4mm plug and crocodile clip compatible | 2  outer 3.3vout power pads and 4 ground power rings, 4mm plug and crocodile clip compatible|
|GPIO features |10 assignable GPIO pins on central breakout connector, 8 digital, 2 PWM, 4 large IO pads can be assigned as either analog and digital |10 assignable GPIO pins on central breakout connector, 8 digital, 2 PWM, 4 large IO pads can be assigned as either analog and digital|
|ADC resolution |12 bit (0..4095) | 12 bit (0..4095)
|Central Connector |Central connector |Central connector|
|Pitch |2.54mm, 2x5. | 2.54mm, 2x5.|
|Pads |10 pads, with 2.4mm holes |10 pads, with 4mm holes|

# Power Supply
Power to the Bluebird may be provided via the USB connection, or via a battery plugged into the top connector.
Note:  The + pads on the side CANNOT be used to supply the Bluebird, these are Vout pads for external sensors.

| Item  |    Details V1.6    |  Details V1.7 |
|----------|-------------|-------------|
|Operating range  |1.8V - 3.6V  |1.8V - 5.5V |
|Input current  |Up to 311mA  |Up to 1.41A (under 1.8V) |
 |Onboard Peripherals budget  |28mA  |28mA |
 |Battery connector  |Header 2.54mm pitch | Header 2.54mm pitch |
 |Max current provided via  central connector | 170mA | 770mA |
|More Info  |Power supply ||


# USB Communication
The Bluebird has an on board USB communications stack, that is built into the firmware of the NRF52840 chip. This stack provides the ability to drag and drop UF2 files onto the NRF52BOOT drive in order to load code into the application processor. It also allows serial data to be streamed to and from the Bluebird application processor over USB to an external host computer

| Item  |     Details     |  
|----------|-------------|
|Connector |USB micro|
|USB version |2.0 Full Speed device|
|Speed |12Mbit/sec|
|USB classes supported |Mass Storage Class (MSC)|
|More Info |Communications Device Class (CDC)|

# Debugging

The JTAG interface allows debugging through the connector J1. In order to access to this connection you need to use TagConnect connector

| Item  |     Details     |  
|----------|-------------|
|Protocol| SWD|
|Options |DWT, ETM and ITM|
|More Info |JLink debugger suite|

# Mechanical
You can find 2D and 3D CAD drawings and models of the Bluebird including all the important dimensions. These models can be used as a basis for generating marketing and project images of the Bluebird, but also as a basis for accurate manufacture of attachments e.g. via 3D printing.

| Item  |     Details     |  
|----------|-------------|
|Dimensions |6,82cm(w) 5,08cm(h)|
|Weight |7g|
