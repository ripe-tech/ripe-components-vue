const assert = require("assert");
const base = require("../../base");

describe("ImageInput", () => {
    it("should initialize the input color", () => {
        const component = base.getComponent("ImageInput");

        assert.strictEqual(component.exists(), true);
    });
});
