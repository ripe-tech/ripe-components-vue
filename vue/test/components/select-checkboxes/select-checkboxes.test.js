const assert = require("assert");
const base = require("../../base");

describe("Section", () => {
    it("should start with the correct state", async () => {
        const component = base.getComponent("SelectCheckboxes", {
            props: {
                label: "Label Example",
                items: [
                    { label: "Japan", value: "japan" },
                    { label: "Morocco", value: "morocco" },
                    { value: "canada" },
                    { label: "China", value: "china" },
                    { label: "Dubai", value: "dubai" },
                    { label: "Bali", value: "bali", disabled: true },
                    { label: "Tibet", value: "tibet", error: true }
                ],
                values: {
                    japan: false,
                    morocco: true,
                    canada: false,
                    china: false,
                    dubai: false,
                    bali: true
                }
            }
        });

        assert.strictEqual(
            component.find(".select > .select-container > .select-button").text(),
            "Label Example"
        );
        const dropdown = component.find(".select > .select-container > .dropdown-container");
        const checkboxes = dropdown.findAll(".checkboxes > .checkbox-group > .checkbox-item");
        assert.strictEqual(checkboxes.length, 7);
        assert.strictEqual(checkboxes.at(0).find(".checkbox.checked").exists(), false);
        assert.strictEqual(checkboxes.at(0).find(".checkbox > .checkbox-input > .label").text(), "Japan");
        assert.strictEqual(checkboxes.at(1).find(".checkbox.checked").exists(), true);
        assert.strictEqual(checkboxes.at(1).find(".checkbox > .checkbox-input > .label").text(), "Morocco");
        assert.strictEqual(checkboxes.at(2).find(".checkbox.checked").exists(), false);
        assert.strictEqual(checkboxes.at(2).find(".checkbox > .checkbox-input > .label").text(), "canada");
        assert.strictEqual(checkboxes.at(3).find(".checkbox.checked").exists(), false);
        assert.strictEqual(checkboxes.at(3).find(".checkbox > .checkbox-input > .label").text(), "China");
        assert.strictEqual(checkboxes.at(4).find(".checkbox.checked").exists(), false);
        assert.strictEqual(checkboxes.at(4).find(".checkbox > .checkbox-input > .label").text(), "Dubai");
        assert.strictEqual(checkboxes.at(5).find(".checkbox.checked").exists(), true);
        assert.strictEqual(checkboxes.at(5).find(".checkbox.disabled").exists(), true);
        assert.strictEqual(checkboxes.at(5).find(".checkbox > .checkbox-input > .label").text(), "Bali");
        assert.strictEqual(checkboxes.at(6).find(".checkbox.checked").exists(), false);
        assert.strictEqual(checkboxes.at(6).find(".checkbox.error").exists(), true);
        assert.strictEqual(checkboxes.at(6).find(".checkbox > .checkbox-input > .label").text(), "Tibet");
    });
});
