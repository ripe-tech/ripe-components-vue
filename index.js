import { install } from "./vue";
import packageInfo from "./package.json";

export * from "./js";
export * from "./vue";

export const NAME = packageInfo.name;
export const VERSION = packageInfo.version;

export default install;
