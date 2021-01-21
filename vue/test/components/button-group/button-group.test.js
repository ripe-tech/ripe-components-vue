const assert = require("assert");
const base = require("../../base");

describe("ButtonGroup", () => {
    it("should initialize the button group", () => {
        const component = base.getComponent("ButtonGroup", {
            props: {
                items: [
                    { value: "1", label: "Item 1" },
                    { value: "2", label: "Item 2" },
                    { value: "3", label: "Item 3" },
                    { value: "4", label: "Item 4" },
                    { value: "5", label: "Item 5" }
                ]
            }
        });

        const buttonItems = component.findAll(".button-color");
        assert.strictEqual(buttonItems.length, 5);
        assert.strictEqual(buttonItems.at(0).text(), "Item 1");
        assert.strictEqual(buttonItems.at(1).text(), "Item 2");
        assert.strictEqual(buttonItems.at(2).text(), "Item 3");
        assert.strictEqual(buttonItems.at(3).text(), "Item 4");
        assert.strictEqual(buttonItems.at(4).text(), "Item 5");
    });

    it("should disable all buttons in the button group", async () => {
        const component = base.getComponent("ButtonGroup", {
            props: {
                items: [
                    { value: "1", label: "Item 1" },
                    { value: "2", label: "Item 2" },
                    { value: "3", label: "Item 3" },
                    { value: "4", label: "Item 4" },
                    { value: "5", label: "Item 5" }
                ],
                disabled: true
            }
        });

        let disabledButtonItems = component.findAll(".button-color.disabled");
        assert.strictEqual(disabledButtonItems.length, 5);
        assert.strictEqual(disabledButtonItems.at(0).text(), "Item 1");
        assert.strictEqual(disabledButtonItems.at(1).text(), "Item 2");
        assert.strictEqual(disabledButtonItems.at(2).text(), "Item 3");
        assert.strictEqual(disabledButtonItems.at(3).text(), "Item 4");
        assert.strictEqual(disabledButtonItems.at(4).text(), "Item 5");

        await component.setProps({ disabled: false });
        disabledButtonItems = component.findAll(".button-color.disabled");
        assert.strictEqual(disabledButtonItems.length, 0);
    });

    it("should disable 3 buttons in the button group", async () => {
        const component = base.getComponent("ButtonGroup", {
            props: {
                items: [
                    { value: "1", label: "Item 1", disabled: true },
                    { value: "2", label: "Item 2" },
                    { value: "3", label: "Item 3", disabled: true },
                    { value: "4", label: "Item 4", disabled: true },
                    { value: "5", label: "Item 5" }
                ]
            }
        });

        const disabledButtonItems = component.findAll(".button-color.disabled");
        assert.strictEqual(disabledButtonItems.length, 3);
        assert.strictEqual(disabledButtonItems.at(0).text(), "Item 1");
        assert.strictEqual(disabledButtonItems.at(1).text(), "Item 3");
        assert.strictEqual(disabledButtonItems.at(2).text(), "Item 4");
    });

    it("should select a button in the button group", async () => {
        const component = base.getComponent("ButtonGroup", {
            props: {
                items: [
                    { value: "1", label: "Item 1" },
                    { value: "2", label: "Item 2" },
                    { value: "3", label: "Item 3" },
                    { value: "4", label: "Item 4" },
                    { value: "5", label: "Item 5" }
                ],
                value: "3"
            }
        });

        let selectedButton = component.find(".button-color.selected");
        assert.strictEqual(selectedButton.exists(), true);
        assert.strictEqual(selectedButton.text(), "Item 3");

        await component.setProps({ value: "4" });
        selectedButton = component.find(".button-color.selected");
        assert.strictEqual(selectedButton.exists(), true);
        assert.strictEqual(selectedButton.text(), "Item 4");
    });
});
