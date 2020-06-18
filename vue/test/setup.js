require("@babel/polyfill");
require("jsdom-global")(undefined, { url: "https://mock.ripe-pulse.platforme.com/" });
global.fetch = require("node-fetch");
