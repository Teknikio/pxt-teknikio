# sound Level

Find out what the the level of sound heard by microphone is.

```sig
input.soundLevel()
```

## Returns

* a ``number`` between `0` (quiet) and `255` (loud) which tells how loud the sounds are that the microphone hears.

## Example #example

Use the pixels to make a sound meter. If loud sounds are detected, more pixels light up.

```blocks
let lastLevel = 0;
let pixels = light.createStrip()

forever(function () {
    let level = input.soundLevel()
    if (lastLevel != level) {
        pixels.clear()
        for (let i = 0; i < pixels.length() / 255 * level; i++) {
            pixels.setPixelColor(i, 0x00ff00)
        }
        lastLevel = level
    }
})
```
## See also #seealso

[on loud sound](/reference/input/on-loud-sound)

```package
microphone
light
```