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
        const messageEmptyItem = component.findAll(".dropdown-item-empty").length;

        assert.strictEqual(dropdownItems, 0);
        assert.strictEqual(messageEmptyItem, 1);
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

    it("should highlight item on item mouseover", async () => {
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

        const numItems = items.length;
        const itemIndex = Math.floor(Math.random() * numItems);
        const item = component.findAll(".dropdown-item").at(itemIndex);
        await item.trigger("mouseenter");
        await item.trigger("mouseover");
        assert.strictEqual(component.vm.$data.highlightedData[itemIndex], true);
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

        const numItems = items.length;
        const itemIndex = Math.floor(Math.random() * numItems);
        const item = component.findAll(".dropdown-item").at(itemIndex);
        await item.trigger("mouseenter");
        await item.trigger("mouseover");
        await component.vm.$nextTick();
        assert.strictEqual(component.emitted("update:highlighted").length, 1);
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

        const numItems = items.length;
        const itemIndex = Math.floor(Math.random() * numItems);
        const item = component.findAll(".dropdown-item").at(itemIndex);
        await item.trigger("click");
        await component.vm.$nextTick();
        assert.strictEqual(component.emitted("item-clicked").length, 1);
    });
});
