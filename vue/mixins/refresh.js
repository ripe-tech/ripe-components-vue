export const refreshMixin = {
    mounted: function() {
        this.refreshTimeInterval = setInterval(async () => {
            this.autoRefreshing = true;
            await this.refresh({ auto: true });
            this.autoRefreshing = false;
        }, this.autoRefreshTime || 6000);
    },
    destroyed: async function() {
        clearInterval(this.refreshTimeInterval);
    }
};
