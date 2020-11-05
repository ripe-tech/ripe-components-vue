const assert = require("assert");
const base = require("../../base");

describe("Slider", () => {
    it("should initialize the slider ripe", () => {
        const component = base.getComponent("Slider");

        assert.strictEqual(component.exists(), true);
    });

    it("should start with value as 0 if no minimum or slider values are specified by prop", () => {
        const component = base.getComponent("Slider");

        assert.strictEqual(component.vm.$data.valueData, 0);
    });

    it("should start with value set as as the minimum if no value is specified by prop", () => {
        const component = base.getComponent("Slider", {
            props: { "input-props": { min: 22 } }
        });

        assert.strictEqual(component.vm.$data.valueData, 22);
    });

    it("should start with value if it is passed by prop", () => {
        const component = base.getComponent("Slider", {
            props: { value: 11 }
        });

        assert.strictEqual(component.vm.$data.valueData, 11);
    });

    it("should emit `update:value` event when input value changes", async () => {
        const component = base.getComponent("Slider");

        component.setValue("10");

        assert.strictEqual(component.emitted("update:value")[0][0], "10");
    });
});
