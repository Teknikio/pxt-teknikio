declare namespace pins {

    //% fixedInstance shim=pxt::getPin(PIN_A1)
    const A1: PwmPin;
    //% fixedInstance shim=pxt::getPin(PIN_A2)
    const A2: PwmPin;
    //% fixedInstance shim=pxt::getPin(PIN_A3)
    const A3: PwmPin;
    //% fixedInstance shim=pxt::getPin(PIN_A4)
    const A4: PwmPin;
    //% fixedInstance shim=pxt::getPin(PIN_A5)
    const A5: PwmPin;
    //% fixedInstance shim=pxt::getPin(PIN_A6)
    const A6: PwmPin;

    //% fixedInstance shim=pxt::getPin(PIN_D7)
    const D7: DigitalInOutPin;
    //% fixedInstance shim=pxt::getPin(PIN_D8)
    const D8: DigitalInOutPin;
    //% fixedInstance shim=pxt::getPin(PIN_D9)
    const D9: DigitalInOutPin;
    //% fixedInstance shim=pxt::getPin(PIN_D10)
    const D10: DigitalInOutPin;
    //% fixedInstance shim=pxt::getPin(PIN_D12)
    const D12: DigitalInOutPin;
    //% fixedInstance shim=pxt::getPin(PIN_D13)
    const D13: DigitalInOutPin;
    //% fixedInstance shim=pxt::getPin(PIN_D14)
    const D14: DigitalInOutPin;

}

declare namespace input {
    /**
     * Button connecting A0 to GND.
     */
    //% block="button A0" fixedInstance
    //% shim=pxt::getButtonByPin(PIN_A0,BUTTON_ACTIVE_LOW_PULL_UP)
    //% parts="buttons"
    const buttonA0: Button;

    /**
     * Button connecting A1 to GND.
     */
    //% block="button A1" fixedInstance
    //% shim=pxt::getButtonByPin(PIN_A1,BUTTON_ACTIVE_LOW_PULL_UP)
    //% parts="buttons"
    const buttonA1: Button;

    /**
     * Button connecting A2 to GND.
     */
    //% block="button A2" fixedInstance
    //% shim=pxt::getButtonByPin(PIN_A2,BUTTON_ACTIVE_LOW_PULL_UP)
    //% parts="buttons"
    const buttonA2: Button;

    /**
     * Button connecting A3 to GND.
     */
    //% block="button A3" fixedInstance
    //% shim=pxt::getButtonByPin(PIN_A3,BUTTON_ACTIVE_LOW_PULL_UP)
    //% parts="buttons"
    const buttonA3: Button;

    /**
     * Button connecting A4 to GND.
     */
    //% block="button A4" fixedInstance
    //% shim=pxt::getButtonByPin(PIN_A4,BUTTON_ACTIVE_LOW_PULL_UP)
    //% parts="buttons"
    const buttonA4: Button;

    /**
     * Button connecting A5 to GND.
     */
    //% block="button A5" fixedInstance
    //% shim=pxt::getButtonByPin(PIN_A5,BUTTON_ACTIVE_LOW_PULL_UP)
    //% parts="buttons"
    const buttonA5: Button;
}
