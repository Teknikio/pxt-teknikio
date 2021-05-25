#include "Display.h"
#include "TeknikioDevice.h"
#include "pxtbase.h"

//#include "MicroBitImage.h"

namespace pxt {

extern TeknikioDevice bluebird;

void initTeknikio();

};


#undef PXT_MAIN
#define PXT_MAIN                                                                                   \
    int main() {                                                                                   \
        pxt::initTeknikio();                                                                     \
        pxt::start();                                                                              \
        return 0;                                                                                  \
    }