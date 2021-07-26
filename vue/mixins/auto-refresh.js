export const autoRefreshMixin = {
    props: {
        autoRefresh: {
            type: Boolean,
            default: false
        },
        autoRefreshButton: {
            type: Boolean,
            default: false
        },
        autoRefreshInterval: {
            type: Number,
            default: 60000
        }
    },
    data: function() {
        return {
            autoRefreshData: this.autoRefresh,
            autoRefreshing: false
        };
    },
    watch: {
        autoRefreshing: {
            handler: function(value) {
                this.$emit("update:auto:refreshing", value);
            },
            immediate: true
        },
        autoRefreshData: {
            handler: function(value) {
                if (!value && Boolean(this.refreshTimeInterval)) {
                    clearInterval(this.refreshTimeInterval);
                } else if (value) {
                    this._autoRefresh();
                }
            }
        }
    },
    mounted: function() {
        this._autoRefresh();
    },
    destroyed: async function() {
        clearInterval(this.refreshTimeInterval);
    },
    methods: {
        _autoRefresh() {
            if (!this.autoRefreshData) return;
            this.refreshTimeInterval = setInterval(async () => {
                this.autoRefreshing = true;
                await this.refresh({ loading: false });
                this.autoRefreshing = false;
            }, this.autoRefreshInterval);
            console.log(this.refreshTimeInterval);
        }
    }
};
