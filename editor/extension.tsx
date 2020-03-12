/// <reference path="../node_modules/pxt-core/localtypings/pxtarget.d.ts" />
/// <reference path="../node_modules/pxt-core/built/pxtblocks.d.ts" />
/// <reference path="../node_modules/pxt-core/built/pxtcompiler.d.ts" />
/// <reference path="../node_modules/pxt-core/built/pxtlib.d.ts" />
/// <reference path="../node_modules/pxt-core/built/pxteditor.d.ts" />
import * as React from "react";

function showUploadInstructionsAsync(fn: string, url: string, confirmAsync?: (options: any) => Promise<number>) {
    let resolve: (thenableOrResult?: void | PromiseLike<void>) => void;
    let reject: (error: any) => void;
    const deferred = new Promise<void>((res, rej) => {
        resolve = res;
        reject = rej;
    });
    const boardName = pxt.appTarget.appTheme.boardName || "???";
    const boardDriveName = pxt.appTarget.appTheme.driveDisplayName || pxt.appTarget.compile.driveName || "???";

    // https://msdn.microsoft.com/en-us/library/cc848897.aspx
    // "For security reasons, data URIs are restricted to downloaded resources.
    // Data URIs cannot be used for navigation, for scripting, or to populate frame or iframe elements"
    const downloadAgain = !pxt.BrowserUtils.isIE() && !pxt.BrowserUtils.isEdge();
    const docUrl = pxt.appTarget.appTheme.usbDocs;

    const jsx = <div className="ui three column grid stackable center aligned">
        <div className="column">
            <div className="ui">
                <div className="image" style={{'margin-bottom': '10px'}}>
                    <img className="ui medium rounded" style={{height:'200px'}} src="./static/download/connect.png" />
                </div>
                <div className="content">
                    <div className="description">
                        {lf("1. Connect the bluebird to your computer with a USB cable.\n" +
                            "Use the microUSB port on the top of the bluebird.")}
                    </div>
                </div>
            </div>
        </div>
        <div className="column">
            <div className="ui">
                <div className="image" style={{'margin-bottom': '10px'}}>
                    <img className="ui medium rounded" style={{height:'200px'}} src="./static/download/reset.png" />
                </div>
                <div className="content">
                    <div className="description">
                        {lf("2. Push the reset button on the bluebird twice quickly.\n" +
                            "LED gets green and you can see the bluebird drive in your computer.")}
                    </div>
                </div>
            </div>
        </div>
        <div className="column">
            <div className="ui">
                <div className="image" style={{'margin-bottom': '10px'}}>
                    <img className="ui medium rounded" style={{height:'200px'}} src="./static/download/transfer.png" />
                </div>
                <div className="content">
                    <div className="description">
                        {lf("3. Download the BLEmode_bluebird.uf2 file.\n" +
                            "Locate the downloaded .uf2 file and drag it to the bluebird drive.")}
                    </div>
                </div>
            </div>
        </div>
    </div>;

    return confirmAsync({
        header: lf("Download completed..."),
        jsx,
        hasCloseIcon: true,
        hideCancel: true,
        hideAgree: true,
        size: 'large',
        buttons: [downloadAgain ? {
            label: fn,
            icon: "download",
            class: "lightgrey focused",
            url,
            fileName: fn
        } : undefined, docUrl ? {
            label: lf("Help"),
            icon: "help",
            class: "lightgrey focused",
            url: docUrl
        } : undefined]
        //timeout: 20000
    }).then(() => { });
}

pxt.editor.initExtensionsAsync = function (opts: pxt.editor.ExtensionOptions): Promise<pxt.editor.ExtensionResult> {
    pxt.debug('loading pxt-adafruit target extensions...')
    const res: pxt.editor.ExtensionResult = {
        showUploadInstructionsAsync: showUploadInstructionsAsync
    };
    return Promise.resolve<pxt.editor.ExtensionResult>(res);
}
