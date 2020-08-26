# Domino Effect



Learn how to turn on a series of lights in sequence when activated. This demo project will address wiring and programming external inputs and outputs to Bluebird. This can be adapted to project ideas like smart street lights that light up in sequence when triggered.


![](/static/bb/projects/domino-effect.jpg)


## Coding Concepts:
Input (Light Sensor), External Outputs (LED), If-Then Statements

## Materials:
* Bluebird
* Conductive Tape or Wire
* LEDboards (3)


## Part 1

Connect your LEDboards to Bluebird according to the above wiring diagram. Arrange your LEDboards in a row, the closest one should be connected to I/O pin 1, the middle one to I/O pin 2, and the furthest one to I/O pin 3.
For each LEDboard, connect the blue (B) pad on the LEDboard to the appropriate I/O pin on Bluebird. Then connect the ground pad of each LEDboard to any one of the ground (-) pins on Bluebird. These connections can be made using either conductive tape or wire for a more stable connection.

## Part 2: Program the Domino Effect

1) The [forever] block should already be in the web editor once you open it. Open the Logic menu and drag in the [if ‘true’ then] block and nest it in the [forever]block.

2) Open the Logic menu and find the [0 < 0] block under Comparisons. Drag it into the ``|if ‘true’ then]`` block to replace ‘true’. By doing so, we are stating that if __ is less than __, then perform _____ action.

3) Open the Sensors block menu and find the [light sensor] block. Drag it over the first ‘0’ value to replace it. The light sensor reading returns a value between 0 (completely dark) and 255 (very bright). We want our LEDs to activate in sequence when something passes over Bluebird’s light sensor. Therefore, replace the second ‘0’ value with the number 50 so that the event is triggered when the light sensor reading is less than 50 (very dark).


4) Open the Pins menu and drag in the [digital write pin ‘A1’ to ‘LOW’] block. Nest it in the [if then] block and change the ‘LOW’ switch to ‘HIGH’. Then open the Loops menu and drag in the [pause ‘100’ ms] block. Place it under the ``||[digital write pin ‘A1’ to ‘HIGH’] ``|| block. In relation to the LEDs, ‘LOW’ means OFF and ‘HIGH’ means ON. Open the dropdown menu beside ‘100’ and select ‘1 second’, the ‘100’ should be replaced with ‘1000’.

These two blocks of code will turn on the first LEDboard which is connected to I/O pin 1, then pause for 1 second. We are programming the pause to create a 1 second delay between the first and second lights turning on.



5)Repeat the previous step for pin A2. This will turn on the first LED, pause for 1 second, turn on the second LED, then pause for another second.



6) Repeat the same steps for pin A3, except change the pause time to ‘5 seconds’ instead of ‘1 second’. Now once all the LEDs are ON, they will continue to stay on for another 5 seconds.



7) Now, we want to turn OFF all the LEDs after they have been ON for 5 seconds. Open the Pins menu and drag in the [digital write pin ‘A1’ to ‘LOW’] block. Drag in underneath the [pause ‘5000’ ms] block. Repeat this action for pins A2 and A3. Your final code should look something like this:

```blocks
forever(function () {
   if (input.lightLevel() < 50) {
       pins.A1.digitalWrite(true)
       pause(1000)
       pins.A2.digitalWrite(true)
       pause(1000)
       pins.A3.digitalWrite(true)
       pause(5000)
       pins.A1.digitalWrite(false)
       pins.A2.digitalWrite(false)
       pins.A3.digitalWrite(false)
   }
});
```

## Part 3 Upload your code to Bluebird

1) Go to the Javascript window and right-click your mouse to reveal more options. Select Download.

2) A pop-up menu should appear on your screen. Download the file and follow the instructions on the pop-up.
