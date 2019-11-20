/// <reference path="../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../libs/core/dal.d.ts"/>
/// <reference path="../../built/common-sim.d.ts"/>

namespace pxsim.visuals {
    export class ButtonView implements IBoardPart<CommonButtonState> {
        public element: SVGElement;
        public defs: SVGElement[];
        public style = BUTTON_PAIR_STYLE;
        private state: CommonButtonState;
        private bus: EventBus;
        private btn: SVGGElement;

        private pinId: number;
        private button: CommonButton;

        public init(bus: EventBus, state: CommonButtonState, svgEl: SVGSVGElement, otherParams: Map<string>) {
            this.state = state;
            this.bus = bus;
            this.defs = [];
            this.element = this.mkBtn();
            let pinStr = pxsim.readPin(otherParams["button"]);
            this.pinId = pxsim.pinIds[pinStr];
            this.button = new CommonButton(this.pinId);
            this.state.buttonsByPin[this.pinId] = this.button;
            this.updateState();
            this.attachEvents();
        }

        public moveToCoord(xy: Coord) {
            let [x, y] = xy;
            translateEl(this.btn, [x, y])
        }

        public updateState() {

        }

        public updateTheme() {}

        private mkBtn() {
            this.btn = mkBtnSvg([0, 0]).el;

            let el = svg.elt("g");
            pxsim.U.addClass(el, "sim-buttonpair")
            el.appendChild(this.btn);

            return el;
        }

        private attachEvents() {
            let btnSvgs = [this.btn];

            btnSvgs.forEach((btn, index) => {
                pointerEvents.down.forEach(evid => btn.addEventListener(evid, ev => {
                    this.button.setPressed(true);
                }));
                btn.addEventListener(pointerEvents.leave, ev => {
                    this.button.setPressed(false);
                })
                btn.addEventListener(pointerEvents.up, ev => {
                    this.button.setPressed(false);
                })
            })
        }
    }
}