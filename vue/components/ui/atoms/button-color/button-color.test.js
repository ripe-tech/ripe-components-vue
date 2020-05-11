import { getComponent } from "../../../../../test";
import ButtonColor from "./button-color.vue";

describe("ButtonColor", () => {
    test("Can use custom text", () => {
        const component = getComponent(ButtonColor, { text: "My text" });
        expect(component.text()).toBe("My text");
    });
});
