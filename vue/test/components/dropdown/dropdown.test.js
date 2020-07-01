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
        const messageEmptyItem = component.find(".dropdown-item-empty");
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

        const dropdownItems = component.findAll(".dropdown-item");
        assert.strictEqual(dropdownItems.length, 2);
        assert.strictEqual(dropdownItems.at(0).text(), "Text 1");
        assert.strictEqual(dropdownItems.at(1).text(), "text_2");
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
        assert.strictEqual(component.vm.$props.visible, true);
        const item = component.findAll(".dropdown-item").at(0);
        await item.trigger("click");
        assert.strictEqual(component.vm.$data.visibleData, false);
        assert.strictEqual(component.vm.$props.visible, true);
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
        assert.strictEqual(component.vm.$data.selectedData[0], undefined);
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

        const dropdownItems = component.findAll(".dropdown-item");
        const item1 = dropdownItems.at(0);
        await item1.trigger("mouseenter");
        await item1.trigger("mouseover");
        assert.strictEqual(component.vm.$data.highlightedData[0], true);
        await item1.trigger("mouseleave");
        assert.strictEqual(component.vm.$data.highlightedData[0], undefined);

        const item2 = dropdownItems.at(1);
        await item2.trigger("mouseenter");
        await item2.trigger("mouseover");
        assert.strictEqual(component.vm.$data.highlightedData[1], true);
        await item2.trigger("mouseleave");
        assert.strictEqual(component.vm.$data.highlightedData[1], undefined);
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
        const highlightEvent = [];

        component.vm.$on("update:highlighted", value => {
            highlightEvent.push(value);
        });

        const dropdownItems = component.findAll(".dropdown-item");
        const item1 = dropdownItems.at(0);
        await item1.trigger("mouseenter");
        await item1.trigger("mouseover");
        assert.deepEqual(highlightEvent[0], { 0: true });
        await item1.trigger("mouseleave");
        assert.deepEqual(highlightEvent[1], {});

        const item2 = dropdownItems.at(1);
        await item2.trigger("mouseenter");
        await item2.trigger("mouseover");
        assert.deepEqual(highlightEvent[1], { 1: true });
        assert.strictEqual(highlightEvent.length, 3);
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

        const item = component.find(".dropdown-item");
        await item.trigger("click");
        const clickedEvents = component.emitted("item-clicked");
        assert.strictEqual(clickedEvents.length, 1);
        assert.deepEqual(clickedEvents[0], [{ label: "Text 1", value: "text_1" }, 0]);
    });
});
