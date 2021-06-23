/**
 * Control of the LED screen.
 */


enum IconNames {
    //% block="heart"
    //% jres=icons.heart
    Heart = 0,
    //% block="small heart"
    //% jres=icons.smallheart
    SmallHeart,
    //% block="yes"
    //% jres=icons.yes
    Yes,
    //% block="no"
    //% jres=icons.no
    No,
    //% block="happy"
    //% jres=icons.happy
    Happy,
    //% block="sad"
    //% jres=icons.sad
    Sad,
    //% block="confused"
    //% jres=icons.confused
    Confused,
    //% block="angry"
    //% jres=icons.angry
    Angry,
    //% block="asleep"
    //% jres=icons.asleep
    Asleep,
    //% block="surprised"
    //% jres=icons.surprised
    Surprised,
    //% block="silly"
    //% jres=icons.silly
    Silly,
    //% block="fabulous"
    //% jres=icons.fabulous
    Fabulous,
    //% block="meh"
    //% jres=icons.meh
    Meh,
    //% block="t-shirt"
    //% jres=icons.tshirt
    TShirt,
    //% block="roller skate"
    //% jres=icons.rollerskate
    Rollerskate,
    //% block="duck"
    //% jres=icons.duck
    Duck,
    //% block="house"
    //% jres=icons.house
    House,
    //% block="tortoise"
    //% jres=icons.tortoise
    Tortoise,
    //% block="butterfly"
    //% jres=icons.butterfly
    Butterfly,
    //% block="stick figure"
    //% jres=icons.stickfigure
    StickFigure,
    //% block="ghost"
    //% jres=icons.ghost
    Ghost,
    //% block="sword"
    //% jres=icons.sword
    Sword,
    //% block="giraffe"
    //% jres=icons.giraffe
    Giraffe,
    //% block="skull"
    //% jres=icons.skull
    Skull,
    //% block="umbrella"
    //% jres=icons.umbrella
    Umbrella,
    //% block="snake"
    //% jres=icons.snake
    Snake,
    //% block="rabbit"
    //% jres=icons.rabbit
    Rabbit,
    //% block="cow"
    //% jres=icons.cow
    Cow,
    //% block="quarter note"
    //% jres=icons.quarternote
    QuarterNote,
    //% block="eigth note"
    //% jres=icons.eigthnote
    EigthNote,
    //% block="pitchfork"
    //% jres=icons.pitchfork
    Pitchfork,
    //% block="target"
    //% jres=icons.target
    Target,
    //% block="triangle"
    //% jres=icons.triangle
    Triangle,
    //% block="left triangle"
    //% jres=icons.lefttriangle
    LeftTriangle,
    //% block="chess board"
    //% jres=icons.chessboard
    Chessboard,
    //% block="diamond"
    //% jres=icons.diamond
    Diamond,
    //% block="small diamond"
    //% jres=icons.smalldiamond
    SmallDiamond,
    //% block="square"
    //% jres=icons.square
    Square,
    //% block="small square"
    //% jres=icons.smallsquare
    SmallSquare,
    //% block="scissors"
    //% jres=icons.scissors
    Scissors
}

//% color=#5C2D91 weight=101 icon="\uf205" advanced=true
namespace led {

    /**
     * Get the on/off state of the specified LED using x, y coordinates. (0,0) is upper left.
     * @param x the horizontal coordinate of the LED
     * @param y the vertical coordinate of the LED
     */
    //% help=led/point weight=76
    //% blockId=device_point block="point|x %x|y %y"
    //% parts="ledmatrix"
    //% x.min=0 x.max=4 y.min=0 y.max=4
    //% x.fieldOptions.precision=1 y.fieldOptions.precision=1
    export function point(x: number, y: number): boolean {
        return led.pointBrightness(x, y) > 0;
    }

    // what's the current high value
    let barGraphHigh = 0;
    // when was the current high value recorded
    let barGraphHighLast = 0;

    /**
     * Displays a vertical bar graph based on the `value` and `high` value.
     * If `high` is 0, the chart gets adjusted automatically.
     * @param value current value to plot
     * @param high maximum value. If 0, maximum value adjusted automatically, eg: 0
     */
    //% help=led/plot-bar-graph weight=20
    //% blockId=device_plot_bar_graph block="plot bar graph of %value up to %high" icon="\uf080" blockExternalInputs=true
    //% parts="ledmatrix"
    export function plotBarGraph(value: number, high: number): void {
        // const now = input.runningTime();
        // console.logValue("", value);
        // value = Math.abs(value);

        // // auto-scale "high" is not provided
        // if (high > 0) {
        //     barGraphHigh = high;
        // } else if (value > barGraphHigh || now - barGraphHighLast > 10000) {
        //     barGraphHigh = value;
        //     barGraphHighLast = now;
        // }

        // // normalize lack of data to 0..1
        // if (barGraphHigh < 16 * Number.EPSILON)
        //     barGraphHigh = 1;

        // // normalize value to 0..1
        // const v = value / barGraphHigh;
        // const dv = 1 / 16;
        // let k = 0;
        // for (let y = 4; y >= 0; --y) {
        //     for (let x = 0; x < 3; ++x) {
        //         if (k > v) {
        //             unplot(2 - x, y);
        //             unplot(2 + x, y);
        //         } else {
        //             plot(2 - x, y);
        //             plot(2 + x, y);
        //         }
        //         k += dv;
        //     }
        // }
    }

    /**
     * Toggles a particular pixel
     * @param x pixel column
     * @param y pixel row
     */
    //% help=led/toggle weight=77
    //% blockId=device_led_toggle block="toggle|x %x|y %y" icon="\uf204" blockGap=8
    //% parts="ledmatrix"
    //% x.min=0 x.max=4 y.min=0 y.max=4
    //% x.fieldOptions.precision=1 y.fieldOptions.precision=1
    export function toggle(x: number, y: number): void {
        if (led.point(x, y)) {
            led.unplot(x, y);
        } else {
            led.plot(x, y);
        }
    }

    /**
     * Draws the selected icon on the LED screen
     * @param icon the predefined icon id
     * @param interval the amount of time (milliseconds) to show the icon. Default is 600.
     */
    //% weight=90 blockGap=8
    //% blockId=basic_show_icon
    //% block="show icon %i" icon="\uf00a"
    //% parts="ledmatrix"
    //% help=basic/show-icon
    //% icon.fieldEditor="imagedropdown"
    //% icon.fieldOptions.columns="5"
    //% icon.fieldOptions.width="380"
    //% icon.fieldOptions.maxRows=4
    export function showIcon(icon: IconNames, interval = 600) {
        // let res = images.iconImage(icon)
        // res.showImage(0, interval)
    }
}