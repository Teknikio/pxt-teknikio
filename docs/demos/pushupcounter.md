# Push-up Counter


Learn how to program your Bluebird to act as a push-up counter. Make a wearable armband that counts the number of push-ups you do and alerts you when you've reached your goal by blinking an LED and playing a sound.


# Coding Concepts:
Input (Accelerometer), Output (LED, Sound), If-Then Statements


## Part 1: Make the Push-up Counter

Feel free to skip these steps if you are only interested in learning the programming concepts.

1)To make the Bluebird holder, trace your Bluebird onto a piece of cardboard. Then draw another outline about half and inch out from it. Cut out the shape along with the hole in the middle. Take the cutout you just made and trace it on another piece of cardboard. Cut along the tracing to create the backing.

![](/static/bb/projects/.png)
2) Glue the two pieces together to make the holder for your Bluebird. Once the glue is dry, paint the holder any color you like.
![](/static/bb/projects/.png)


3) Make the arm straps for your pushup counter. Cut two strips about 6 inches long by 1.5 inches thick out of foam, felt, or even an old t-shirt. Then connect the ends of the strips to the back of the Bluebird holder as shown. You can glue, staple, or sew on the ends.

![](/static/bb/projects/.png)

4) If you have velcro, you can cut out two strips of it and attach it to either end of the straps. Make sure one piece is on the front side and one is on the back side as shown. If you don’t have velcro, you can also use button snaps. Finally, make sure your Bluebird fits snugly inside its holder and the straps fit nicely around your arm.
![](/static/bb/projects/.png)

##  Part 2: Program your Push-up Counter


1) Open the Pins menu and drag in the ``||basic:on_Start||`` block. This is setting up for actions to happen upon starting up your Bluebird.

```blocks
input.onLightConditionChanged(LightCondition.Dark, function () {
   rgb.setColor(0x00ffff)
   });
   ```

2) Open the Variables menu and select ``||variables:make_a_variable||``. Name your variable “count”, as it will help us count the number of pushups we have done. Now drag in the [set ‘count’ to 0] block and nest it under ``||basic:start||``.



3) Open the Logic blocks menu and drag in the [if ‘true’ then] block. Nest it in the [on start] block. This states that if true, then perform  _____ action.


```blocks
input.onLightConditionChanged(LightCondition.Dark, function () {
   rgb.setColor(0x00ffff)
})
input.setLightThreshold(LightCondition.Dark, 80)
rgb.setBrightness(125)
});
```

## Part 3: Upload your code to Bluebird

Click the orange Download button under the simulator. A pop-up menu will appear on your screen. Download the file and follow the instructions on the pop-up. For steps on how to do this, check out the end of the [Siren Tutorial](/demos/siren).


## Awesome! You have created a push-up counter with Bluebird.
