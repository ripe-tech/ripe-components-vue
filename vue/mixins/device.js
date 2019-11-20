const DESKTOP_CLASS = "desktop";
const TABEL_CLASS = "tablet";
const MOBILE_CLASS = "mobile";

const TABLET_WIDTH = 768;
const MOBILE_WIDTH = 420;

const deviceMixin = {
    methods: {
        setTabletWidth(width, update = false) {
            this.tabletWidth = width;
            if (update) this.updateDeviceClass();
        },
        setMobileWidth(width, update = false) {
            this.mobileWidth = width;
            if (update) this.updateDeviceClass();
        },
        listenDeviceChange() {
            window.addEventListener("resize", () => this.updateDeviceClass());
        },
        updateDeviceClass() {
            const width = window.innerWidth;
            const body = this._getBody();

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
        _getBody() {
            if (this._body) return this._body;

            this._body = document.getElementsByTagName("body")[0];
            return this._body;
        }
    }
};

export { deviceMixin };
