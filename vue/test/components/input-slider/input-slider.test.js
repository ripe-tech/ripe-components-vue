const assert = require("assert");
const base = require("../../base");

describe("InputSlider", () => {
    it("should initialize the input slider", () => {
        const component = base.getComponent("InputSlider");

        assert.strictEqual(component.exists(), true);
    });

    it("should contain same value in slider and text input", async () => {
        const component = base.getComponent("InputSlider", {
            props: { min: 10, value: 11, max: 12 }
        });

        const userTextInput = component.find(".input-symbol .input");
        assert.strictEqual(userTextInput.element._value, 11);

        const inputSymbol = component.findComponent({ name: "InputSymbol" });
        assert.strictEqual(inputSymbol.vm.$data.valueData, 11);

        const sliderValue = component.find(".slider");
        assert.strictEqual(sliderValue.element._value, 11);
    });
});
