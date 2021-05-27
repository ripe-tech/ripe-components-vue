const assert = require("assert");
const base = require("../../base");

describe("Select", () => {
    it("should start with null value", () => {
        const component = base.getComponent("Select");
        assert.strictEqual(component.vm.$data.valueData, null);
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

        const selectButton = component.get(".select-button");
        assert.strictEqual(selectButton.text(), "A");
        assert.strictEqual(component.vm.$data.valueData, "option_1");
        assert.strictEqual(component.emitted("update:value"), undefined);

        await component.setProps({ value: "option_2" });
        assert.strictEqual(selectButton.text(), "B");
        assert.strictEqual(component.vm.$data.valueData, "option_2");
        assert.strictEqual(component.emitted("update:value")[0][0], "option_2");

        await component.setProps({ value: "option_3" });
        assert.strictEqual(selectButton.text(), "C");
        assert.strictEqual(component.vm.$data.valueData, "option_3");
        assert.strictEqual(component.emitted("update:value")[1][0], "option_3");

        await component.setProps({ value: "option_1" });
        assert.strictEqual(selectButton.text(), "A");
        assert.strictEqual(component.vm.$data.valueData, "option_1");
        assert.strictEqual(component.emitted("update:value")[2][0], "option_1");

        await component.setProps({ value: null });
        assert.strictEqual(component.vm.$data.valueData, null);
        assert.strictEqual(component.emitted("update:value")[3][0], null);

        await component.setProps({ value: "option_2" });
        assert.strictEqual(selectButton.text(), "B");
        assert.strictEqual(component.vm.$data.valueData, "option_2");
        assert.strictEqual(component.emitted("update:value")[4][0], "option_2");
    });

    it("should update visibility according to prop", async () => {
        const component = base.getComponent("Select", {
            props: {
                visible: true
            }
        });
        assert.strictEqual(component.vm.$data.visibleData, true);

        await component.setProps({ visible: false });
        assert.strictEqual(component.vm.$data.visibleData, false);
    });

    it("should update visibility on select button click", async () => {
        const component = base.getComponent("Select");
        const selectButton = component.get(".select-button");
        const dropdown = component.findComponent({ name: "dropdown" });

        assert.strictEqual(component.vm.$data.visibleData, false);
        assert.strictEqual(dropdown.vm.$data.visibleData, false);

        await selectButton.trigger("click");
        assert.strictEqual(component.vm.$data.visibleData, true);
        assert.strictEqual(dropdown.vm.$data.visibleData, true);

        await selectButton.trigger("click");
        assert.strictEqual(component.vm.$data.visibleData, false);
        assert.strictEqual(dropdown.vm.$data.visibleData, false);
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
        const dropdown = component.findComponent({ name: "dropdown" });
        const dropdownThirdItem = component.findAll(".dropdown-item").at(2);

        assert.strictEqual(component.vm.$data.visibleData, true);
        assert.strictEqual(dropdown.vm.$data.visibleData, true);

        await dropdownThirdItem.trigger("click");
        assert.strictEqual(component.vm.$data.visibleData, false);
        assert.strictEqual(dropdown.vm.$data.visibleData, false);
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
        const selectButton = component.get(".select-button");
        const dropdown = component.findComponent({ name: "dropdown" });

        assert.strictEqual(component.vm.$data.visibleData, false);
        assert.strictEqual(dropdown.vm.$data.visibleData, false);

        await selectButton.trigger("click");
        assert.strictEqual(component.vm.$data.visibleData, false);
        assert.strictEqual(dropdown.vm.$data.visibleData, false);
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
        const selectButton = component.find(".select-button");

        await selectButton.trigger("click");
        const dropdownSecondItem = component.findAll(".dropdown-item").at(2);

        await dropdownSecondItem.trigger("click");
        assert.strictEqual(selectButton.text(), "C");
        assert.strictEqual(component.vm.$data.valueData, "option_3");
        assert.strictEqual(component.emitted("update:value")[0][0], "option_3");
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
        const selectButton = component.find(".select-button");

        await selectButton.trigger("keydown.down");
        await selectButton.trigger("keydown.down");
        await selectButton.trigger("keydown.down");
        await selectButton.trigger("keydown.up");
        await selectButton.trigger("keydown.enter");
        assert.strictEqual(selectButton.text(), "B");
        assert.strictEqual(component.vm.$data.valueData, "option_2");
        assert.strictEqual(component.emitted("update:value")[0][0], "option_2");
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
                visible: true,
                keyTimeout: 50
            }
        });
        const selectButton = component.find(".select-button");

        await selectButton.trigger("keydown", { key: "k" });
        assert.strictEqual(component.vm.$data.highlighted, 10);

        // wait for more than the key timeout to ensure that
        // the buffer is cleared
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 100));

        await selectButton.trigger("keydown", { key: "f" });
        assert.strictEqual(component.vm.$data.highlighted, 5);
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

    it("should show an input when select is opened in filter mode", async () => {
        const component = base.getComponent("Select", {
            props: {
                options: [
                    { value: "option_1", label: "A" },
                    { value: "option_2", label: "B" },
                    { value: "option_3", label: "C" }
                ],
                value: "option_1",
                visible: true,
                filter: true
            }
        });
        const selectInput = component.get(".select-input").find("input");
        assert.strictEqual(selectInput.exists(), true);
    });

    it("should properly filter the labels based on input filter value", async () => {
        const component = base.getComponent("Select", {
            props: {
                options: [
                    { value: "option_1", label: "A" },
                    { value: "option_2", label: "AB" },
                    { value: "option_2", label: "aB" },
                    { value: "option_2", label: "a" },
                    { value: "option_3", label: "CA" }
                ],
                value: "option_1",
                visible: true,
                filter: true
            }
        });
        const selectInput = component.get(".select-input");

        selectInput.setValue("a");
        await component.vm.$nextTick();
        assert.strictEqual(component.findAll(".dropdown-item").length, 4);

        selectInput.setValue("A");
        await component.vm.$nextTick();
        assert.strictEqual(component.findAll(".dropdown-item").length, 4);

        selectInput.setValue("c");
        await component.vm.$nextTick();
        assert.strictEqual(component.findAll(".dropdown-item").length, 1);

        selectInput.setValue("NOT_THERE");
        await component.vm.$nextTick();
        assert.strictEqual(component.findAll(".dropdown-item").length, 0);

        selectInput.setValue(" A ");
        await component.vm.$nextTick();
        assert.strictEqual(component.findAll(".dropdown-item").length, 0);

        selectInput.setValue("");
        await component.vm.$nextTick();
        assert.strictEqual(component.findAll(".dropdown-item").length, 5);
    });
});
