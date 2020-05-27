const testUtils = require("@vue/test-utils");
const ripeComponentsVue = require("../components");

const localVue = testUtils.createLocalVue();
localVue.use(ripeComponentsVue.install);

const getComponent = function(component, props = {}) {
    return testUtils.shallowMount(ripeComponentsVue[component], {
        propsData: props,
        localVue: localVue
    });
};

module.exports = {
    getComponent: getComponent
};
