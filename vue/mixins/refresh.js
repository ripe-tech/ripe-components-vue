export const refreshMixin = {
    data: function() {
        return {
            refreshInterval: 300000
        };
    },
    watch: {
        refreshInterval() {
            this.scheduleRefresh();
        }
    },
    mounted: function() {
        this.scheduleRefresh();
    },
    destroyed: async function() {
        clearInterval(this._refreshInterval);
    },
    methods: {
        scheduleRefresh() {
            clearInterval(this._refreshInterval);
            if (!this.refreshInterval) return;
            this._refreshInterval = setInterval(async () => {
                location.reload();
            }, this.refreshInterval);
        }
    }
};
