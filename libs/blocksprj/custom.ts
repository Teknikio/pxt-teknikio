
/**
 * Use this file to define custom functions and blocks.
 */

/*
 * Each namespace represents a custom block, the name of the block (when displayed in the MakeCode editor) will
 * match the name of the provided namespace, unless another name is defined (under `block="Custom Name"` in the
 * annotations).
 *
 * Functions defined within a namespace will appear as available functions to use within that block category.
 * If you click on a block within the MakeCode editor it will display the available functions for that block.
 *
 * Blocks need to be annotates with //% to be included, annotations also allow you to set the color and icon
 * associated with a block. Read more at https://github.com/microsoft/pxt/blob/master/docs/defining-blocks.md
 */

/**
 * Custom blocks
 */

/*
 * Blocks Added Via Extensions
 *     Add required libraries to libs/ folder and reference as a dependency in libs/teknikio-bluebird/pxt.json
 *
 *     If colors, names, or icons need to be updated, reference the block by it's namespace (should match the default block name)
 *     and make any necessary changes here.
 */

//% weight=100 color=#185C87 icon=""
namespace pins {}

//% weight=95 color=#185C87 icon="" block="MUSIC"
namespace music {}

//% weight=85 color=#185C87 block="Sensors"
namespace input {


}

//% weight=80 icon=""
namespace variables {}

//% weight=75 icon="f698"
namespace math {}

//% weight=65 icon="f01e"
namespace loops {}

//% weight=60
namespace logic {}

//% weight=100 color=#185C87 icon=""
namespace sensors {}

//% weight=90 color=#185C87 icon="" block="LED"
namespace rgb {

  //% block.loc.es-ES="Elige el brillo del NeoPixel"
  //% block.loc.es="Elige el brillo del NeoPixel 2"
  //% block.loc.ES="Elige el brillo del NeoPixel 3"
  //% block.loc.[es-ES]="Elige el brillo del NeoPixel 4"
  //% block.loc[es-ES]="Elige el brillo del NeoPixel 5"
  //% block="Set NeoPixel color %rgb=colorNumberPicker"
  export function setColor(rgb: number): void {
      light.setAll(rgb);
  }

  //%block="Set NeoPixel brightness %brightness"
  export function setBrightness(brightness: number): void {
      light.setBrightness(brightness);
  }

  //% red.min=0 red.max=255 green.min=0 green.max=255 blue.min=0 blue.max=255
  //%block="red %red|green %green|blue %blue"
  export function rgb(red: number, green: number, blue: number): void {
    light.setAll(((red & 0xFF) << 16) | ((green & 0xFF) << 8) | (blue & 0xFF));
  }


}
