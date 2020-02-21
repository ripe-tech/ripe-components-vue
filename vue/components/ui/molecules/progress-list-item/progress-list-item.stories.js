import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Progress List Item", () => ({
        props: {
            title: {
                default: text("Title", "ermenegildo_zegna")
            },
            description: {
                default: text("Description", "780.12MB")
            },
            finished: {
                default: boolean("Finished", false)
            },
            progress: {
                default: number("Progress", null)
            },
            enableAdvanceProgress: {
                default: boolean("Simulate Progress Advance", false)
            },
            advanceSpeed: {
                default: number("Simulation Advance Speed", 5)
            },
            actionText: {
                default: text("Action Text", "Go to build")
            },
            actionIcon: {
                default: text("Action Icon", "arrow-right-top")
            }
        },
        data: function() {
            return {
                progressData: this.progress,
                finishedData: this.finished
            };
        },
        watch: {
            enableAdvanceProgress() {
                this.updateProgress();
            },
            progress(value) {
                this.progressData = value;
            },
            finished(value) {
                this.finishedData = value;
            }
        },
        methods: {
            updateProgress() {
                if (!this.enableAdvanceProgress) return;
                if (this.progressData >= 100) {
                    this.finishedData = true;
                    return;
                }
                if (!this.progressData) this.progressData = 0;

                this.progressData =
                    this.progressData + this.advanceSpeed > 100
                        ? 100
                        : this.progressData + this.advanceSpeed;
                setTimeout(() => {
                    this.updateProgress();
                }, 1000);
            }
        },
        template: `
            <div>
                <progress-list-item
                    v-bind:title="title"
                    v-bind:description="description"
                    v-bind:finished="finishedData"
                    v-bind:progress="progressData"
                    v-bind:action-text="actionText"
                    v-bind:action-icon="actionIcon"
                />
            </div>
        `
    }));
