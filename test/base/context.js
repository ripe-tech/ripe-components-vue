global.window = global;

const assert = require("assert");
const ripeComponentsVue = require("../../dist/ripe-components-vue-lib.min.js");

describe("serializeContext()", function() {
    it("should be able to serialize simple context", () => {
        const context = {
            a: "abc",
            b: 10,
            c: true,
            d: false
        };
        const result = ripeComponentsVue.serializeContext(context);
        assert.deepStrictEqual(result, { a: "abc", b: "10", c: "1", d: "0" });
    });
});
