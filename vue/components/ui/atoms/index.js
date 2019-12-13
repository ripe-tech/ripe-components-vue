import { AttachmentsList } from "./attachments-list/attachments-list.vue";
import { ButtonColor } from "./button-color/button-color.vue";
import { ButtonIcon } from "./button-icon/button-icon.vue";
import { ButtonPlatforme } from "./button-platforme/button-platforme.vue";
import { Checkbox } from "./checkbox/checkbox.vue";
import { Container } from "./container/container.vue";
import { Dropdown } from "./dropdown/dropdown.vue";
import { Image } from "./image/image.vue";
import { Input } from "./input/input.vue";
import { Label } from "./label/label.vue";
import { Link } from "./link/link.vue";
import { Loader } from "./loader/loader.vue";
import { Overlay } from "./overlay/overlay.vue";
import { Radio } from "./radio/radio.vue";
import { Side } from "./side/side.vue";
import { Tag } from "./tag/tag.vue";
import { Textarea } from "./textarea/textarea.vue";

const install = Vue => {
    Vue.component("attachments-list", AttachmentsList);
    Vue.component("button-color", ButtonColor);
    Vue.component("button-icon", ButtonIcon);
    Vue.component("button-platforme", ButtonPlatforme);
    Vue.component("checkbox", Checkbox);
    Vue.component("container-ripe", Container);
    Vue.component("dropdown", Dropdown);
    Vue.component("image-ripe", Image);
    Vue.component("input-ripe", Input);
    Vue.component("label-ripe", Label);
    Vue.component("link-ripe", Link);
    Vue.component("loader", Loader);
    Vue.component("overlay", Overlay);
    Vue.component("radio", Radio);
    Vue.component("side", Side);
    Vue.component("tag", Tag);
    Vue.component("textarea-ripe", Textarea);
};

export {
    AttachmentsList,
    ButtonColor,
    ButtonIcon,
    ButtonPlatforme,
    Checkbox,
    Container,
    Dropdown,
    Image,
    Input,
    Label,
    Link,
    Loader,
    Overlay,
    Radio,
    Side,
    Tag,
    Textarea
};

export default install;
