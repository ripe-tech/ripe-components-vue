import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Bar Chart", module)
    .addDecorator(withKnobs)
    .add("Bar Chart", () => ({
        props: {
            avatarSrc: {
                default: text("Avatar Src", "http://i.pravatar.cc")
            },
            name: {
                default: text("Name", "John Doe")
            },
            values: {
                type: Array,
                default: () => [
                    { value: 67, label: "A" },
                    { value: 90, label: "B" }
                ]
            }
        },
        template: `
        <div style="height: 100px; max-width: 300px" >
            <bar-chart
                v-bind:values="values"
            />
        </div>
        `
    }));
