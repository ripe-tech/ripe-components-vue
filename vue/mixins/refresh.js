export const refreshMixin = {
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
                await this.refresh({ auto: true });
                this.autoRefreshing = false;
            }, this.autoRefreshTime || 6000);
        }
    }
};
