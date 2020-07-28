# Smart Timer Cube


Cooking can be difficult when you don't have a timer! In this project, you will code a custom kitchen timer that will tell you how long you need when preparing your favorite foods. Make a customized timer that is preset to the cooking times of all your favorite foods. It knows what to set the time for depending on which face it’s on!
![](/static/bb/projects/timercube.png)

# Coding Concepts:
Accelerometer, Outputs (Speaker), Timing, If-then statements



## Part 1: Build the cube

Feel free to skip these steps if you are only interested in learning the programming concepts.

1)To make the Bluebird holder, trace your Bluebird onto a piece of cardboard. Then draw another outline about half and inch out from it. Cut out the shape along with the hole in the middle. Take the cutout you just made and trace it on another piece of cardboard. Cut along the tracing to create the backing.

![](/static/bb/projects/.png)
2) Glue the two pieces together to make the holder for your Bluebird. Once the glue is dry, paint the holder any color you like.
![](/static/bb/projects/.png)


3) Make the arm straps for your pushup counter. Cut two strips about 6 inches long by 1.5 inches thick out of foam, felt, or even an old t-shirt. Then connect the ends of the strips to the back of the Bluebird holder as shown. You can glue, staple, or sew on the ends.

![](/static/bb/projects/.png)

4) If you have velcro, you can cut out two strips of it and attach it to either end of the straps. Make sure one piece is on the front side and one is on the back side as shown. If you don’t have velcro, you can also use button snaps. Finally, make sure your Bluebird fits snugly inside its holder and the straps fit nicely around your arm.
![](/static/bb/projects/.png)

## Part 2: Take measurements in the Control Center

1) Connect Bluebird to Control Center (see here for [help](/controlcenter)) and take note of the Accelerometer readings.

2) Fill out the chart below to record your data.
Eg. Top  | Strawberry Smoothie | 10 minutes |  Z=1

| Cube Face |    Food     |  Time Duration |Orientation|
|----------|-------------|----------|-------------|
|Top||||
|Front||||
|Left||||
|Right||||
|Back||||
|Bottom |STOP TIMER |---|||


##  Part 3: Program the Timer


1) First, code the stop timer function. We start by addressing the if_then_ statements. To code the phrase “If the acceleration is Z<0…” we construct the loop below. Continue by adding in the action of stopping all audio and making an LED glow.


```blocks
forever(function () {
   if (input.acceleration(Dimension.X) < 0) {
       rgb.setColor(0x0000ff)
       music.stopAllSounds()
   }

   });
   ```

2) Time to translate the rest of these statements into code. Let’s say that we are coding for this phrase which describes the time it takes for us to make my strawberry smoothie:
## ~ hint
“If acceleration Z is =1, then the task is to make a strawberry smoothie which lasts 10 minutes. When the timer ends, the timer will play ba-ding!”
## ~
Start by adding another if-then loop.
Tip: You can Ctrl+C and Ctrl+V to Copy and Paste blocks!

This is the 4-block code representation of “if acceleration Z=1”. Next, we address the phrase “...which lasts 10 minutes.”

```blocks
forever(function () {
   if (input.acceleration(Dimension.Z) < 0) {
       rgb.setColor(0x0000ff)
       music.stopAllSounds()
   }
   if (input.acceleration(Dimension.Z) == 1) {
       for (let index = 0; index < 10; index++) {
           pause(1000)
       }
       rgb.setColor(0xff9da5)
       music.baDing.playUntilDone()
   }
});
```


3) Repeat Step 3 again for each of the items on your cube.


## Part 3: Upload your code to Bluebird

Test the timer and debug. If you are having any programming issues, check out the debugging feature on tekniverse!
If there are no bugs, seal the cube and get cooking! Take your cube to the kitchen and use it as you prepare your favorite foods!
Upload your code to Bluebird.
For steps on how to do this, check out the end of the [Siren Tutorial](/demos/siren).


## Great job! You have completed a Smart Timer Cube!

Tekniverse iOS App
Check out the tutorial [here](https://tekniverse.teknikio.com/resources/inventions/23)!
