const assert = require("assert");
const base = require("../../base");

describe("ButtonIconToggle", () => {
    it("should initialize the button icon toggle", () => {
        const component = base.getComponent("ButtonIconToggle");

        assert.strictEqual(component.exists(), true);
    });

    it("should start with false value if none is specified by prop", () => {
        const component = base.getComponent("ButtonIconToggle");

        assert.strictEqual(component.vm.$data.valueData, false);
    });

    it("should toggle the value when clicked", () => {
        const component = base.getComponent("ButtonIconToggle");

        assert.strictEqual(component.vm.$data.valueData, false);

        component.find(".button").trigger("click");
        assert.strictEqual(component.vm.$data.valueData, true);

        component.find(".button").trigger("click");
        assert.strictEqual(component.vm.$data.valueData, false);
    });

    it("should display primary color and primary icon when value is false", () => {
        const component = base.getComponent("ButtonIconToggle", {
            props: { value: false, color: "black", icon: "close" }
        });

        const buttonIconProps = component.findComponent({ name: "button-icon" }).vm.$props;
        assert.strictEqual(buttonIconProps.color, "black");
        assert.strictEqual(buttonIconProps.icon, "close");
    });

    it("should display secondary color and secondary icon when value is true", () => {
        const component = base.getComponent("ButtonIconToggle", {
            props: { value: true, colorSecondary: "white", iconSecondary: "walking" }
        });

        const buttonIconProps = component.findComponent({ name: "button-icon" }).vm.$props;
        assert.strictEqual(buttonIconProps.color, "white");
        assert.strictEqual(buttonIconProps.icon, "walking");
    });

    it("should display primary color and primary icon when value is true but secondary props are not set", () => {
        const component = base.getComponent("ButtonIconToggle", {
            props: { value: true, color: "white", icon: "walking" }
        });

        const buttonIconProps = component.findComponent({ name: "button-icon" }).vm.$props;
        assert.strictEqual(buttonIconProps.color, "white");
        assert.strictEqual(buttonIconProps.icon, "walking");
    });
});
