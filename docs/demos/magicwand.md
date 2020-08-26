# Magic Wand


Getting Started: Beginner Level Demo

Make a wand that makes a magical glittering sound and when shaken.

![](/static/bb/projects/magic_wand.jpg)

# Coding Concepts:
On_shake, Input (Accelerometer), Output (Speaker, LED)


## Step 1

Get familiar with block editor. Open the [Program](https://tekniverse.teknikio.com/tools/program) page of tekniverse.

Take note of the following features:
  * The Bluebird simulator on the left
  * The block menu on the dark grey sidebar
  * The light grey block editor area
  * The block/javascript view, help button, and setting options on the white top bar


## Step 2

Open the Sensors block menu and drag in the ``||sensors:On_shake||`` block. This will allow us to set shaking as the trigger for other actions.


```blocks
input.onGesture(Gesture.Shake, () => {
})
```

## Step 3

Open the Music block menu. Drag in the ``||music:playSound||`` block and nest it in the ``||sensors:On_shake||`` block. This will play a ‘ba ding’ sound when Bluebird is shaken.

```blocks
input.onGesture(Gesture.Shake, () => {
     music.baDing.playUntilDone()
})
```

## Step 4

Open the sounds drop down menu by clicking the expand arrow next to ‘ba ding’. Then select ‘magic wand’. This will replace the ‘ba ding’ sound with a magic wand sound when Bluebird is shaken.

![](/static/bb/projects/wand_sound.png)

## Step 5

Final code:

```blocks
input.onGesture(Gesture.Shake, function () {
   music.magicWand.playUntilDone()

})
```

## Step 6

Upload your code to Bluebird. For steps on how to do this, check out the end of the [Siren Tutorial](/demos/siren).

## Nice job! You have created a magic wand with Bluebird.
Attach your Bluebird to the end of a wooden dowel or popsicle stick to bring the look together.
