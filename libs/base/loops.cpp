#include "pxtbase.h"

namespace loops {

/**
 * Repeats the code forever in the background. On each iteration, allows other codes to run.
 * @param body code to execute
 */
//% help=loops/forever weight=100 afterOnStart=true deprecated=true
//% blockId=forever_deprecated block="forever" blockAllowMultiple=1
void forever(Action a) {
    runForever(a);
}

/**
 * Pause for the specified time in milliseconds
 * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
 */
//% help=loops/pause weight=99 deprecated=true
//% async block="pause %pause=timePicker|ms"
//% blockId=device_pause_deprecated
void pause(int ms) {
    if (ms < 0) return;
    sleep_ms(ms);
}

}