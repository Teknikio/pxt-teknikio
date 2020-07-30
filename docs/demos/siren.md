# Siren


Get familiar with Programming in the block editor! Turn your Bluebird into a siren with a blinking LED and sound. Then learn to customize your siren with color changing and sound.

# Coding Concepts:
Output (LED, Music), Forever Loops, Pauses


## Part 1: Make the LED blink

1) Get familiar with block editor:
Open the [Program](https://tekniverse.teknikio.com/tools/program) page under the tools menu.

Take note of the following features:
The Bluebird simulator on the left
The block menu on the dark grey sidebar
The light grey block editor area
The block/javascript view, help button, and setting options on the white top bar


2) Go to the LED block menu. Nest the ``||rgb:Set Neopixel Color||`` block into the forever loop. Use the color palette to select a color. For this example, we will use purple.

```blocks
rgb.setColor(purple, () => {
});
```

3) Test the code in the Bluebird simulator

4) Go to the Loops block menu. Nest the ``||loops:Pause||`` block next in the forever loop sequence. Anything in the ``||basic:Forever||`` loops run repeatedly at a rate that may make changes too fast to observe (as much as 100 loops per second)! You must add a pause to make sure the lights change at a rate that you can observe.

Fun fact: Our eyes can perceive the flicker of a LED up to 90Hz (90 on-off cycles per second)

5) Repeat this sequence again with another Neopixel color from the palette.

Tip: If you make a mistake, you can drag the block back into the sidebar to dispose of it.

![](/static/bb/.png)

## Part 2: Add Sound

1) Add a sound to the loop. Select ``||music:play tone||`` from the Music blocks and select siren from the drop-down sound options.


2) Adjust the timing of the pause to allow the siren sound to play through.
![](/static/bb/1_timing.gif.png)

3) Final block code:

```blocks
forever(function () {
   rgb.setColor(0x7f00ff)
   music.siren.play()
   pause(2000)
   rgb.setColor(0x00ffff)
   music.siren.play()
   pause(2000)
});
```

## Part 3: Upload your code to Bluebird

Click the orange Download button under the simulator. A pop-up menu will appear on your screen. Download the file and follow the instructions on the pop-up.


## Congrats! You have created a siren with Bluebird.
