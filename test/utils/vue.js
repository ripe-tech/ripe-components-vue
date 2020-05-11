import { createLocalVue, shallowMount } from "@vue/test-utils";
import { install } from "../../";

const localVue = createLocalVue();
localVue.use(install);

export const getComponent = function(component, props = {}) {
    return shallowMount(component, {
        propsData: props,
        localVue: localVue
    });
};
