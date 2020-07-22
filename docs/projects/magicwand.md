# Magic Wand

## Introduction @unplugged

Getting Started: Beginner Level Demo

Make a wand that makes a magical glittering sound and when shaken.

Coding Concepts: On_shake, Input (Accelerometer), Output (Speaker, LED)


![A microbit dice](/static/mb/projects/dice.png)

## Step 1

Get familiar with block editor:
On the Program page of tekniverse, you should see this view below:

![A microbit dice](/static/mb/projects/dice.png)

Take note of the following features:
  * The Bluebird simulator on the left
  * The block menu on the dark grey sidebar
  * The light grey block editor area
  * The block/javascript view, help button, and setting options on the white top bar


## Step 2

Open the Sensors block menu and drag in the [on shake] block. This will allow us to set shaking as the trigger for other actions.


```blocks
input.onGesture(Gesture.Shake, () => {
    basic.showNumber(0)
})
```

## Step 3

Open the Music block menu. Drag in the [play sound ‘ba ding’ until done] block and nest it in the [on shake] block. This will play a ‘ba ding’ sound when Bluebird is shaken.

```blocks
input.onGesture(Gesture.Shake, () => {
    basic.playSound(randint(0, 10))
})
```

## Step 4

Open the sounds drop down menu by clicking the expand arrow next to ‘ba ding’. Then select ‘magic wand’. This will replace the ‘ba ding’ sound with a magic wand sound when Bluebird is shaken.


```blocks
input.onGesture(Gesture.Shake, () => {
    basic.showNumber(randint(1, 6))
})
```

## Step 5

Use the simulator to try out your code. Does it show the number you expected?

## Step 6

If you have a @boardname@ connected, click ``|Download|`` and transfer your code to the @boardname@!

# Nice job! You have created a magic wand with Bluebird.
If you want, you can attach your Bluebird to the end of a wooden dowel or popsicle stick to bring the look together.
