import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean, number, select } from "@storybook/addon-knobs";

storiesOf("atoms", module)
    .addDecorator(withKnobs)
    .add("Side", () => ({
        props: {
            position: {
                default: select(
                    "Position",
                    {
                        Left: "left",
                        Right: "right"
                    },
                    "left"
                )
            },
            width: {
                default: number("Width", 280)
            },
            visible: {
                default: boolean("Visible", true)
            },
            links: {
                default: () => [
                    {
                        value: "jobs",
                        label: "Jobs",
                        link: { name: "jobs" },
                        selected: true
                    },
                    {
                        value: "job-create",
                        label: "Create Job",
                        link: { name: "job-create" },
                        selected: false
                    },
                    {
                        value: "orders",
                        label: "Orders",
                        link: { name: "Orders" },
                        selected: false
                    },
                    {
                        value: "devices",
                        label: "Devices",
                        link: { name: "devices" },
                        selected: false
                    },
                    { value: "separator" },
                    { value: "settings", label: "Settings", disabled: true }
                ]
            }
        },
        data: function() {
            return {
                visibleData: this.visible
            };
        },
        watch: {
            visible(value) {
                this.visibleData = value;
            }
        },
        template: `
            <div>
                <side 
                    v-bind:links="links" 
                    v-bind:width="width" 
                    v-bind:visible.sync="visibleData" 
                    v-bind:position="position"
                />
                <p style="text-align: center;">Visible: {{visibleData}}</p>
            </div>`
    }));
