import { storiesOf } from "@storybook/vue";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("Dropdown", module)
    .addDecorator(withKnobs)
    .add("Dropdown", () => ({
        props: {},
        data: function() {
            return {
                options: [
                    {
                        id: "option_1",
                        text: "Option 1"
                    },
                    {
                        id: "option_2",
                        text: "Option 2"
                    },
                    {
                        id: "option_3",
                        text: "Option 3"
                    },
                    {
                        id: "option_4",
                        text: "Option 4"
                    },
                    {
                        id: "option_5",
                        text: "Option 5"
                    }
                ]
            };
        },
        template: `
        <div>
                <dropdown-platforme v-bind:options="options"/>
                <p>eeeeeee<p/>
                <p>eeeeeee<p/>
                <p>eeeeeee<p/>
                <p>eeeeeee<p/>
                <p>eeeeeee<p/>
                <p>eeeeeee<p/>
                </div>
                `
    }));
