# Night Light


Get familiar with the Control Center! Apply what you learn and turn your Bluebird into a nightlight that turns on when it gets dark.

# Coding Concepts:
Control Center, Input (Light Sensor), Output (LED)


## Part 1: Connect your Bluebird

1) When you first open the [Control Center](https://tekniverse.teknikio.com/tools/program) the page will be gray out. You need to connect your board in Bluetooth mode. If you turn you board on and it makes a noise and flashes it is probably in Bluetooth mode. Otherwise, you can load Bluetooth mode by following these instructions:

On the upper left of the Tools submenu Bluebird status will say: “NOT CONNECTED”

2) Pair your Bluebird with tekniverse by clicking on the NOT CONNECTED button. A pop-up will appear in your Chrome window. Select BLUEBIRD and then Pair

![](/static/bb/projects/connect.png)

3) The connected Bluebird should have an LED glowing Blue and your screen will show an active Blue board and the graphs will start to stream live data!

4) Scroll down the sensor reading to the Light Sensor
Watch what occurs when the light in the room is on and then the light in the room is off.
![](/static/bb/projects/.png)

##  Part 3: Program your Night Light


1) Code your light sensor using the ``||sensors:onlight||`` block which can be found under the Sensors category in the Toolbox.

```blocks
input.onLightConditionChanged(LightCondition.Dark, function () {
   rgb.setColor(0x00ffff)
   });
   ```

2) Under Pins, select the [on start] block. This is a loop that will run only once at the start of the program.
Next, depending on data you recorded in the Control Center, reset the threshold for darkness to best fit the room you are in using ``||sensors:setLightThreshold||`` . Adjust your Neopixel brightness and color.



3) Final block code:

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


## Woohoo! You have created a night light with Bluebird.
