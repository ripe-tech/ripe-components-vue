const assert = require("assert");
const base = require("../../base");

describe("InputImage", () => {
    it("should initialize the input image", () => {
        const component = base.getComponent("InputImage");

        assert.strictEqual(component.exists(), true);
    });
});
