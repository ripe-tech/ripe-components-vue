const DEVICE_CLASS = "device";
const MOUSE_CLASS = "mouse";
const TOUCH_CLASS = "touch";

const DESKTOP_SIZE_CLASS = "desktop";
const TABLET_SIZE_CLASS = "tablet";
const MOBILE_SIZE_CLASS = "mobile";

const DESKTOP_DEVICE_CLASS = "desktop-device";
const TABLET_DEVICE_CLASS = "tablet-device";
const MOBILE_DEVICE_CLASS = "mobile-device";

const TABLET_WIDTH = 768;
const MOBILE_WIDTH = 420;

const TABLET_DEVICE_REGEX = new RegExp(
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i
);
const MOBILE_DEVICE_PREFIX_REGEX = new RegExp(
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i
);
const MOBILE_DEVICE_REGEX = new RegExp(
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i
);

const deviceMixin = {
    methods: {
        initDevice() {
            this.listenSize();
            this.updateSize();
            this.updateDevice();
        },
        listenSize() {
            window.addEventListener("resize", () => this.updateSize());
        },
        updateDevice() {
            const body = document.body;
            const isMobile = this._isMobileDevice(navigator.userAgent);
            const isTablet = this._isTabletDevice(navigator.userAgent);
            const isDevice = isMobile || isTablet;
            const isDesktop = !isDevice;
            const isTouch = isDevice;
            const isMouse = isDesktop;
            if (isMobile) body.classList.add(MOBILE_DEVICE_CLASS);
            if (isTablet) body.classList.add(TABLET_DEVICE_CLASS);
            if (isDevice) body.classList.add(DEVICE_CLASS);
            if (isDesktop) body.classList.add(DESKTOP_DEVICE_CLASS);
            if (isTouch) body.classList.add(TOUCH_CLASS);
            if (isMouse) body.classList.add(MOUSE_CLASS);
        },
        updateSize() {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const body = document.body;

            body.classList.remove(DESKTOP_SIZE_CLASS);
            body.classList.remove(TABLET_SIZE_CLASS);
            body.classList.remove(MOBILE_SIZE_CLASS);

            const tabletWidth = this.tabletWidth || TABLET_WIDTH;
            const mobileWidth = this.mobileWidth || MOBILE_WIDTH;

            if (width > tabletWidth) {
                body.classList.add(DESKTOP_SIZE_CLASS);
            } else if (width > mobileWidth) {
                body.classList.add(TABLET_SIZE_CLASS);
            } else {
                body.classList.add(MOBILE_SIZE_CLASS);
            }

            for (const widthTuple of this.widthTuples || []) {
                const [name, range] = widthTuple;
                const minWidth = range[0] || 0;
                const maxWidth = range[1] || 65536;
                body.classList.remove(name);
                if (width >= minWidth && width <= maxWidth) {
                    body.classList.add(name);
                }
            }

            for (const heightTuple of this.heightTuples || []) {
                const [name, range] = heightTuple;
                const minHeight = range[0] || 0;
                const maxHeight = range[1] || 65536;
                body.classList.remove(name);
                if (height >= minHeight && height <= maxHeight) {
                    body.classList.add(name);
                }
            }
        },
        setTabletWidth(width, update = false) {
            this.tabletWidth = width;
            if (update) this.updateDevice();
        },
        setMobileWidth(width, update = false) {
            this.mobileWidth = width;
            if (update) this.updateDevice();
        },
        addWidthTuple(name, range = []) {
            this.widthTuples = this.widthTuples || [];
            this.widthTuples.push([name, range]);
        },
        removeWidthTuple(name) {
            this.widthTuples = this.widthTuples || [];
            this.widthTuples = this.widthTuples.filter(v => v[0] !== name);
            document.body.classList.remove(name);
        },
        addHeightTuple(name, range = []) {
            this.heightTuples = this.heightTuples || [];
            this.heightTuples.push([name, range]);
        },
        removeHeightTuple(name) {
            this.heightTuples = this.heightTuples || [];
            this.heightTuples = this.heightTuples.filter(v => v[0] !== name);
            document.body.classList.remove(name);
        },
        _isMobileDevice(data) {
            const prefix = data.substr(0, 4);
            const mobile = MOBILE_DEVICE_REGEX.test(data);
            const mobilePrefix = MOBILE_DEVICE_PREFIX_REGEX.test(prefix);
            const isMobile = mobile || Boolean(mobilePrefix);
            return isMobile;
        },
        _isTabletDevice(data) {
            const prefix = data.substr(0, 4);
            const tablet = TABLET_DEVICE_REGEX.test(data);
            const tabletPrefix = MOBILE_DEVICE_PREFIX_REGEX.test(prefix);
            const isTablet = tablet || Boolean(tabletPrefix);
            return isTablet && !this._isMobileDevice(data);
        }
    }
};

export { deviceMixin };
