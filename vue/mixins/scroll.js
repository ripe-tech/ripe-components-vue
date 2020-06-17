export const scrollMixin = {
    props: {
        /**
         * The number of pixels for the margin top and bottom
         * of the loading indicator of the filter.
         */
        loadingScrollOffset: {
            type: Number,
            default: 100
        },
        /**
         * The number of pixels starting from which
         * the scroll to top button appears.
         */
        scrollTopThreshold: {
            type: Number,
            default: 200
        }
    },
    data: function() {
        return {
            scrollTop: false,
            showScrollTop: false
        };
    },
    mounted: function() {
        window.addEventListener("resize", this.handleScroll);
        window.addEventListener("scroll", this.handleScroll);
    },
    destroyed: function() {
        window.removeEventListener("resize", this.handleScroll);
        window.removeEventListener("scroll", this.handleScroll);
    },
    methods: {
        handleScroll(event) {
            this.showScrollTop = window.pageYOffset > this.scrollTopThreshold;
            const bottomScroll =
                window.innerHeight + window.pageYOffset <
                document.body.offsetHeight - this.loadingScrollOffset;
            if (bottomScroll) {
                return;
            }
            this.getFilter().loadMore();
        },
        filterUpdated() {
            this.scrollTop && this.scrollToTop();
            this.scrollTop = false;
        },
        /**
         * Scrolls the page to the top by moving the main
         * window scroll position to the original top and
         * left positions.
         */
        scrollToTop() {
            window.scroll({
                top: 0,
                left: 0
            });
        }
    }
};
