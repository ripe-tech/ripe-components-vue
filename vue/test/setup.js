require("core-js");
require("jsdom-global")(undefined, { url: "https://mock.ripe-pulse.platforme.com/" });
global.fetch = require("node-fetch");
