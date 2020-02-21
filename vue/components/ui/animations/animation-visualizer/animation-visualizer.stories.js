import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Animations", module)
    .addDecorator(withKnobs)
    .add("Animation Visualizer", () => ({
        props: {
            title: {
                default: text("Title", null)
            },
            animationName: {
                default: text("Animation Name", null)
            },
            animationDuration: {
                default: text("Animation Duration", null)
            },
            animationTimingFunction: {
                default: text("Animation Timing Function", null)
            },
            animationDelay: {
                default: text("Animation Delay", null)
            },
            animationIterationCount: {
                default: text("Animation Iteration Count", null)
            },
            animationDirection: {
                default: text("Animation Direction", null)
            },
            animationMode: {
                default: text("Animation Mode", null)
            }
        },
        template: `
            <div>
                <animation-visualizer
                    v-bind:title="title"
                    v-bind:text="text"
                    v-bind:animation-name="animationName"
                    v-bind:animation-duration="animationDuration"
                    v-bind:animation-timingFunction="animationTimingFunction"
                    v-bind:animation-delay="animationDelay"
                    v-bind:animation-iterationCount="animationIterationCount"
                    v-bind:animation-direction="animationDirection"
                    v-bind:animation-mode="animationMode"
                />
            </div>
        `
    }));
