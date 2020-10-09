#include "Display.h"
#include "TeknikioDevice.h"
#include "pxt.h"
//#include "MicroBitImage.h"

namespace pxt {

extern TeknikioDevice teknikioDevice;

void initTeknikio();

};

#undef PXT_MAIN
#define PXT_MAIN                                                                                   \
    int main() {                                                                                   \
        pxt::initTeknikio();                                                                       \
        pxt::start();                                                                              \
        release_fiber();                                                                           \
        return 0;                                                                                  \
    }