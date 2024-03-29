import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Components/Animations/Animations List", module)
    .addDecorator(withKnobs)
    .add("Animations List", () => ({
        props: {
            animationDuration: {
                default: text("Animations Duration", "3s")
            }
        },
        computed: {
            style: function() {
                return {
                    padding: "10px",
                    display: "inline-block",
                    width: "200px",
                    margin: "5px;"
                };
            }
        },
        template: `
            <div>
                <animation-visualizer
                    v-bind:style="style"
                    v-bind:title="'fade-in'"
                    v-bind:animation-name="'fade-in'"
                    v-bind:animation-duration="animationDuration"
                    v-bind:animation-iteration-count="'infinite'"
                />
                <animation-visualizer
                    v-bind:style="style"
                    v-bind:title="'fade-into'"
                    v-bind:animation-name="'fade-into'"
                    v-bind:animation-duration="animationDuration"
                    v-bind:animation-iteration-count="'infinite'"
                />
                <animation-visualizer
                    v-bind:style="style"
                    v-bind:title="'fade-into-drop'"
                    v-bind:animation-name="'fade-into-drop'"
                    v-bind:animation-duration="animationDuration"
                    v-bind:animation-iteration-count="'infinite'"
                />
                <animation-visualizer
                    v-bind:style="style"
                    v-bind:title="'fade-into-rise'"
                    v-bind:animation-name="'fade-into-rise'"
                    v-bind:animation-duration="animationDuration"
                    v-bind:animation-iteration-count="'infinite'"
                />
                <animation-visualizer
                    v-bind:style="style"
                    v-bind:title="'fade-grow'"
                    v-bind:animation-name="'fade-grow'"
                    v-bind:animation-duration="animationDuration"
                    v-bind:animation-iteration-count="'infinite'"
                />
                <animation-visualizer
                    v-bind:style="style"
                    v-bind:title="'fade-grow-rise'"
                    v-bind:animation-name="'fade-grow-rise'"
                    v-bind:animation-duration="animationDuration"
                    v-bind:animation-iteration-count="'infinite'"
                />
                <animation-visualizer
                    v-bind:style="style"
                    v-bind:title="'fade-shrink-visibility'"
                    v-bind:animation-name="'fade-shrink-visibility'"
                    v-bind:animation-duration="animationDuration"
                    v-bind:animation-iteration-count="'infinite'"
                />
                <animation-visualizer
                    v-bind:style="style"
                    v-bind:title="'slide-left-fake'"
                    v-bind:animation-name="'slide-left-fake'"
                    v-bind:animation-duration="animationDuration"
                    v-bind:animation-iteration-count="'infinite'"
                />
                <animation-visualizer
                    v-bind:style="style"
                    v-bind:title="'slide-right-fake'"
                    v-bind:animation-name="'slide-right-fake'"
                    v-bind:animation-duration="animationDuration"
                    v-bind:animation-iteration-count="'infinite'"
                />
                <animation-visualizer
                    v-bind:style="style"
                    v-bind:title="'zoom'"
                    v-bind:animation-name="'zoom'"
                    v-bind:animation-duration="animationDuration"
                    v-bind:animation-iteration-count="'infinite'"
                />
            </div>
        `
    }));
