const assert = require("assert");
const base = require("../../base");

describe("Scrollable Items", () => {
    it("should initiate the component", async () => {
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
        // It makes the component think it doesn't have enough space to show all the items, thus
        // the default behaviour will be to show the arrows
        await component.setData({ scrollableWidth: 500 });
        assert.strictEqual(component.find(".button-icon-previous").exists(), true);
        assert.strictEqual(component.find(".button-icon-next").exists(), true);
        const itemsContainer = component.find(".items-container");
        assert.strictEqual(itemsContainer.exists(), true);
        assert.strictEqual(itemsContainer.findAll(".item").length, 6);
        assert.strictEqual(itemsContainer.find(".item-item1").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item2").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item3").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item4").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item5").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item6").exists(), true);
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
        // It makes the component think it doesn't have enough space to show all the items, thus
        // the default behaviour will be to show the arrows
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

        // Setting "scrollableWidth" greater than 0 is a workaround to make the test work properly.
        // It makes the component think it doesn't have enough space to show all the items, thus
        // the default behaviour will be to show the arrows
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

    it("should change the selected item when it's clicked", async () => {
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
            },
            mixins: [{ methods: { snapSelectedToCenter() {} } }]
        });

        assert.strictEqual(component.emitted("update:selected"), undefined);
        const itemsContainer = component.find(".items-container");
        assert.strictEqual(itemsContainer.exists(), true);
        assert.strictEqual(itemsContainer.findAll(".item").length, 6);
        assert.strictEqual(itemsContainer.find(".item-item1").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item2").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item3").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item4").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item5").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item6").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item1.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item2.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item3.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item4.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item5.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item6.selected").exists(), false);

        await itemsContainer.find(".item-item3").trigger("click");
        assert.strictEqual(component.emitted("update:selected")[0][0], "item3");
        assert.strictEqual(itemsContainer.find(".item-item1.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item2.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item3.selected").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item4.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item5.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item6.selected").exists(), false);

        await itemsContainer.find(".item-item1").trigger("click");
        assert.strictEqual(component.emitted("update:selected")[1][0], "item1");
        assert.strictEqual(itemsContainer.find(".item-item1.selected").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item2.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item3.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item4.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item5.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item6.selected").exists(), false);

        await itemsContainer.find(".item-item6").trigger("click");
        assert.strictEqual(component.emitted("update:selected")[2][0], "item6");
        assert.strictEqual(itemsContainer.find(".item-item1.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item2.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item3.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item4.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item5.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item6.selected").exists(), true);

        await itemsContainer.find(".item-item2").trigger("click");
        assert.strictEqual(component.emitted("update:selected")[3][0], "item2");
        assert.strictEqual(itemsContainer.find(".item-item1.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item2.selected").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item3.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item4.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item5.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item6.selected").exists(), false);
    });

    it("should change the selected item via prop", async () => {
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
            },
            mixins: [{ methods: { snapSelectedToCenter() {} } }]
        });

        const itemsContainer = component.find(".items-container");
        assert.strictEqual(itemsContainer.exists(), true);
        assert.strictEqual(itemsContainer.findAll(".item").length, 6);
        assert.strictEqual(itemsContainer.find(".item-item1").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item2").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item3").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item4").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item5").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item6").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item1.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item2.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item3.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item4.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item5.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item6.selected").exists(), false);

        await component.setProps({ selected: "item3" });
        assert.strictEqual(itemsContainer.find(".item-item1.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item2.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item3.selected").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item4.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item5.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item6.selected").exists(), false);

        await component.setProps({ selected: "item1" });
        assert.strictEqual(itemsContainer.find(".item-item1.selected").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item2.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item3.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item4.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item5.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item6.selected").exists(), false);

        await component.setProps({ selected: "item6" });
        assert.strictEqual(itemsContainer.find(".item-item1.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item2.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item3.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item4.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item5.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item6.selected").exists(), true);

        await component.setProps({ selected: "item2" });
        assert.strictEqual(itemsContainer.find(".item-item1.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item2.selected").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item3.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item4.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item5.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item6.selected").exists(), false);
    });

    it("should disable the arrow buttons when the selected item is one of the tips of the items list", async () => {
        const component = base.getComponent("ScrollableItems", {
            props: {
                items: [
                    { label: "Item Example 1", value: "item1" },
                    { label: "Item Example 2", value: "item2" },
                    { label: "Item Example 3", value: "item3" },
                    { label: "Item Example 4", value: "item4" },
                    { label: "Item Example 5", value: "item5" },
                    { label: "Item Example 6", value: "item6" }
                ],
                autoHideArrows: false
            },
            mixins: [{ methods: { snapSelectedToCenter() {} } }]
        });

        assert.strictEqual(component.find(".button-icon-previous").exists(), true);
        assert.strictEqual(component.find(".button-icon-next").exists(), true);
        assert.strictEqual(component.find(".button-icon-previous.disabled").exists(), true);
        assert.strictEqual(component.find(".button-icon-next.disabled").exists(), false);

        await component.setProps({ selected: "item3" });
        assert.strictEqual(component.find(".button-icon-previous").exists(), true);
        assert.strictEqual(component.find(".button-icon-next").exists(), true);
        assert.strictEqual(component.find(".button-icon-previous.disabled").exists(), false);
        assert.strictEqual(component.find(".button-icon-next.disabled").exists(), false);

        await component.setProps({ selected: "item6" });
        assert.strictEqual(component.find(".button-icon-previous").exists(), true);
        assert.strictEqual(component.find(".button-icon-next").exists(), true);
        assert.strictEqual(component.find(".button-icon-previous.disabled").exists(), false);
        assert.strictEqual(component.find(".button-icon-next.disabled").exists(), true);

        await component.setProps({ selected: "item1" });
        assert.strictEqual(component.find(".button-icon-previous").exists(), true);
        assert.strictEqual(component.find(".button-icon-next").exists(), true);
        assert.strictEqual(component.find(".button-icon-previous.disabled").exists(), true);
        assert.strictEqual(component.find(".button-icon-next.disabled").exists(), false);
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
                ],
                autoHideArrows: false
            },
            mixins: [{ methods: { snapSelectedToCenter() {} } }]
        });

        assert.strictEqual(component.emitted("update:selected"), undefined);
        const previousButton = component.find(".button-icon-previous");
        const nextButton = component.find(".button-icon-next");
        assert.strictEqual(previousButton.exists(), true);
        assert.strictEqual(nextButton.exists(), true);
        const itemsContainer = component.find(".items-container");
        assert.strictEqual(itemsContainer.exists(), true);
        assert.strictEqual(itemsContainer.findAll(".item").length, 6);
        assert.strictEqual(itemsContainer.find(".item-item1").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item2").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item3").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item4").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item5").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item6").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item1.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item2.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item3.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item4.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item5.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item6.selected").exists(), false);

        await previousButton.trigger("click");
        assert.strictEqual(component.emitted("update:selected"), undefined);
        assert.strictEqual(itemsContainer.find(".item-item1.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item2.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item3.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item4.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item5.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item6.selected").exists(), false);

        await nextButton.trigger("click");
        assert.strictEqual(component.emitted("update:selected")[0][0], "item1");
        assert.strictEqual(itemsContainer.find(".item-item1.selected").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item2.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item3.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item4.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item5.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item6.selected").exists(), false);

        await previousButton.trigger("click");
        assert.strictEqual(component.emitted("update:selected")[1], undefined);
        assert.strictEqual(itemsContainer.find(".item-item1.selected").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item2.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item3.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item4.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item5.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item6.selected").exists(), false);

        await nextButton.trigger("click");
        assert.strictEqual(component.emitted("update:selected")[1][0], "item2");
        assert.strictEqual(itemsContainer.find(".item-item1.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item2.selected").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item3.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item4.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item5.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item6.selected").exists(), false);

        await nextButton.trigger("click");
        assert.strictEqual(component.emitted("update:selected")[2][0], "item3");
        assert.strictEqual(itemsContainer.find(".item-item1.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item2.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item3.selected").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item4.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item5.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item6.selected").exists(), false);

        await component.setProps({ selected: "item5" });
        assert.strictEqual(component.emitted("update:selected")[3][0], "item5");
        assert.strictEqual(itemsContainer.find(".item-item1.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item2.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item3.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item4.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item5.selected").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item6.selected").exists(), false);

        await nextButton.trigger("click");
        assert.strictEqual(component.emitted("update:selected")[4][0], "item6");
        assert.strictEqual(itemsContainer.find(".item-item1.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item2.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item3.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item4.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item5.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item6.selected").exists(), true);

        await nextButton.trigger("click");
        assert.strictEqual(component.emitted("update:selected")[5], undefined);
        assert.strictEqual(itemsContainer.find(".item-item1.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item2.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item3.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item4.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item5.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item6.selected").exists(), true);

        await previousButton.trigger("click");
        assert.strictEqual(component.emitted("update:selected")[5][0], "item5");
        assert.strictEqual(itemsContainer.find(".item-item1.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item2.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item3.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item4.selected").exists(), false);
        assert.strictEqual(itemsContainer.find(".item-item5.selected").exists(), true);
        assert.strictEqual(itemsContainer.find(".item-item6.selected").exists(), false);
    });
});
