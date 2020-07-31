# Sunset Cube


Get familiar with using the math and variable blocks on tekniverse by making a sunset cube. Shake this cube to start a sunset light sequence!


# Coding Concepts:
Math Blocks, Outputs (LED), Loops, Variables


## Part 1: Build the Cube

1) Choose your foods and follow this [PDF](https://drive.google.com/file/d/1ZtjzpGcUbavmv6g7bzCTchvu33Es9XkF/view?usp=sharing) of directions to fold a cube to place your Bluebird inside.


2) Make the Bluebird holder. Take a piece of cardboard and place Bluebird on it. Using a pen poke 4 holes where the middle four connector pins are located. Take four metal studs, and place the Bluebird on the cardboard. Align the pinholes of Bluebird with the poked holes on the cardboard and use the metal studs to go through the Bluebird and cardboard. Bend the studs so that the two pieces are held together tightly.


```blocks
rgb.setColor(purple, () => {
});
```

3) Test the code in the Bluebird simulator

4) Go to the Loops block menu. Nest the ``||loops:Pause||`` block next in the forever loop sequence. Anything in the ``||basic:Forever||`` loops run repeatedly at a rate that may make changes too fast to observe (as much as 100 loops per second)! You must add a pause to make sure the lights change at a rate that you can observe.

Fun fact: Our eyes can perceive the flicker of a LED up to 90Hz (90 on-off cycles per second)

5) Repeat this sequence again with another Neopixel color from the palette.

Tip: If you make a mistake, you can drag the block back into the sidebar to dispose of it.



## Part 2:  Code the LED Color Change


1) Add a sound to the loop. Select ``||music:play tone||`` from the Music blocks and select siren from the drop-down sound options.

We start with the [on ____] loop which can be found under the sensors category. Bluebird will watch for changes in the accelerometer so that when the cube is shaken, the sequence of actions in the loop will occur.


2) Decide on the starting rgb color. We suggest [red 30 green 160 blue 190] which is a bright light blue color. We also need to set up the starting brightness.


```blocks
input.onGesture(Gesture.Shake, function () {
   rgb.rgb(30, 160, 190)
   rgb.setBrightness(255)
});
```

3) The next step is to make a variable called “red.” This will the stored value of red will increase over time which will make the sky on the cube get more red.



4) Instantiate (set an initial value) red so that it is the starting value. If you are using our suggested starting color [set red to 30].



```blocks
let red = 0
input.onGesture(Gesture.Shake, function () {
   rgb.rgb(30, 160, 190)
   rgb.setBrightness(255)
   red = 30
});
```

5) Add another loop. This time, the loop will run a set number of times.


6) Within the [repeat ___ times] loop configure a sequence such that the final code will look like this:


* What the first block of the loop does is increase the value of red by 35 every time it repeats. For instance, on the first loop “red” will increase from 30 to 65.
* The second block of this sequence resets the color. We will place the variable “red” into this rgb block.
* The third block pauses the loop for one second to set the pace the color change.

```blocks
let red = 0
input.onGesture(Gesture.Shake, function () {
   rgb.rgb(30, 160, 190)
   rgb.setBrightness(255)
   red = 30
   for (let index = 0; index < 17; index++) {
       red = red + 35
       rgb.rgb(red, 160, 190)
       pause(1000)
   }
});
```

7) Try adjusting the code to alter the colors of the cube, the pause, and the number of repeated loops that take place to create different visual effects.

![](/static/bb/projects/sunset.gif)

## Part 3: Upload your code to Bluebird

Click the orange Download button under the simulator. A pop-up menu will appear on your screen. Download the file and follow the instructions on the pop-up.


## Shake it up! You have made your Sunset cube!
