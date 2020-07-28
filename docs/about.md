![](/static/bb/about_cover.png)

# About

## @description A Blocks / Javascript code editor for the micro:bit, a pocket-size computer with 5x5 display, sensors and Bluetooth.

The [Teknikio Bluebird](https://www.teknikio.com/products/bluebird-beta-v1-6) is a [small blue gadget](/device) that can send and receive information wirelessly. The board has a Neopixel LED, speaker, Bluetooth and sensors that can be programmed by both beginners and expert coders. The development of Bluebird was funded by the National Science Foundation.


The Bluebird is a great tool to learn how to build circuits, code, and scale your ideas to an IoT network. It can attach easily to different materials to become a futuristic gizmo or wearable.  Similar to  Arduino, the Bluebird can also  connect with external sensors, and outputs via the central connector.


## [Hardware: The Bluebird](/device)

The Bluebird board is embedded with sensors, radio and other fun stuff. to get the most out of your board, check the [hardware components](/device)!

## ~ hint

**Looking to buy a Bluebird?** Get one from our [online shop](https://www.teknikio.com/products/bluebird-beta-v1-6).

## ~
## [Getting Started](/device)

Depending on the platform you are using, following the guides below to get started on coding your first project.

* [Tekniverse for Browser](https://docs.google.com/presentation/d/1XYVt2hgc4dgBF8NJ9_6Ig-4CJCHHIxLFofamozT7LPg/edit?usp=sharing)
* [Tekniverse for iOS](https://docs.google.com/presentation/d/1BYNRtuaQITB8Gv3gp-L27aF_1e40ChojV6TbpLfoeQ8/edit?usp=sharing)
* [Tekniverse for macOS (Catalina or higher)](https://docs.google.com/presentation/d/1XYVt2hgc4dgBF8NJ9_6Ig-4CJCHHIxLFofamozT7LPg/edit?usp=sharing)
* [Arduino IDE](https://docs.google.com/presentation/d/1aYCl8GMwqa82yhmZYFZRAFoSpRtjT8LwkdEfhVQePGM/edit?usp=sharing)

## Web Dashboard: [Control Center](/)
The first "tool" that you have in the menu is the [Control Center](/controlcenter). Here you can see incoming data from the sensor on the board, change the LED color and play tones on the speaker! You can also save and record data to your account if you are signed in. Learn more about accounts here.



## ~
## Web Programming: [Blocks](/blocks) or [JavaScript](/javascript)

You can program the Bluebird in this web browser using [Blocks](/blocks) or [JavaScript](/javascript) via the [Bluebird APIs](/reference):

```block
input.onButtonPressed(Button.A, () => {
    basic.showString("Hi!");
})
```
```typescript
input.onButtonPressed(Button.A, () => {
    basic.showString("Hi!");
})
```

The editor work in [most modern browsers](/browsers).

## [Compile and Flash: Your Program!](/device/usb)

When you have your code ready, you connect your Bluebird to a computer via a USB cable, it will appear as a mounted drive (named TEKBOOT).

Compilation to ARM thumb machine code from Blocks or JavaScript happens in the browser. You save the ARM binary program to a file, which you then copy to the TEKBOOT drive, which flashes the Bluebird device with the new program.


## Simulator: Test Your Code

You can run your code using the Bluebird simulator, all within the confines of a web browser. The simulator has support for the LED screen, buttons, as well as compass, accelerometer, and digital I/O pins.


```sim
basic.forever(() => {
  basic.showString("Hi!");
})
input.onButtonPressed(Button.A, () => {
    led.stopAnimation();
    basic.showLeds(`
. . . . .
. # . # .
. . . . .
# . . . #
. # # # .`);
});
input.onButtonPressed(Button.B, () => {
    led.stopAnimation();
    basic.showLeds(`
. # . # .
# . # . #
# . . . #
. # . # .
. . # . .`);
});
```

## Resources!

We recommend you browse these docs to learn more about the web platform. We have loads of [inventions](https://tekniverse.teknikio.com/resources/inventions), [tutorials](/Projects), and [courses for educators](https://tekniverse.teknikio.com/resources/classes) to help you dig deeper into coding, IoT, design, digital justice and more!


<!--## C++ Runtime

The [C++ micro:bit runtime](http://lancaster-university.github.io/microbit-docs/), created at [Lancaster University](http://www.lancaster.ac.uk/), provides access to the hardware functions of the micro:bit,
as well as a set of helper functions (such as displaying a number/image/string on the LED screen).

The [micro:bit library](/reference) mirrors the functions of the C++ library.
When code is compiled to ARM machine code, the calls to JavaScript micro:bit functions are replaced with calls to the corresponding C++ functions.

## [Command Line Tools](/cli)

Looking to use @homeurl@ in your favorite editor? Install the [command line tools](/cli) and get rolling!

## [Extensions](/extensions)

Create, edit and distribute your own blocks and JavaScript using [extensions](/extensions). Extensions are hosted on GitHub and may be written using C++, JavaScript and/or ARM thumb.

## [Open Source](/open-source)

The code for the micro:bit is [open source](/open-source) on GitHub. Contributors are welcome!

```package
radio
```
-->
