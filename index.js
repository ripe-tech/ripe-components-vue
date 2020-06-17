import { install } from "./vue";
import { name, version } from "./package.json";

export * from "./js";
export * from "./vue";

export const NAME = name;
export const VERSION = version;

export default install;
