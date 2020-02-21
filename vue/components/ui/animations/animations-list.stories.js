import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Animations", module)
    .addDecorator(withKnobs)
    .add("Animations List", () => ({
        props: {
            animationDuration: {
                default: text("Animations Duration", "3s")
            }
        },
        template: `
            <div>
                <animation-visualizer
                    v-bind:title="'fade-in'"
                    v-bind:animation-name="'fade-in'"
                    v-bind:animation-duration="animationDuration"
                    v-bind:animation-timing-function="'infinite'"
                />
                <animation-visualizer 
                    v-bind:title="'fade-into'"
                    v-bind:animation-name="'fade-into'"
                    v-bind:animation-duration="animationDuration"
                    v-bind:animation-timing-function="'infinite'"
                />
                <animation-visualizer 
                    v-bind:title="'fade-into-drop'" 
                    v-bind:animation-name="'fade-into-drop'" 
                    v-bind:animation-duration="animationDuration"
                    v-bind:animation-timing-function="'infinite'"
                />
                <animation-visualizer 
                    v-bind:title="'fade-into-rise'" 
                    v-bind:animation-name="'fade-into-rise'" 
                    v-bind:animation-duration="animationDuration"
                    v-bind:animation-timing-function="'infinite'"
                />
                <animation-visualizer 
                    v-bind:title="'fade-grow'"
                    v-bind:animation-name="'fade-grow'"
                    v-bind:animation-duration="animationDuration"
                    v-bind:animation-timing-function="'infinite'"
                />
                <animation-visualizer 
                    v-bind:title="'fade-grow-rise'" 
                    v-bind:animation-name="'fade-grow-rise'"
                    v-bind:animation-duration="animationDuration"
                    v-bind:animation-timing-function="'infinite'"
                />
                <animation-visualizer 
                    v-bind:title="'fade-shrink-visibility'" 
                    v-bind:animation-name="'fade-shrink-visibility'"
                    v-bind:animation-duration="animationDuration"
                    v-bind:animation-timing-function="'infinite'"
                />
                <animation-visualizer 
                    v-bind:title="'slide-left-fake'" 
                    v-bind:animation-name="'slide-left-fake'"
                    v-bind:animation-duration="animationDuration"
                    v-bind:animation-timing-function="'infinite'"
                />
                <animation-visualizer 
                    v-bind:title="'slide-right-fake'"
                    v-bind:animation-name="'slide-right-fake'"
                    v-bind:animation-duration="animationDuration"
                    v-bind:animation-timing-function="'infinite'"
                />
                <animation-visualizer 
                    v-bind:title="'zoom'"
                    v-bind:animation-name="'zoom'"
                    v-bind:animation-duration="animationDuration"
                    v-bind:animation-timing-function="'infinite'"
                />
            </div>
        `
    }));
