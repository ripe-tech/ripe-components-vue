import { createLocalVue, shallowMount } from "@vue/test-utils";
import { install } from "../../../";
import ButtonColor from "./button-color.vue";

const localVue = createLocalVue();
localVue.use(install);

const getComponent = function(props = {}) {
    return shallowMount(ButtonColor, {
        propsData: props,
        localVue: localVue
    });
};

describe("ButtonColor", () => {
    test("Can use custom text", () => {
        const component = getComponent({ text: "My text" });
        expect(component.text()).toBe("My text");
    });
});
