import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Upload Area", () => ({
        props: {
            customExample: {
                default: boolean("See custom example", false)
            }
        },
        template: `
            <div>
                <upload-area v-if="customExample">
                    <template v-slot:drag-area-slot>
                        <div style="height:150px;background-color:aqua;">
                            <p style="font-size:20px;text-align:center">
                                This is a custom drag & drop area
                            </p>
                        </div>
                    </template>
                </upload-area>
                <upload-area v-else />
            </div>
            `
    }));
