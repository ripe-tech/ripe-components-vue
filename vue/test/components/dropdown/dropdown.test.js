const assert = require("assert");
const base = require("../../base");

describe("Dropdown", () => {
    it("should show a message if there are no items defined", () => {
        const items = [];
        const messageEmpty = "No items";
        const component = base.getComponent("Dropdown", {
            props: { items: items, messageEmpty: messageEmpty }
        });

        const dropdownItems = component.findAll(".dropdown-item").length;
        const messageEmptyItem = component.findAll(".dropdown-item-empty").at(0);
        assert.strictEqual(dropdownItems, 0);
        assert.strictEqual(messageEmptyItem.text(), "No items");
    });

    it("should have items accordingly with props", () => {
        const items = [
            {
                value: "text_1",
                label: "Text 1"
            },
            {
                value: "text_2"
            }
        ];
        const component = base.getComponent("Dropdown", {
            props: { items: items }
        });

        const itemsLength = component.findAll(".dropdown-item").length;
        const firstItem = component.findAll(".dropdown-item").at(0);
        const secondItem = component.findAll(".dropdown-item").at(1);
        assert.strictEqual(itemsLength, 2);
        assert.strictEqual(firstItem.text(), "Text 1");
        assert.strictEqual(secondItem.text(), "text_2");
        assert.strictEqual(component.vm.$props.items, items);
    });

    it("should close on item click", async () => {
        const items = [
            {
                value: "text_1",
                label: "Text 1"
            },
            {
                value: "text_2"
            }
        ];
        const component = base.getComponent("Dropdown", {
            props: { items: items }
        });

        assert.strictEqual(component.vm.$data.visibleData, true);
        const item = component.findAll(".dropdown-item").at(0);
        await item.trigger("click");
        assert.strictEqual(component.vm.$data.visibleData, false);
    });

    it("should set item as selected based on the props", async () => {
        const items = [
            {
                value: "text_1",
                label: "Text 1"
            },
            {
                value: "text_2"
            }
        ];
        const component = base.getComponent("Dropdown", {
            props: { items: items, selected: { 1: true } }
        });

        assert.strictEqual(component.vm.$data.selectedData[1], true);
    });

    it("should highlight item on item mouseover and dehighlight", async () => {
        const items = [
            {
                value: "text_1",
                label: "Text 1"
            },
            {
                value: "text_2"
            }
        ];
        const component = base.getComponent("Dropdown", {
            props: { items: items }
        });

        const item1Index = 0;
        const item1 = component.findAll(".dropdown-item").at(item1Index);
        await item1.trigger("mouseenter");
        await item1.trigger("mouseover");
        assert.strictEqual(component.vm.$data.highlightedData[item1Index], true);
        await item1.trigger("mouseleave");
        assert.strictEqual(component.vm.$data.highlightedData[item1Index], undefined);

        const item2Index = 1;
        const item2 = component.findAll(".dropdown-item").at(item2Index);
        await item2.trigger("mouseenter");
        await item2.trigger("mouseover");
        assert.strictEqual(component.vm.$data.highlightedData[item2Index], true);
        await item2.trigger("mouseleave");
        assert.strictEqual(component.vm.$data.highlightedData[item2Index], undefined);
    });

    it("should send the correct highlight event", async () => {
        const items = [
            {
                value: "text_1",
                label: "Text 1"
            },
            {
                value: "text_2"
            }
        ];
        const component = base.getComponent("Dropdown", {
            props: { items: items }
        });

        const itemIndex1 = 0;
        const item1 = component.findAll(".dropdown-item").at(itemIndex1);
        await item1.trigger("mouseenter");
        await item1.trigger("mouseover");
        let highlightedItem = parseInt(
            Object.keys(component.emitted("update:highlighted")[0][0])[0]
        );
        assert.strictEqual(component.emitted("update:highlighted").length, 1);
        assert.strictEqual(highlightedItem, highlightedItem);
        await item1.trigger("mouseleave");

        const itemIndex2 = 1;
        const item2 = component.findAll(".dropdown-item").at(itemIndex2);
        await item2.trigger("mouseenter");
        await item2.trigger("mouseover");
        highlightedItem = parseInt(Object.keys(component.emitted("update:highlighted")[2][0])[0]);
        assert.strictEqual(component.emitted("update:highlighted").length, 3);
        assert.strictEqual(highlightedItem, itemIndex2);
    });

    it("should send the correct click event", async () => {
        const items = [
            {
                value: "text_1",
                label: "Text 1"
            },
            {
                value: "text_2"
            }
        ];
        const component = base.getComponent("Dropdown", {
            props: { items: items }
        });

        const item = component.findAll(".dropdown-item").at(1);
        await item.trigger("click");
        const clickedItemValue = component.emitted("item-clicked")[0][0].value;
        const clickedItemIndex = component.emitted("item-clicked")[0][1];
        assert.strictEqual(component.emitted("item-clicked").length, 1);
        assert.strictEqual(item.text(), clickedItemValue);
        assert.strictEqual(1, clickedItemIndex);
    });
});
