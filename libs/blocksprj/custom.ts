
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

// //% weight=50 color=#185C87 icon=""
// namespace custom {
//
//
//   // Sample Block Definition:
//   //
//   // /**
//   //  * TODO: describe your function here
//   //  * @param n describe parameter here, eg: 5
//   //  * @param s describe parameter here, eg: "Hello"
//   //  * @param e describe parameter here
//   //  */
//   // //% block
//   // export function foo(n: number, s: string, e: MyEnum): void {
//   //   // Add code here
//   // }
//
//   /**
//    * Given a number, "n" print the fibonacci sequence up to the n-th number.
//    * @param n user-defined number, eg: 5
//    */
//   //% block
//   export function fib(n: number): number {
//     return n <= 1 ? n : fib(n -1) + fib(n - 2);
//   }
// }
//
// //% weight=90 color=#81ecec icon="" block="Custom Two"
// namespace custom_two {
//
//   /**
//    * Print a message
//    * @param msg user defined message, eg: "Hello"
//    */
//   //% block
//   export function print(msg: string): void {
//     console.log(msg);
//   }
//
// }

//% weight=50 color=#51031D icon="" block="DEVICES"
namespace devices {

  /**
   //    * [PLACEHOLDER] Print a message
   //    * @param msg user defined message, eg: "Hello"
   //    */
   //% block
   export function print(msg: string): void {
     console.log(msg);
   }

}

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

//% weight=90 color=#185C87 icon="" block="LED"
namespace light {}

//% weight=85 icon=""
namespace variables {}

//% weight=80 icon="f698"
namespace math {}

//% weight=65 icon="f01e"
namespace loops {}

//% weight=60
namespace logic {}

//% advanced=true
namespace input {}


