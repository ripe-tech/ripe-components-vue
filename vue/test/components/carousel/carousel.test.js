const assert = require("assert");
const base = require("../../base");

describe("Carousel", () => {
    it("should initialize the carousel", () => {
        const component = base.getComponent("Carousel");

        assert.strictEqual(component.exists(), true);
    });

    it("should have all the images passed in props", async () => {
        const component = base.getComponent("Carousel", {
            props: { images: ["0", "1", "2"] }
        });

        const images = component.findAll(".image");
        assert.strictEqual(images.length, 3);
        assert.strictEqual(images.at(0).attributes("src"), "0");
        assert.strictEqual(images.at(1).attributes("src"), "1");
        assert.strictEqual(images.at(2).attributes("src"), "2");
    });

    it("should only display the image with the desired index", async () => {
        const component = base.getComponent("Carousel", {
            props: { images: ["0", "1", "2", "3"], imageIndex: 2 }
        });

        const images = component.findAll(".image");
        assert.strictEqual(images.at(0).isVisible(), false);
        assert.strictEqual(images.at(1).isVisible(), false);
        assert.strictEqual(images.at(2).isVisible(), true);
        assert.strictEqual(images.at(3).isVisible(), false);
    });

    it("should hide the navigation arrows when specified by prop", async () => {
        const component = base.getComponent("Carousel", {
            props: { images: ["0", "1"], arrows: false }
        });

        const arrows = component.findAll(".arrow");
        assert.strictEqual(arrows.at(0).isVisible(), false);
        assert.strictEqual(arrows.at(1).isVisible(), false);
    });

    it("should hide the navigation arrows when there's only one image", async () => {
        const component = base.getComponent("Carousel", {
            props: { images: ["0"], arrows: true }
        });

        const arrows = component.findAll(".arrow");
        assert.strictEqual(arrows.at(0).isVisible(), false);
        assert.strictEqual(arrows.at(1).isVisible(), false);
    });

    it("should emit the correct index when given previous or next action", async () => {
        const component = base.getComponent("Carousel", {
            props: { images: ["0", "1", "2"], imageIndex: 1 }
        });
        const nextArrow = component.findAll(".arrow-next");
        const previousArrow = component.findAll(".arrow-previous");

        await nextArrow.trigger("click");
        assert.strictEqual(component.emitted("update:image-index")[0][0], 2);

        await nextArrow.trigger("click");
        assert.strictEqual(component.emitted("update:image-index")[1][0], 0);

        await previousArrow.trigger("click");
        assert.strictEqual(component.emitted("update:image-index")[2][0], 2);

        await previousArrow.trigger("click");
        assert.strictEqual(component.emitted("update:image-index")[3][0], 1);
    });
});
