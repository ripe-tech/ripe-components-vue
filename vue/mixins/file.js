import ripe from "ripe-sdk";

export const fileMixin = {
    methods: {
        async fileToBase64(file) {
            const data = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = event => {
                    try {
                        const result = reader.result;
                        const data = result.substr(result.indexOf(";base64,") + ";base64,".length);
                        resolve(data);
                    } catch (err) {
                        reject(err);
                    }
                };
                reader.onerror = event => {
                    reject(new Error(event.error));
                };
                reader.readAsDataURL(file);
            });
            return data;
        },
        async fileToFileTuple(file) {
            const data = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = event => {
                    try {
                        const arrayBuffer = event.target.result;
                        const data = new Uint8Array(arrayBuffer);
                        resolve(data);
                    } catch (err) {
                        reject(err);
                    }
                };
                reader.onerror = event => {
                    reject(new Error(event.error));
                };
                reader.readAsArrayBuffer(file);
            });
            return ripe.ripe.FileTuple.fromData(data, file.name, file.type);
        }
    }
};
