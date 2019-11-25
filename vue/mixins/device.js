const DESKTOP = "desktop";
const TABLET = "tablet";
const MOBILE = "mobile";

const TABLET_WIDTH = 768;
const MOBILE_WIDTH = 420;

const deviceMixin = {
    methods: {
        initDevice() {
            this.listenDevice();
            this.updateDevice();
        },
        listenDevice() {
            window.addEventListener("resize", () => this.updateDevice());
        },
        updateDevice() {
            const width = window.innerWidth;
            const body = document.body;

            body.classList.remove(DESKTOP);
            body.classList.remove(TABLET);
            body.classList.remove(MOBILE);

            const tabletWidth = this.tabletWidth || TABLET_WIDTH;
            const mobileWidth = this.mobileWidth || MOBILE_WIDTH;

            let device;
            if (width > tabletWidth) {
                device = DESKTOP;
            } else if (width > mobileWidth) {
                device = TABLET;
            } else {
                device = MOBILE;
            }

            body.classList.add(device);
            this.$device = device;
            this.$bus.$emit("update:device", device);
        },
        setTabletWidth(width, update = false) {
            this.tabletWidth = width;
            if (update) this.updateDevice();
        },
        setMobileWidth(width, update = false) {
            this.mobileWidth = width;
            if (update) this.updateDevice();
        }
    }
};

export { deviceMixin };
