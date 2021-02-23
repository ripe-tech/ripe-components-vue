const Vue = require("vue").default;
const testUtils = require("@vue/test-utils");
const globalEvents = require("vue-global-events");
const vuex = require("vuex");

const components = require("../components");

const mocks = require("./mocks");

const localVue = testUtils.createLocalVue();

localVue.use(vuex);
localVue.use(components.install);
localVue.component("global-events", globalEvents.default);
localVue.mixin(mocks.deviceMockMixin);
localVue.prototype.$bus = new Vue();

/**
 * Initializes a mounted component.
 *
 * @param {String} component The name of the component.
 * @param {Object} options An options object with:
 * - 'props' - The props to initialize the component with.
 * - 'route' - Optionally, define the current route for Vue Router.
 * - 'mixins' - Optionally, add or override mixins for the component.
 * - 'mocks' - The set of mocks to apply.
 */
const getComponent = function(
    component,
    { props = {}, route = null, mixins = [], mocks = {} } = {}
) {
    const options = {
        propsData: props,
        localVue: localVue,
        mixins: mixins,
        mocks: mocks
    };
    if (route) {
        options.mocks.$route = route;
    }
    const wrapper = testUtils.mount(components[component] || {}, options);
    return wrapper;
};

/**
 * Initializes and mount a custom component.
 *
 * @param {Object} component Custom component to initialize.
 * @param {Object} options An options object with:
 * - 'props' - The props to initialize the component with.
 * - 'route' - Optionally, define the current route for Vue Router.
 * - 'mixins' - Optionally, add or override mixins for the component.
 * - 'mocks' - The set of mocks to apply.
 * - 'provide' - Optionally, add properties for components to use in injections
 * - 'store' - The definition of the Vuex store
 */
const getCustomComponent = function(
    component,
    { props = {}, route = null, mixins = [], mocks = {}, provide = {}, store = {} } = {}
) {
    const options = {
        propsData: props,
        localVue: localVue,
        mixins: mixins,
        mocks: mocks,
        provide: provide,
        store: new vuex.Store(store)
    };
    if (route) {
        options.mocks.$route = route;
    }
    const wrapper = testUtils.mount(component, options);
    return wrapper;
};

module.exports = {
    getComponent: getComponent,
    getCustomComponent: getCustomComponent
};
