import { storiesOf } from "@storybook/vue";
import { withKnobs, select, text } from "@storybook/addon-knobs";

storiesOf("Animations", module)
    .addDecorator(withKnobs)
    .add("Animation Visualizer", () => ({
        props: {
            animationName: {
                default: select(
                    "Animation Name",
                    {
                        "fade-in": "fade-in",
                        "fade-into": "fade-into",
                        "fade-into-drop": "fade-into-drop",
                        "fade-into-rise": "fade-into-rise",
                        "fade-grow": "fade-grow",
                        "fade-grow-rise": "fade-grow-rise",
                        "fade-shrink-visibility": "fade-shrink-visibility",
                        "slide-left-fake": "slide-left-fake",
                        "slide-right-fake": "slide-right-fake",
                        zoom: "zoom"
                    },
                    "fade-in"
                )
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
            },
            animationPlayState: {
                default: text("Animation Play State", null)
            }
        },
        template: `
            <div>
                <animation-visualizer
                    v-bind:animation-name="animationName"
                    v-bind:animation-duration="animationDuration"
                    v-bind:animation-timing-function="animationTimingFunction"
                    v-bind:animation-delay="animationDelay"
                    v-bind:animation-iteration-count="animationIterationCount"
                    v-bind:animation-direction="animationDirection"
                    v-bind:animation-mode="animationMode"
                    v-bind:aanimation-play-state="animationPlayState"
                />
            </div>
        `
    }));
