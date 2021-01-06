const assert = require("assert");
const base = require("../../base");

describe("Steps", () => {
    it("should initialize the steps", () => {
        const component = base.getComponent("Steps", {
            props: { steps: ["A", "B", "C"], step: 1 }
        });
        assert.strictEqual(component.exists(), true);
    });

    it("should only highlight the current step", () => {
        const component = base.getComponent("Steps", {
            props: { steps: ["A", "B", "C", "D", "E"], step: 2 }
        });
        const steps = component.findAll(".step .highlight");
        assert.strictEqual(steps.at(0).isVisible(), false);
        assert.strictEqual(steps.at(1).isVisible(), true);
        assert.strictEqual(steps.at(2).isVisible(), false);
        assert.strictEqual(steps.at(2).isVisible(), false);
        assert.strictEqual(steps.at(2).isVisible(), false);
    });

    it("should change to clicked step and emit change", async () => {
        const component = base.getComponent("Steps", {
            props: { steps: ["A", "B", "C", "D", "E"], step: 1, clickable: true }
        });
        const steps = component.findAll(".step");
        await steps.at(4).trigger("click");
        assert.strictEqual(component.vm.$data.stepData, 5);
        assert.strictEqual(component.emitted("update:value")[0][0], 5);
        await steps.at(2).trigger("click");
        assert.strictEqual(component.vm.$data.stepData, 3);
        assert.strictEqual(component.emitted("update:value")[1][0], 3);
    });

    it("should have white background if step is not completed and gray if otherwise", () => {
        const component = base.getComponent("Steps", {
            props: { steps: ["A", "B", "C", "D", "E"], step: 3 }
        });
        const steps = component.findAll(".step .step-number");
        assert.strictEqual(
            steps
                .at(0)
                .attributes("style")
                .includes("rgb(89, 98, 109)"),
            true
        );
        assert.strictEqual(
            steps
                .at(1)
                .attributes("style")
                .includes("rgb(89, 98, 109)"),
            true
        );
        assert.strictEqual(
            steps
                .at(2)
                .attributes("style")
                .includes("rgb(89, 98, 109)"),
            true
        );
        assert.strictEqual(
            steps
                .at(3)
                .attributes("style")
                .includes("rgb(255, 255, 255)"),
            true
        );
        assert.strictEqual(
            steps
                .at(4)
                .attributes("style")
                .includes("rgb(255, 255, 255)"),
            true
        );
    });
});
