const assert = require("assert");
const base = require("../../base");

describe("InputColor", () => {
    it("should initialize the input color", () => {
        const component = base.getComponent("InputColor");

        assert.strictEqual(component.exists(), true);
    });
});
