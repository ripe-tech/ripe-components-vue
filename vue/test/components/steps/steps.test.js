const assert = require("assert");
const base = require("../../base");

describe("Steps", () => {
    it("should initialize the steps", () => {
        const component = base.getComponent("Steps", {
            props: { steps: ["A", "B", "C"], currentStep: 1 }
        });
        assert.strictEqual(component.exists(), true);
    });
    it("should only highlight the current step", () => {
        const component = base.getComponent("Steps", {
            props: { steps: ["A", "B", "C", "D", "E"], currentStep: 2 }
        });
        const steps = component.findAll(".step .highlight");
        assert.strictEqual(steps.at(0).isVisible(), false);
        assert.strictEqual(steps.at(1).isVisible(), true);
        assert.strictEqual(steps.at(2).isVisible(), false);
        assert.strictEqual(steps.at(2).isVisible(), false);
        assert.strictEqual(steps.at(2).isVisible(), false);
    });
    it("should have white background if step is not completed and gray if otherwise", () => {
        const component = base.getComponent("Steps", {
            props: { steps: ["A", "B", "C", "D", "E"], currentStep: 3 }
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
