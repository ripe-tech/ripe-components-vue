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
