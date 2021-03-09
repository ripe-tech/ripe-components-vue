import { storiesOf } from "@storybook/vue";
import { withKnobs, number, boolean, color, select } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Carousel", module)
    .addDecorator(withKnobs)
    .add("Carousel", () => ({
        props: {
            value: {
                default: number("Image Index", 0)
            },
            width: {
                default: number("Width", 320)
            },
            height: {
                default: number("Height", 500)
            },
            animationName: {
                default: select(
                    "Animation Name",
                    {
                        fade: "fade",
                        slide: "slide"
                    },
                    "fade"
                )
            },
            arrows: {
                default: boolean("Arrows", true)
            },
            arrowsSize: {
                default: number("Arrows Size", 36)
            },
            arrowsColor: {
                default: color("Arrows Color", "#808080")
            },
            swipeThreshold: {
                default: number("Swipe Threshold", 50)
            }
        },
        data: function() {
            return {
                items: [
                    {
                        src:
                            "https://ripe-core-now.platforme.com/api/compose?brand=swear&debug=1&frame=0&model=air_rev_nitro&p=accents%3Aweb_mesh%3Awhite&p=collar%3Anappa%3Ablush&p=eyestay0_side%3Anappa%3Abeige&p=heel0_trimmings%3Anappa%3Ablush&p=heel_tab%3Anappa%3Ared&p=lace0_eyelet%3Anylon0_plastic%3Awhite&p=lining%3Acalf_lining%3Awhite&p=mudguard%3Anappa%3Ablush&p=shadow%3Adefault%3Adefault&p=side0_tongue_detail%3Anappa%3Ablush&p=sole%3Arubber_wedge%3Agum0_white&p=toe0_tongue%3Anappa%3Ablush"
                    },
                    {
                        src:
                            "https://ripe-core-now.platforme.com/api/compose?brand=swear&debug=1&frame=0&model=air_rev_nitro&p=accents%3Aweb_mesh%3Ablack&p=collar%3Anappa%3Adark_cherry&p=eyestay0_side%3Anappa%3Adark_cherry&p=heel0_trimmings%3Anappa%3Anavy&p=heel_tab%3Anappa%3Anavy&p=lace0_eyelet%3Anylon0_plastic%3Awhite&p=lining%3Acalf_lining%3Awhite&p=mudguard%3Anappa%3Anavy&p=shadow%3Adefault%3Adefault&p=side0_tongue_detail%3Anappa%3Anavy&p=sole%3Arubber_wedge%3Ablack&p=toe0_tongue%3Anappa%3Anavy"
                    },
                    {
                        src:
                            "https://ripe-core-now.platforme.com/api/compose?brand=swear&debug=1&frame=0&model=air_rev_nitro&p=accents%3Aweb_mesh%3Awhite&p=collar%3Apython%3Asilver&p=eyestay0_side%3Anappa%3Agrey&p=heel0_trimmings%3Asuede%3Agrey&p=heel_tab%3Ahairy_calf%3Awhite&p=lace0_eyelet%3Anylon0_plastic%3Awhite&p=lining%3Acalf_lining%3Awhite&p=mudguard%3Acrocodile%3Awhite&p=shadow%3Adefault%3Adefault&p=side0_tongue_detail%3Anappa%3Agrey&p=sole%3Arubber_wedge%3Atransparent0_white&p=toe0_tongue%3Apython%3Asilver"
                    },
                    {
                        src:
                            "https://ripe-core-now.platforme.com/api/compose?brand=swear&debug=1&frame=0&model=air_rev_nitro&p=accents%3Aweb_mesh%3Awhite&p=collar%3Anappa%3Aneon_yellow&p=eyestay0_side%3Anappa%3Ared&p=heel0_trimmings%3Anappa%3Aneon_yellow&p=heel_tab%3Anappa%3Ared&p=lace0_eyelet%3Anylon0_plastic%3Awhite&p=lining%3Acalf_lining%3Awhite&p=mudguard%3Anappa%3Aneon_yellow&p=shadow%3Adefault%3Adefault&p=side0_tongue_detail%3Anappa%3Aneon_yellow&p=sole%3Arubber_wedge%3Atransparent0_white&p=toe0_tongue%3Anappa%3Aneon_yellow"
                    },
                    {
                        src:
                            "https://ripe-core-now.platforme.com/api/compose?brand=swear&debug=1&frame=0&model=air_rev_nitro&p=accents%3Aweb_mesh%3Awhite&p=collar%3Anappa%3Anavy&p=eyestay0_side%3Anappa%3Ared&p=heel0_trimmings%3Anappa%3Aforest_green&p=heel_tab%3Anappa%3Agrey&p=lace0_eyelet%3Anylon0_plastic%3Awhite&p=lining%3Acalf_lining%3Awhite&p=mudguard%3Anappa%3Ablush&p=shadow%3Adefault%3Adefault&p=side0_tongue_detail%3Anappa%3Ablush&p=sole%3Arubber_wedge%3Atransparent0_black&p=toe0_tongue%3Anappa%3Agrey"
                    }
                ],
                valueData: this.value
            };
        },
        watch: {
            value(value) {
                this.valueData = value;
            }
        },
        template: `
        <div>
            <carousel
                v-bind:items="items"
                v-bind:value.sync="valueData"
                v-bind:width="width"
                v-bind:height="height"
                v-bind:animation-name="animationName"
                v-bind:arrows="arrows"
                v-bind:arrows-size="arrowsSize"
                v-bind:arrows-color="arrowsColor"
                v-bind:swipe-threshold="swipeThreshold"
            >
            </carousel>
            <p>{{valueData}} </p>
            <carousel
                v-bind:width="width"
                v-bind:height="height"
                v-bind:arrows="arrows"
                v-bind:arrows-size="arrowsSize"
                v-bind:arrows-color="arrowsColor"
                v-bind:swipe-threshold="swipeThreshold"
            >
                <template v-slot:slide-1>
                    Slide 1
                </template>
                <template v-slot:slide-2>
                    Slide 2
                </template>
                <template v-slot:slide-3>
                    Slide 3
                </template>
            </carousel>
        </div>
        `
    }));
