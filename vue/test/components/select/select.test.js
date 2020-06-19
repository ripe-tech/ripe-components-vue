const assert = require("assert");
const base = require("../../base");

describe("Select", () => {
    it("should start with null value", () => {
        const component = base.getComponent("Select");
        const componentData = component.vm.$data;
        assert.strictEqual(componentData.valueData, null);
    });

    it("should start with no dropdown items", () => {
        const component = base.getComponent("Select");
        const dropdownItemsLength = component.findAll(".dropdown-item").length;
        assert.strictEqual(dropdownItemsLength, 0);
    });

    it("should display all options labels according to prop", async () => {
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

        const dropdownItemsLength = component.findAll(".dropdown-item").length;
        const dropdownFirstItem = component.findAll(".dropdown-item").at(0);
        const dropdownSecondItem = component.findAll(".dropdown-item").at(1);
        const dropdownThirdItem = component.findAll(".dropdown-item").at(2);
        assert.strictEqual(dropdownItemsLength, 3);
        assert.strictEqual(dropdownFirstItem.text(), "A");
        assert.strictEqual(dropdownSecondItem.text(), "B");
        assert.strictEqual(dropdownThirdItem.text(), "C");
    });

    it("should update value according to prop", async () => {
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
        const componentData = component.vm.$data;
        const selectButton = component.get(".select-button");
        assert.strictEqual(selectButton.text(), "A");
        assert.strictEqual(componentData.valueData, "option_1");

        await component.setProps({ value: "option_2" });
        assert.strictEqual(selectButton.text(), "B");
        assert.strictEqual(componentData.valueData, "option_2");

        await component.setProps({ value: "option_3" });
        assert.strictEqual(selectButton.text(), "C");
        assert.strictEqual(componentData.valueData, "option_3");

        await component.setProps({ value: "option_1" });
        assert.strictEqual(selectButton.text(), "A");
        assert.strictEqual(componentData.valueData, "option_1");

        await component.setProps({ value: null });
        assert.strictEqual(componentData.valueData, null);

        await component.setProps({ value: "option_2" });
        assert.strictEqual(selectButton.text(), "B");
        assert.strictEqual(componentData.valueData, "option_2");
    });

    it("should update visibility according to prop", async () => {
        const component = base.getComponent("Select", {
            props: {
                visible: true
            }
        });
        const componentData = component.vm.$data;
        assert.strictEqual(componentData.visibleData, true);

        await component.setProps({ visible: false });
        assert.strictEqual(componentData.visibleData, false);
    });

    it("should update visibility on select button click", async () => {
        const component = base.getComponent("Select");
        const componentData = component.vm.$data;

        const selectButton = component.get(".select-button");
        const dropdown = component.findComponent({ name: "dropdown" });
        const dropdownData = dropdown.vm.$data;

        // toggles visibility on select-button click
        assert.strictEqual(componentData.visibleData, false);
        assert.strictEqual(dropdownData.visibleData, false);
        await selectButton.trigger("click");
        assert.strictEqual(componentData.visibleData, true);
        assert.strictEqual(dropdownData.visibleData, true);
        await selectButton.trigger("click");
        assert.strictEqual(componentData.visibleData, false);
        assert.strictEqual(dropdownData.visibleData, false);
    });

    it("should update visibility on item click", async () => {
        const component = base.getComponent("Select", {
            props: {
                options: [
                    { value: "option_1", label: "A" },
                    { value: "option_2", label: "B" },
                    { value: "option_3", label: "C" }
                ],
                visible: true
            }
        });
        const componentData = component.vm.$data;

        const dropdown = component.findComponent({ name: "dropdown" });
        const dropdownData = dropdown.vm.$data;
        const dropdownThirdItem = component.findAll(".dropdown-item").at(2);

        // toggles visibility on item click
        assert.strictEqual(componentData.visibleData, true);
        assert.strictEqual(dropdownData.visibleData, true);
        await dropdownThirdItem.trigger("click");
        assert.strictEqual(componentData.visibleData, false);
        assert.strictEqual(dropdownData.visibleData, false);
    });

    it("should doesn't update visibility on select click when is disabled", async () => {
        const component = base.getComponent("Select", {
            props: {
                options: [
                    { value: "option_1", label: "A" },
                    { value: "option_2", label: "B" },
                    { value: "option_3", label: "C" }
                ],
                disabled: true
            }
        });
        const componentData = component.vm.$data;

        const selectButton = component.get(".select-button");
        const dropdown = component.findComponent({ name: "dropdown" });
        const dropdownData = dropdown.vm.$data;

        assert.strictEqual(componentData.visibleData, false);
        assert.strictEqual(dropdownData.visibleData, false);
        await selectButton.trigger("click");
        assert.strictEqual(componentData.visibleData, false);
        assert.strictEqual(dropdownData.visibleData, false);
    });

    it("should update selected option on item click", async () => {
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
        const componentData = component.vm.$data;

        const selectButton = component.find(".select-button");
        await selectButton.trigger("click");
        const dropdownSecondItem = component.findAll(".dropdown-item").at(2);
        await dropdownSecondItem.trigger("click");
        assert.strictEqual(selectButton.text(), "C");
        assert.strictEqual(componentData.valueData, "option_3");
    });

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
        const componentData = component.vm.$data;

        const selectButton = component.find(".select-button");
        await selectButton.trigger("keydown.down");
        await selectButton.trigger("keydown.down");
        await selectButton.trigger("keydown.down");
        await selectButton.trigger("keydown.up");
        await selectButton.trigger("keydown.enter");
        assert.strictEqual(selectButton.text(), "B");
        assert.strictEqual(componentData.valueData, "option_2");
    });

    it("should display placeholder text according to prop", async () => {
        const component = base.getComponent("Select", {
            props: {
                options: [
                    { value: "option_1", label: "A" },
                    { value: "option_2", label: "B" },
                    { value: "option_3", label: "C" }
                ],
                value: null,
                placeholder: "testing"
            }
        });
        const selectButton = component.find(".select-button");
        assert.strictEqual(selectButton.text(), "testing");
    });

    it("should show dropdown with max height according to prop", async () => {
        const component = base.getComponent("Select", {
            props: {
                options: [
                    { value: "option_1", label: "A" },
                    { value: "option_2", label: "B" },
                    { value: "option_3", label: "C" },
                    { value: "option_4", label: "D" },
                    { value: "option_5", label: "E" },
                    { value: "option_6", label: "F" },
                    { value: "option_7", label: "G" },
                    { value: "option_8", label: "H" },
                    { value: "option_9", label: "I" },
                    { value: "option_10", label: "J" },
                    { value: "option_11", label: "K" },
                    { value: "option_12", label: "L" },
                    { value: "option_13", label: "M" },
                    { value: "option_14", label: "N" }
                ],
                maxHeight: 123
            }
        });
        const dropdownComponent = component.find(".dropdown");
        let dropdownStyle = dropdownComponent.attributes("style");
        assert.strictEqual(dropdownStyle.includes("max-height: 123px"), true);

        await component.setProps({ maxHeight: 321 });
        dropdownStyle = dropdownComponent.attributes("style");
        assert.strictEqual(dropdownStyle.includes("max-height: 321px"), true);
    });

    it("should highlight the item with first letter according to keypress", async () => {
        const component = base.getComponent("Select", {
            props: {
                options: [
                    { value: "option_1", label: "A" },
                    { value: "option_2", label: "B" },
                    { value: "option_3", label: "C" },
                    { value: "option_4", label: "D" },
                    { value: "option_5", label: "E" },
                    { value: "option_6", label: "F" },
                    { value: "option_7", label: "G" },
                    { value: "option_8", label: "H" },
                    { value: "option_9", label: "I" },
                    { value: "option_10", label: "J" },
                    { value: "option_11", label: "K" },
                    { value: "option_12", label: "L" },
                    { value: "option_13", label: "M" },
                    { value: "option_14", label: "N" }
                ],
                visible: true
            }
        });
        const componentData = component.vm.$data;
        const selectButton = component.find(".select-button");

        // keypress "k" should select option_11 which is index 10
        await selectButton.trigger("keydown", { key: "k" });
        assert.strictEqual(componentData.highlighted, 10);

        // keypress "f" should select option_6 which is index 5
        await selectButton.trigger("keydown", { key: "f" });
        assert.strictEqual(componentData.highlighted, 5);
    });

    it("should emit one event when visibility changes with it's new value", async () => {
        const component = base.getComponent("Select", {
            props: {
                options: [
                    { value: "option_1", label: "A" },
                    { value: "option_2", label: "B" },
                    { value: "option_3", label: "C" }
                ],
                value: "option_1",
                visible: true
            }
        });
        const selectButton = component.get(".select-button");

        await selectButton.trigger("click");
        assert.strictEqual(component.emitted("update:visible").length, 1);
        assert.strictEqual(component.emitted("update:visible")[0][0], false);
        await selectButton.trigger("click");
        assert.strictEqual(component.emitted("update:visible").length, 2);
        assert.strictEqual(component.emitted("update:visible")[1][0], true);
    });

    it("should emit one event when selectvalue changes with it's new value", async () => {
        const component = base.getComponent("Select", {
            props: {
                options: [
                    { value: "option_1", label: "A" },
                    { value: "option_2", label: "B" },
                    { value: "option_3", label: "C" }
                ],
                value: "option_1",
                visible: true
            }
        });
        const selectButton = component.get(".select-button");

        await selectButton.trigger("click");
        assert.strictEqual(component.emitted("update:visible").length, 1);
        assert.strictEqual(component.emitted("update:visible")[0][0], false);
        await selectButton.trigger("click");
        assert.strictEqual(component.emitted("update:visible").length, 2);
        assert.strictEqual(component.emitted("update:visible")[1][0], true);
    });
});
