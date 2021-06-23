# Simon Says


Learn how to use an array to store data in programming a two player game of Simon Says. Player 1 will perform a series of actions with Bluebird and Player 2 will try to copy the same actions. If they copy correctly, Bluebird will light a green LED and play a power up sound. If they copy incorrectly, Bluebird will light a red LED and play a power down sound.

# Coding Concepts:
Input (Accelerometer), Outputs (LED, Speaker), If-Then Statements, Arrays



## Part 1: Understanding Arrays

An array is a data structure that stores a group of elements. These elements are usually of the same data type, such as integers or strings. In the following code, we will be using arrays to store text.

In JavaScript, arrays are zero indexed, meaning that the index of the first element is 0 and not 1. For example, if String[] cars = {"Volvo", "BMW", "Ford"}; then the index of “Volvo” is 0, the index of “BMW” is 1, and the index of “Ford” is 2. This is important to keep in mind when retrieving data from an array by index.

## Part 2: Add Sound

1) Open the web editor and drag in the ``||basic:on_Start||`` block. Under the Variables menu, create two variables called “directions” and “repeatDirections”. These will be arrays to store the actions performed by players 1 and 2. Under the Arrays menu, drag in two [set ‘list’ to ‘array of’] blocks and nest them in the [on start] block. Open the drop down menu beside ‘list’ and select ‘directions’ for one block and ‘repeatDirections’ for the other. Then open the Array menu again and drag in the [empty array] block and use it to replace ‘array of’ in both blocks.

```blocks
let directions: number[] = []
let repeatDirections: number[] = []
});
```

2) Open the Sensors menu and drag in the [on shake] block. Change ‘shake’ to ‘tilt left’. We will be programming player 1’s array, “directions”, to store the value “left” when Bluebird is tilted left.

Drag in an [if then] block and nest in in the [on tilt left] block. Then drag in a comparison block for the if statement. Open the Arrays menu and drag in the [length of array ‘list’] block to replace the first ‘0’ in the comparison. Change ‘list’ to ‘directions’. Then change the comparison to less than (<) and change the second ‘0’ to ‘2’. Now we can program our array to store data on the condition that it is not filled yet (i.e. the array contains less than 2 elements).




3) Open the LED menu and nest the [Set Neopixel color] block inside the [if then] block. Change the color to orange. Now when player 1 tilts left, Bluebird will indicate this action with the color orange.

Next, open the Arrays menu and drag in the [‘list’ insert at ‘0’ value _ block underneath the [Set Neopixel color] block. Change ‘list’ to ‘directions’. Open the Text menu and drag in the [“ “] block into the blank space in the [‘directions’ insert at ‘0’ value  block. Change the blank text to “left”. Now the array “directions” will store the word “left” if player 1 tilts left.

```blocks
input.onGesture(Gesture.TiltLeft, function () {
   if (directions.length < 2) {
       rgb.setColor(0xff8000)
       directions.insertAt(0, "left")
   }
})
let directions: string[] = []
directions = []
let repeatDirections: number[] = []

});
```

4) Repeat steps 2 and 3 for tilt right, turning on a purple LED to indicate that player 1 has tilted right and storing the word “right” when the action occurs.

```blocks
input.onGesture(Gesture.TiltLeft, function () {
   if (directions.length < 2) {
       rgb.setColor(0xff8000)
       directions.insertAt(0, "left")
   }
})
input.onGesture(Gesture.TiltRight, function () {
   if (directions.length < 2) {
       rgb.setColor(0x7f00ff)
       directions.insertAt(0, "right")
   }
})
let directions: string[] = []
directions = []
let repeatDirections: number[] = []

});
```

5) Open the Loops menu and drag in a [forever] block. Then nest in an [if then] block. Open the Logic menu and drag the [and] block into the if statement. Then drag two comparison blocks into the two blanks of the and statement. Change the first comparison to [length of array ‘directions’ ≥ 2]. Then change the second comparison to [length of array ‘repeatDirections’ < 2]. Now we can program an action to occur if player 1’s array is full (i.e. player 1’s turn is over) and player 2’s array is not full (i.e. player 2 is in the process of attempting to copy player 1’s actions).

6) Open the Logic menu and drag another [if then] block and nest it in the previous one. Drag an [and] block into the if statement, then drag two comparison blocks into the two blanks of the and statement. Fill in the first comparison so that it reads [rotation (°) pitch > 0] and the second comparison so that it reads [rotation (°) pitch < 180]. These will serve as the conditions to isolate a tilt left action.

 7) Open the LED menu and drag in a [Set Neopixel color] block and nest it in the previous [if then] block. Change the color to yellow. Now when player 2 tilts left, Bluebird will indicate this action with the color yellow.

