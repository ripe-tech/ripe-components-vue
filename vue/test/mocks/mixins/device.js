export const deviceMockMixin = {
    computed: {
        $device: {
            get() {
                return {
                    isDesktopWidth: true,
                    isTabletWidth: false,
                    isMobileWidth: false
                };
            },
            set() {}
        }
    }
};
