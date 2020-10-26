const assert = require("assert");
const base = require("../../base");

describe("ButtonIconToggle", () => {
    it("should initialize the button icon toggle", () => {
        const component = base.getComponent("ButtonIconToggle");

        assert.strictEqual(component.exists(), true);
    });
});
