const assert = require("assert");
const base = require("../../base");

describe("InputColor", () => {
    it("should initialize the input color", () => {
        const component = base.getComponent("InputColor", {
            props: { value: "#ff0000" }
        });

        assert.strictEqual(component.exists(), true);
    });
    it("should display the correct color sent as a prop in the color picker", () => {
        const component = base.getComponent("InputColor", {
            props: { value: "#ff0000" }
        });

        const colorPicker = component.find(".color-picker");
        assert.strictEqual(
            colorPicker.attributes("style").includes("background-color: rgb(255, 0, 0)"),
            true
        );
    });
    it("should set the correct color sent as a prop in the native input and internal data", () => {
        const component = base.getComponent("InputColor", {
            props: { value: "#ff0000" }
        });

        assert.strictEqual(component.vm.$data.valueData, "#ff0000");

        const inputNative = component.find(".input-color-native");
        assert.strictEqual(inputNative.element._value, "#ff0000");
    });
    it("should display empty color picker when it has an invalid color value", () => {
        const component = base.getComponent("InputColor", {
            props: { value: "#ff0000INVALID" }
        });

        assert.strictEqual(component.vm.hasValidColor, false);

        const colorPicker = component.find(".color-picker");
        assert.strictEqual(
            colorPicker.attributes("style").includes("background-color: rgb(255, 255, 255)"),
            true
        );
    });
});
