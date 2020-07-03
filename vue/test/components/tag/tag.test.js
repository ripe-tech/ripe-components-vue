const assert = require("assert");
const base = require("../../base");

describe("Tag", () => {
    it("should have valid text", () => {
        const text = "This is text";
        const component = base.getComponent("Tag", {
            props: { text: text }
        });
        assert.strictEqual(component.text(), text);
    });
});
