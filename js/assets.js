export class Assets {
    constructor(options) {
        this.options = options;
    }

    async load() {
        let values = {};
        if (this.options.assetsUrl) {
            const response = await fetch(this.options.assetsUrl);
            try {
                values = await response.json();
            } catch (err) {
                values = {};
            }
        }
        Object.assign(this, values);
    }
}

export default Assets;
