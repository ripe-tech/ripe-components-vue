const DESKTOP_CLASS = "desktop";
const TABEL_CLASS = "tablet";
const MOBILE_CLASS = "mobile";

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

            body.classList.remove(DESKTOP_CLASS);
            body.classList.remove(TABEL_CLASS);
            body.classList.remove(MOBILE_CLASS);

            const tabletWidth = this.tabletWidth || TABLET_WIDTH;
            const mobileWidth = this.mobileWidth || MOBILE_WIDTH;

            if (width > tabletWidth) {
                body.classList.add(DESKTOP_CLASS);
            } else if (width > mobileWidth) {
                body.classList.add(TABEL_CLASS);
            } else {
                body.classList.add(MOBILE_CLASS);
            }
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
