export const refreshMixin = {
    mounted: function() {
        this.refreshTimeInterval = setInterval(
            () => this.refresh({ auto: true }),
            this.autoRefreshTime || 6000
        );
    },
    destroyed: async function() {
        clearInterval(this.refreshTimeInterval);
    }
};
