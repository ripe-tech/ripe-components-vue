const assert = require("assert");
const base = require("../../base");

describe("BezierCurve", () => {
    it("should initialize the bezier curve", () => {
        const component = base.getComponent("BezierCurve", {
            props: {
                x1: 521,
                y1: 157,
                x2: 593,
                y2: 85,
                cx1: 777,
                cx2: 203,
                cy1: 641,
                cy2: 431
            }
        });

        assert.strictEqual(component.exists(), true);
    });

    it("should set the correct resolution of the viewport", async () => {
        const component = base.getComponent("BezierCurve", {
            props: {
                x1: 127,
                y1: 430,
                x2: 557,
                y2: 178,
                cx1: 186,
                cx2: 203,
                cy1: 641,
                cy2: 431,
                width: 640,
                height: 480
            }
        });

        assert.strictEqual(component.attributes("viewBox"), "0, 0, 640, 480");
    });

    it("should hide everything but the curve when showPoints is false", async () => {
        const component = base.getComponent("BezierCurve", {
            props: {
                x1: 127,
                y1: 430,
                x2: 557,
                y2: 178,
                cx1: 186,
                cx2: 203,
                cy1: 641,
                cy2: 431,
                showPoints: false
            }
        });

        assert.strictEqual(component.find(".slope-1").isVisible(), false);
        assert.strictEqual(component.find(".slope-2").isVisible(), false);
        assert.strictEqual(component.find(".end-point-1").isVisible(), false);
        assert.strictEqual(component.find(".end-point-2").isVisible(), false);
        assert.strictEqual(component.find(".control-point-1").isVisible(), false);
        assert.strictEqual(component.find(".control-point-2").isVisible(), false);
        assert.strictEqual(component.find(".curve").isVisible(), true);
    });

    it("should draw the correct curve based on sent props", () => {
        const component = base.getComponent("BezierCurve", {
            props: {
                x1: 521,
                y1: 157,
                x2: 593,
                y2: 85,
                cx1: 777,
                cx2: 203,
                cy1: 641,
                cy2: 431
            }
        });

        const curve = component.find(".curve");
        assert.strictEqual(curve.attributes("d"), "M 521, 157 C 777, 641, 203, 431, 593, 85");
    });
});
