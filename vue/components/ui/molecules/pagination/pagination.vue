<template>
    <div class="pagination">
        <button-icon
            class="pagination-button"
            v-bind:icon="'chevron-left'"
            v-bind:icon-stroke-width="4"
            v-bind:icon-opacity="1"
            v-bind:width="20"
            v-bind:height="20"
            v-bind:disabled="page === 1"
            v-on:click.stop="onPrevious"
        />
        <div
            class="page-number"
            v-bind:class="{ active: page === pageNumber }"
            v-bind:disabled="pageNumber === '...'"
            v-for="(pageNumber, index) in pagesNumbers"
            v-bind:key="`${pageNumber}-${index}`"
            v-on:click="event => onPageCick(event, pageNumber)"
        >
            {{ pageNumber }}
        </div>
        <button-icon
            class="pagination-button"
            v-bind:icon="'chevron-right'"
            v-bind:icon-stroke-width="4"
            v-bind:icon-opacity="1"
            v-bind:width="20"
            v-bind:height="20"
            v-bind:disabled="page === pages"
            v-on:click.stop="onNext"
        />
    </div>
</template>

<style scoped>
.pagination {
    display: block;
}

.pagination > .page-number {
    border: 1px solid transparent;
    border-radius: 4px 4px 4px 4px;
    cursor: pointer;
    display: inline-block;
    height: 25px;
    line-height: 25px;
    margin: 0px 5px 0px 5px;
    padding: 0px 0px 0px 0px;
    text-align: center;
    width: 25px;
}

.pagination > .page-number.active {
    border: 1px solid #000000;
    font-weight: 700;
}
</style>

<script>
export const Pagination = {
    name: "pagination",
    props: {
        page: {
            type: Number,
            default: 1
        },
        pages: {
            type: Number,
            default: 1
        },
        hideLong: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        pagesNumbers() {
            if (!this.hideLong) return Array.from({ length: this.pages }, (_, i) => i + 1);

            if (this.pages <= 7) return Array.from({ length: this.pages }, (_, i) => i + 1);
            if (this.page > 0 && this.page < 4) {
                return [1, 2, 3, 4, "...", this.pages - 1, this.pages];
            }
            if (this.page > this.pages - 4 && this.page <= this.pages) {
                return [
                    1,
                    "...",
                    this.pages - 4,
                    this.pages - 3,
                    this.pages - 2,
                    this.pages - 1,
                    this.pages
                ];
            }
            return [1, "...", this.page - 1, this.page, this.page + 1, "...", this.pages];
        }
    },
    methods: {
        onPageCick(event, page) {
            this.onPage(page);
            this.$emit("click", event);
        },
        onPage(page) {
            this.$emit("update:page", page);
        },
        onPrevious() {
            this.$emit("previous:click");
        },
        onNext() {
            this.$emit("next:click");
        }
    }
};

export default Pagination;
</script>
