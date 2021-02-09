import { storiesOf } from "@storybook/vue";

storiesOf("Components/Atoms/Label", module).add("Label", () => ({
    template: `
        <div>
            <div><label-ripe v-bind:text='"This is a normal label"'></label-ripe></div>
            <div><label-ripe v-bind:text='"This is a small label"' v-bind:size='"small"'></label-ripe></div>
            <div><label-ripe v-bind:text='"This is a large label"' v-bind:size='"large"'></label-ripe></div>
            <div><label-ripe v-bind:text='"This is an error label"' v-bind:color='"error"'></label-ripe></div>
        </div>
    `
}));
