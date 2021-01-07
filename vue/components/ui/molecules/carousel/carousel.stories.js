import { storiesOf } from "@storybook/vue";
import { withKnobs, number } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Carousel", () => ({
        props: {
            imageIndex: {
                default: number("Image Index", 0)
            }
        },
        data: function() {
            return {
                images: [
                    "https://ripe-core-now.platforme.com/api/compose?brand=swear&debug=1&frame=0&model=air_rev_nitro&p=accents%3Aweb_mesh%3Awhite&p=collar%3Anappa%3Ablush&p=eyestay0_side%3Anappa%3Abeige&p=heel0_trimmings%3Anappa%3Ablush&p=heel_tab%3Anappa%3Ared&p=lace0_eyelet%3Anylon0_plastic%3Awhite&p=lining%3Acalf_lining%3Awhite&p=mudguard%3Anappa%3Ablush&p=shadow%3Adefault%3Adefault&p=side0_tongue_detail%3Anappa%3Ablush&p=sole%3Arubber_wedge%3Agum0_white&p=toe0_tongue%3Anappa%3Ablush",
                    "https://ripe-core-now.platforme.com/api/compose?brand=swear&debug=1&frame=0&model=air_rev_nitro&p=accents%3Aweb_mesh%3Ablack&p=collar%3Anappa%3Adark_cherry&p=eyestay0_side%3Anappa%3Adark_cherry&p=heel0_trimmings%3Anappa%3Anavy&p=heel_tab%3Anappa%3Anavy&p=lace0_eyelet%3Anylon0_plastic%3Awhite&p=lining%3Acalf_lining%3Awhite&p=mudguard%3Anappa%3Anavy&p=shadow%3Adefault%3Adefault&p=side0_tongue_detail%3Anappa%3Anavy&p=sole%3Arubber_wedge%3Ablack&p=toe0_tongue%3Anappa%3Anavy",
                    "https://ripe-core-now.platforme.com/api/compose?brand=swear&debug=1&frame=0&model=air_rev_nitro&p=accents%3Aweb_mesh%3Awhite&p=collar%3Apython%3Asilver&p=eyestay0_side%3Anappa%3Agrey&p=heel0_trimmings%3Asuede%3Agrey&p=heel_tab%3Ahairy_calf%3Awhite&p=lace0_eyelet%3Anylon0_plastic%3Awhite&p=lining%3Acalf_lining%3Awhite&p=mudguard%3Acrocodile%3Awhite&p=shadow%3Adefault%3Adefault&p=side0_tongue_detail%3Anappa%3Agrey&p=sole%3Arubber_wedge%3Atransparent0_white&p=toe0_tongue%3Apython%3Asilver",
                    "https://ripe-core-now.platforme.com/api/compose?brand=swear&debug=1&frame=0&model=air_rev_nitro&p=accents%3Aweb_mesh%3Awhite&p=collar%3Anappa%3Aneon_yellow&p=eyestay0_side%3Anappa%3Ared&p=heel0_trimmings%3Anappa%3Aneon_yellow&p=heel_tab%3Anappa%3Ared&p=lace0_eyelet%3Anylon0_plastic%3Awhite&p=lining%3Acalf_lining%3Awhite&p=mudguard%3Anappa%3Aneon_yellow&p=shadow%3Adefault%3Adefault&p=side0_tongue_detail%3Anappa%3Aneon_yellow&p=sole%3Arubber_wedge%3Atransparent0_white&p=toe0_tongue%3Anappa%3Aneon_yellow",
                    "https://ripe-core-now.platforme.com/api/compose?brand=swear&debug=1&frame=0&model=air_rev_nitro&p=accents%3Aweb_mesh%3Awhite&p=collar%3Anappa%3Anavy&p=eyestay0_side%3Anappa%3Ared&p=heel0_trimmings%3Anappa%3Aforest_green&p=heel_tab%3Anappa%3Agrey&p=lace0_eyelet%3Anylon0_plastic%3Awhite&p=lining%3Acalf_lining%3Awhite&p=mudguard%3Anappa%3Ablush&p=shadow%3Adefault%3Adefault&p=side0_tongue_detail%3Anappa%3Ablush&p=sole%3Arubber_wedge%3Atransparent0_black&p=toe0_tongue%3Anappa%3Agrey"
                ],
                imageIndexData: this.imageIndex
            };
        },
        methods: {
            next() {
                this.$refs.carousel.next();
            },
            previous() {
                this.$refs.carousel.previous();
            }
        },
        watch: {
            imageIndex(value) {
                this.imageIndexData = value;
            }
        },
        template: `
        <div>
            <carousel
                v-bind:images="images"
                v-bind:image-index.sync="imageIndexData"
                ref="carousel"
            />
            <p>{{imageIndexData}} </p>
            <button v-on:click="previous"> Previous </button>
            <button v-on:click="next"> Next </button>
        </div>
        `
    }));
