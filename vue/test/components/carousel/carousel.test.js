const assert = require("assert");
const base = require("../../base");

describe("Carousel", () => {
    it("should initialize the carousel", () => {
        const component = base.getComponent("Carousel");

        assert.strictEqual(component.exists(), true);
    });
});
