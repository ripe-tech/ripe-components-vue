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
    });
});
