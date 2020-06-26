const assert = require("assert");
const base = require("../../base");

describe("Select", () => {
    it("should update value on arrow and enter keydown", async () => {
        const component = base.getComponent("Select", {
            props: {
                options: [
                    { value: "option_1", label: "A" },
                    { value: "option_2", label: "B" },
                    { value: "option_3", label: "C" }
                ],
                value: "option_1"
            }
        });
        const selectButton = component.find(".select-button");

        await selectButton.trigger("keydown", { key: "ArrowDown" });
        console.log(1, selectButton.text());
        await selectButton.trigger("keydown", { key: "ArrowDown" });
        console.log(2, selectButton.text());
        await selectButton.trigger("keydown", { key: "ArrowDown" });
        console.log(3, selectButton.text());
        await selectButton.trigger("keydown", { key: "ArrowUp" });
        console.log(4, selectButton.text());
        await selectButton.trigger("keydown", { key: "Enter" });
        console.log(5, selectButton.text());
        assert.strictEqual(selectButton.text(), "B");
        assert.strictEqual(component.vm.$data.valueData, "option_2");
    });
});
