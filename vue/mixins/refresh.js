export const refreshMixin = {
    mounted: function() {
        this.refreshTimeInterval = setInterval(
            () => this.refresh({ auto: true }),
            60000
        );
    },
    destroyed: async function() {
        clearInterval(this.refreshTimeInterval);
    }
};
