const assert = require("assert");
const base = require("../../base");

describe("SliderRipe", () => {
    it("should initialize the input color", () => {
        const component = base.getComponent("SliderRipe");

        assert.strictEqual(component.exists(), true);
    });

    it("should start with value as 0 if no minimum or slider values are specified by prop", () => {
        const component = base.getComponent("SliderRipe");

        assert.strictEqual(component.vm.$data.valueData, 0);
    });

    it("should start with value set as as the minimum if no value is specified by prop", () => {
        const component = base.getComponent("SliderRipe", {
            props: { min: 22 }
        });

        assert.strictEqual(component.vm.$data.valueData, 22);
    });

    it("should start with value if it is passed by prop", () => {
        const component = base.getComponent("SliderRipe", {
            props: { value: 11 }
        });

        assert.strictEqual(component.vm.$data.valueData, 11);
    });
});
