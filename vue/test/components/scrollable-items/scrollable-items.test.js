const assert = require("assert");
const base = require("../../base");

describe("Scrollable Items", () => {
    it("should initiate the componet", async () => {
        const component = base.getComponent("ScrollableItems", {
            props: {
                items: [
                    { label: "Item Example 1", value: "item1" },
                    { label: "Item Example 2", value: "item2" },
                    { label: "Item Example 3", value: "item3" },
                    { label: "Item Example 4", value: "item4" },
                    { label: "Item Example 5", value: "item5" },
                    { label: "Item Example 6", value: "item6" }
                ]
            }
        });

        // Setting "scrollableWidth" greater than 0 is a workaround to make the test work properly.
        // It makes the component think it doesn't have
        // enough space to show all the items
        await component.setData({ scrollableWidth: 500 });
        assert.strictEqual(component.find(".button-icon-previous").exists(), true);
        assert.strictEqual(component.find(".button-icon-next").exists(), true);
        assert.strictEqual(component.find(".items-container").exists(), true);
        assert.strictEqual(component.find(".items-container > .item-item1").exists(), true);
        assert.strictEqual(component.find(".items-container > .item-item2").exists(), true);
        assert.strictEqual(component.find(".items-container > .item-item3").exists(), true);
        assert.strictEqual(component.find(".items-container > .item-item4").exists(), true);
        assert.strictEqual(component.find(".items-container > .item-item5").exists(), true);
        assert.strictEqual(component.find(".items-container > .item-item6").exists(), true);
    });

    it("should disable/enable the arrow buttons", async () => {
        const component = base.getComponent("ScrollableItems", {
            props: {
                items: [
                    { label: "Item Example 1", value: "item1" },
                    { label: "Item Example 2", value: "item2" },
                    { label: "Item Example 3", value: "item3" },
                    { label: "Item Example 4", value: "item4" },
                    { label: "Item Example 5", value: "item5" },
                    { label: "Item Example 6", value: "item6" }
                ]
            }
        });

        // Setting "scrollableWidth" greater than 0 is a workaround to make the test work properly.
        // It makes the component think it doesn't have
        // enough space to show all the items
        await component.setData({ scrollableWidth: 500 });

        assert.strictEqual(component.find(".button-icon-previous").exists(), true);
        assert.strictEqual(component.find(".button-icon-next").exists(), true);

        await component.setProps({ arrows: false });
        assert.strictEqual(component.find(".button-icon-previous").exists(), false);
        assert.strictEqual(component.find(".button-icon-next").exists(), false);

        await component.setProps({ arrows: true });
        assert.strictEqual(component.find(".button-icon-previous").exists(), true);
        assert.strictEqual(component.find(".button-icon-next").exists(), true);
    });

    it("should auto hide the arrows buttons", async () => {
        const component = base.getComponent("ScrollableItems", {
            props: {
                items: [
                    { label: "Item Example 1", value: "item1" },
                    { label: "Item Example 2", value: "item2" },
                    { label: "Item Example 3", value: "item3" },
                    { label: "Item Example 4", value: "item4" },
                    { label: "Item Example 5", value: "item5" },
                    { label: "Item Example 6", value: "item6" }
                ]
            }
        });

        await component.setData({ scrollableWidth: 500 });
        assert.strictEqual(component.find(".button-icon-previous").exists(), true);
        assert.strictEqual(component.find(".button-icon-next").exists(), true);

        await component.setData({ scrollableWidth: 0 });
        assert.strictEqual(component.find(".button-icon-previous").exists(), false);
        assert.strictEqual(component.find(".button-icon-next").exists(), false);

        await component.setData({ scrollableWidth: 500 });
        assert.strictEqual(component.find(".button-icon-previous").exists(), true);
        assert.strictEqual(component.find(".button-icon-next").exists(), true);

        await component.setProps({ autoHideArrows: false });
        await component.setData({ scrollableWidth: 500 });
        assert.strictEqual(component.find(".button-icon-previous").exists(), true);
        assert.strictEqual(component.find(".button-icon-next").exists(), true);

        await component.setData({ scrollableWidth: 0 });
        assert.strictEqual(component.find(".button-icon-previous").exists(), true);
        assert.strictEqual(component.find(".button-icon-next").exists(), true);
    });

    /*
    it("should change the selected item when the item is clicked", async () => {
        const component = base.getComponent("ScrollableItems", {
            props: {
                items: [
                    { label: "Item Example 1", value: "item1" },
                    { label: "Item Example 2", value: "item2" },
                    { label: "Item Example 3", value: "item3" },
                    { label: "Item Example 4", value: "item4" },
                    { label: "Item Example 5", value: "item5" },
                    { label: "Item Example 6", value: "item6" }
                ]
            }
        });
    });

    it("should change the selected item when the arrow buttons are clicked", async () => {
        const component = base.getComponent("ScrollableItems", {
            props: {
                items: [
                    { label: "Item Example 1", value: "item1" },
                    { label: "Item Example 2", value: "item2" },
                    { label: "Item Example 3", value: "item3" },
                    { label: "Item Example 4", value: "item4" },
                    { label: "Item Example 5", value: "item5" },
                    { label: "Item Example 6", value: "item6" }
                ]
            }
        });
    });

    it("should disable the arrow buttons when the select item is one of the tips of the items list", async () => {
        const component = base.getComponent("ScrollableItems", {
            props: {
                items: [
                    { label: "Item Example 1", value: "item1" },
                    { label: "Item Example 2", value: "item2" },
                    { label: "Item Example 3", value: "item3" },
                    { label: "Item Example 4", value: "item4" },
                    { label: "Item Example 5", value: "item5" },
                    { label: "Item Example 6", value: "item6" }
                ]
            }
        });
    }); */
});