Open the Arrays menu and drag in the [‘list’ insert at ‘0’ value block underneath the [Set Neopixel color] block. Change ‘list’ to ‘repeatDirections’. Open the Text menu and drag in the [“ “] block into the blank space in the [‘directions’ insert at ‘0’ value block. Change the blank text to “left”. Now the array “directions” will store the word “left” if player 2 tilts left.

```blocks
input.onGesture(Gesture.TiltLeft, function () {
   if (directions.length < 2) {
       rgb.setColor(0xff8000)
       directions.insertAt(0, "left")
   }
})
input.onGesture(Gesture.TiltRight, function () {
   if (directions.length < 2) {
       rgb.setColor(0x7f00ff)
       directions.insertAt(0, "right")
   }
})
let directions: string[] = []
directions = []
let repeatDirections: string[] = []
forever(function () {
   if (directions.length >= 2 && repeatDirections.length < 2) {
       if (input.rotation(Rotation.Pitch) > 0 && input.rotation(Rotation.Pitch) < 180) {
           rgb.setColor(0xffff00)
           repeatDirections.insertAt(0, "left")
       }
   }

});

8) Repeat steps 5-7 for tilt right. Fill in the first comparison so that it reads [rotation (°) pitch < 0] and the second comparison so that it reads [rotation (°) pitch > -180]. These will serve as the conditions to isolate a tilt right action. Turn on a blue LED to indicate that player 2 has tilted right and store the word “right” when the action occurs.

9) Open the Logic menu and drag in a second [if then] block and place it underneath the previous one. Drag a comparison block into the if statement. Replace the first value with a [length of array ‘list’] block. Then change ‘list’ to ‘repeatDirections’. Change the comparison to greater than or equal to (≥) and the second value to 2. Now we can program the action that occurs when the array assigned to player 2 is full (i.e. player 2’s turn is over).


10) Open the Logic menu and drag in an [if else] block. Nest it in the previous [if then] block. Drag an [and] block into the if statement. Then drag comparisons into both blank of the and statement. Fill in the first comparison so that it reads [‘directions’ get value at 0 = ‘repeatDirections’ get value at 0]. This checks to see if the 0 index value (the first value) of player 1 and player 2’s arrays match. Fill in the second comparison so that it reads [‘directions’ get value at 1 = ‘repeatDirections’ get value at 1]. This checks to see if the 1 index value (the second value) of player 1 and player 2’s arrays match.



11) If the elements of both arrays match, we want to execute our win condition. Open the LED menu and drag in the [Set Neopixel color] block and change the color to green. Then open the Music menu and drag in the [play sound until done] block. Change the sound to ‘power up’.

12) If the conditions of the if statement are false and the elements of the arrays do not match, we want to execute our lose condition. Open the LED menu and drag in the [Set Neopixel color] block and change the color to red. Then open the Music menu and drag in the [play sound until done] block. Change the sound to ‘power down’.

13) Your finished program should look something like the following. Feel free to change the length of the arrays to however many actions you want the players to try to mimic. You can increase the value to up the difficulty.

Final block code:

```blocks
input.onGesture(Gesture.TiltLeft, function () {
   if (directions.length < 2) {
       rgb.setColor(0xff8000)
       directions.insertAt(0, "left")
   }
})
input.onGesture(Gesture.TiltRight, function () {
   if (directions.length < 2) {
       rgb.setColor(0x7f00ff)
       directions.insertAt(0, "right")
   }
})
let directions: string[] = []
directions = []
let repeatDirections: string[] = []
forever(function () {
   if (directions.length >= 2 && repeatDirections.length < 2) {
       if (input.rotation(Rotation.Pitch) > 0 && input.rotation(Rotation.Pitch) < 180) {
           rgb.setColor(0xffff00)
           repeatDirections.insertAt(0, "left")
       }
       if (input.rotation(Rotation.Pitch) < 0 && input.rotation(Rotation.Pitch) > -180) {
           rgb.setColor(0x00ffff)
           repeatDirections.insertAt(0, "right")
       }
   }
   if (repeatDirections.length >= 2) {
       if (directions[0] == repeatDirections[0] && directions[1] == repeatDirections[1]) {
           rgb.setColor(0x00ff00)
           music.powerUp.playUntilDone()
       } else {
           rgb.setColor(0xff0000)
           music.powerDown.playUntilDone()
       }
   }


});
```

## Part 3: Upload your code to Bluebird

Click the orange Download button under the simulator. A pop-up menu will appear on your screen. Download the file and follow the instructions on the pop-up.


Congrats! You have created a Simon Says game with Bluebird.
