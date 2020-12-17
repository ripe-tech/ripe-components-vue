const assert = require("assert");
const base = require("../../base");

describe("Steps", () => {
    it("should initialize the steps", () => {
        const component = base.getComponent("Steps", {
            props: { steps: ["A", "B", "C"], currentStep: 1 }
        });
        assert.strictEqual(component.exists(), true);
    });
    it("should only highlight the completed steps", () => {
        const component = base.getComponent("Steps", {
            props: { steps: ["A", "B", "C"], currentStep: 1 }
        });
        const steps = component.findAll(".step .highlight");
        assert.strictEqual(steps.at(0).isVisible(), true);
        assert.strictEqual(steps.at(1).isVisible(), false);
        assert.strictEqual(steps.at(2).isVisible(), false);
    });
});
