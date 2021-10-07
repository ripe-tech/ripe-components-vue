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
            scrollPositionY: 0,
            scrollSizeY: 0
        };
    },
    computed: {
        isScrollAtTop() {
            return this.scrollPositionY === 0;
        },
        isScrollAtBottom() {
            return window.innerHeight + this.scrollPositionY >= this.scrollSizeY;
        },
        showScrollTop() {
            return this.scrollPositionY > this.scrollTopThreshold;
        },
        hasAvailableSpace() {
            return (
                this.scrollSizeY - this.loadingScrollOffset <
                window.innerHeight + this.scrollPositionY
            );
        }
    },
    watch: {
        hasAvailableSpace(value) {
            if (value && this.getFilter) {
                this.getFilter()?.loadMore();
            }
        }
    },
    mounted: function() {
        window.addEventListener("resize", this.updateScrollState);
        window.addEventListener("scroll", this.updateScrollState);
        if (window.ResizeObserver) {
            this.resizeObserver = new window.ResizeObserver(this.updateScrollState);
            this.resizeObserver.observe(document.body);
        }
        this.updateScrollState();
    },
    destroyed: function() {
        this.resizeObserver?.unobserve(document.body);
        window.removeEventListener("scroll", this.updateScrollState);
        window.removeEventListener("resize", this.updateScrollState);
    },
    methods: {
        updateScrollState(event) {
            this.scrollPositionY = window.scrollY;
            this.scrollSizeY = document.body.offsetHeight;
        },
        filterUpdated() {
            this.scrollTop && this.scrollToTop();
            this.scrollTop = false;
        },
        /**
         * Scrolls the page to the top by moving the main
         * window scroll position to the original top and
         * left positions.
         *
         * @param {Object} options Set of options to configure
         * the way the scrolling is performed.
         */
        scrollToTop({ behavior = "smooth" } = {}) {
            window.scroll({
                top: 0,
                left: 0,
                behavior: behavior
            });
        },
        /**
         * Scrolls into requested  element for a container,
         * given the index of the element to scroll to.
         *
         * This method assumes that the elements contained in
         * the container are all regular and equivalent.
         *
         * @param {HTMLElement} container The parent container element.
         * @param {HTMLCollection} elements List of elements to iterate over.
         * @param {Number} index The index of the target element to
         * scroll to.
         */
        scrollToIndex(container, elements, index) {
            if (index < 0) return;

            const visibleStart = container.scrollTop;
            const visibleEnd = visibleStart + container.clientHeight;

            let indexStart = 0;
            for (let i = 0; i < index; i++) {
                indexStart += elements[i].offsetHeight;
            }

            const indexHeight = elements[index].offsetHeight;
            const indexEnd = indexStart + indexHeight;

            if (indexStart < visibleStart) {
                container.scrollTop = indexStart;
            } else if (indexEnd > visibleEnd) {
                container.scrollTop = indexEnd - container.clientHeight;
            }
        }
    }
};
