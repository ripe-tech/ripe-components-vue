import { Attachments } from "./attachments/attachments.vue";
import { Avatar } from "./avatar/avatar.vue";
import { Breadcrumbs } from "./breadcrumbs/breadcrumbs.vue";
import { Bubble } from "./bubble/bubble.vue";
import { ButtonColor } from "./button-color/button-color.vue";
import { ButtonIcon } from "./button-icon/button-icon.vue";
import { ButtonPlatforme } from "./button-platforme/button-platforme.vue";
import { Checkbox } from "./checkbox/checkbox.vue";
import { Checkmark } from "./checkmark/checkmark.vue";
import { Container } from "./container/container.vue";
import { Dropdown } from "./dropdown/dropdown.vue";
import { Entry } from "./entry/entry.vue";
import { Icon } from "./icon/icon.vue";
import { Image } from "./image/image.vue";
import { ImageItem } from "./image-item/image-item.vue";
import { Input } from "./input/input.vue";
import { Label } from "./label/label.vue";
import { Link } from "./link/link.vue";
import { Loader } from "./loader/loader.vue";
import { LoaderLogo } from "./loader-logo/loader-logo.vue";
import { Overlay } from "./overlay/overlay.vue";
import { Padded } from "./padded/padded.vue";
import { Paragraph } from "./paragraph/paragraph.vue";
import { Radio } from "./radio/radio.vue";
import { Reaction } from "./reaction/reaction.vue";
import { RichTextarea } from "./rich-textarea/rich-textarea.vue";
import { Side } from "./side/side.vue";
import { SVGViewer } from "./svg-viewer/svg-viewer.vue";
import { Switcher } from "./switcher/switcher.vue";
import { Tag } from "./tag/tag.vue";
import { Textarea } from "./textarea/textarea.vue";
import { Title } from "./title/title.vue";

const install = Vue => {
    Vue.component("attachments", Attachments);
    Vue.component("avatar", Avatar);
    Vue.component("breadcrumbs", Breadcrumbs);
    Vue.component("bubble", Bubble);
    Vue.component("button-color", ButtonColor);
    Vue.component("button-icon", ButtonIcon);
    Vue.component("button-platforme", ButtonPlatforme);
    Vue.component("checkbox", Checkbox);
    Vue.component("checkmark", Checkmark);
    Vue.component("container-ripe", Container);
    Vue.component("dropdown", Dropdown);
    Vue.component("entry", Entry);
    Vue.component("icon", Icon);
    Vue.component("image-ripe", Image);
    Vue.component("image-item", ImageItem);
    Vue.component("input-ripe", Input);
    Vue.component("label-ripe", Label);
    Vue.component("link-ripe", Link);
    Vue.component("loader", Loader);
    Vue.component("loader-logo", LoaderLogo);
    Vue.component("overlay", Overlay);
    Vue.component("padded", Padded);
    Vue.component("paragraph", Paragraph);
    Vue.component("radio", Radio);
    Vue.component("reaction", Reaction);
    Vue.component("rich-textarea", RichTextarea);
    Vue.component("side", Side);
    Vue.component("svg-viewer", SVGViewer);
    Vue.component("switcher", Switcher);
    Vue.component("tag", Tag);
    Vue.component("textarea-ripe", Textarea);
    Vue.component("title-ripe", Title);
};

export {
    Attachments,
    Avatar,
    Breadcrumbs,
    Bubble,
    ButtonColor,
    ButtonIcon,
    ButtonPlatforme,
    Checkbox,
    Checkmark,
    Container,
    Dropdown,
    Entry,
    Icon,
    Image,
    ImageItem,
    Input,
    Label,
    Link,
    Loader,
    LoaderLogo,
    Overlay,
    Padded,
    Paragraph,
    Radio,
    Reaction,
    RichTextarea,
    Side,
    SVGViewer,
    Switcher,
    Tag,
    Textarea,
    Title
};

export default install;
