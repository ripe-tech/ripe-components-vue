export class Assets {
    constructor(options) {
        this.options = options;
    }

    async load() {
        let values = {};
        if (this.options.assetsUrl) {
            const response = await fetch(this.options.assetsUrl);
            values = await response.json();
        }
        Object.assign(this, values);
    }
}

export default Assets;
