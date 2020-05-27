const assert = require("assert");
const base = require("../../../../test/base");

console.log("este");

describe("ButtonColor", () => {
    it("Can use custom text", () => {
        const component = base.getComponent("ButtonColor", {
            text: "My text"
        });
        assert.strictEqual(component.text(), "My text");
    });
});
