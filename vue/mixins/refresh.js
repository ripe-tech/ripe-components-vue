export const refreshMixin = {
    props: {
        autoRefreshTime: {
            type: Number,
            default: 60000
        },
        autoRefresh: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            autoRefreshing: false
        };
    },
    watch: {
        autoRefreshing: {
            handler: function(value) {
                this.$emit("update:auto:refreshing", value);
            },
            immediate: true
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
            if (!this.autoRefresh) return;
            this.refreshTimeInterval = setInterval(async () => {
                this.autoRefreshing = true;
                await this.refresh({ loading: false });
                this.autoRefreshing = false;
            }, this.autoRefreshTime || 6000);
        }
    }
};
