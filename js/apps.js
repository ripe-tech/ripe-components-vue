export const getApps = function(ctx, environment) {
    const apps = {};
    switch (environment) {
        case "production":
            if (ctx.hasPermission("ripe-copper.ui")) {
                apps.copper = {
                    text: "Copper",
                    link: "https://copper.platforme.com"
                };
            }
            if (ctx.hasPermission("ripe-pulse.ui")) {
                apps.pulse = {
                    text: "Pulse",
                    link: "https://pulse.platforme.com"
                };
            }
            if (ctx.hasPermission("ripe-white-admin.ui")) {
                apps.whiteAdmin = {
                    text: "White Admin",
                    link: "https://white-admin-ui.platforme.com"
                };
            }
            return apps;
        case "stage":
            if (ctx.hasPermission("ripe-copper.ui")) {
                apps.copper = {
                    text: "Copper Stage",
                    link: "https://ripe-copper-stage.platforme.com"
                };
            }
            if (ctx.hasPermission("ripe-pulse.ui")) {
                apps.pulse = {
                    text: "Pulse Stage",
                    link: "https://ripe-pulse-stage.platforme.com"
                };
            }
            if (ctx.hasPermission("ripe-white-admin.ui")) {
                apps.whiteAdmin = {
                    text: "White Admin Stage",
                    link: "https://ripe-white-admin-ui-stage.platforme.com"
                };
            }
            return apps;
        case "sandbox":
            if (ctx.hasPermission("ripe-copper.ui")) {
                apps.copper = {
                    text: "Copper Sandbox",
                    link: "https://ripe-copper-sbx.platforme.com"
                };
            }
            if (ctx.hasPermission("ripe-pulse.ui")) {
                apps.pulse = {
                    text: "Pulse Sandbox",
                    link: "https://ripe-pulse-sbx.platforme.com"
                };
            }
            if (ctx.hasPermission("ripe-white-admin.ui")) {
                apps.whiteAdmin = {
                    text: "White Admin Sandbox",
                    link: "https://ripe-white-admin-ui-sbx.platforme.com"
                };
            }
            return apps;
        case "ci":
            if (ctx.hasPermission("ripe-copper.ui")) {
                apps.copper = {
                    text: "Copper CI",
                    link: "https://ripe-copper-ci.platforme.com"
                };
            }
            if (ctx.hasPermission("ripe-pulse.ui")) {
                apps.pulse = {
                    text: "Pulse CI",
                    link: "https://ripe-pulse-ci.platforme.com"
                };
            }
            if (ctx.hasPermission("ripe-white-admin.ui")) {
                apps.whiteAdmin = {
                    text: "White Admin CI",
                    link: "https://ripe-white-admin-ui-ci.platforme.com"
                };
            }
            return apps;
        case "now":
            if (ctx.hasPermission("ripe-copper.ui")) {
                apps.copper = {
                    text: "Copper Now",
                    link: "https://ripe-copper-now.platforme.com"
                };
            }
            if (ctx.hasPermission("ripe-pulse.ui")) {
                apps.pulse = {
                    text: "Pulse Now",
                    link: "https://ripe-pulse-now.platforme.com"
                };
            }
            if (ctx.hasPermission("ripe-white-admin.ui")) {
                apps.whiteAdmin = {
                    text: "White Admin Now",
                    link: "https://ripe-white-admin-ui-now.platforme.com"
                };
            }
            return apps;
        default:
            if (ctx.hasPermission("ripe-copper.ui")) {
                apps.copper = {
                    text: "Copper Test",
                    link: "https://ripe-copper-test.platforme.com"
                };
            }
            if (ctx.hasPermission("ripe-pulse.ui")) {
                apps.pulse = {
                    text: "Pulse Test",
                    link: "https://ripe-pulse-test.platforme.com"
                };
            }
            if (ctx.hasPermission("ripe-white-admin.ui")) {
                apps.whiteAdmin = {
                    text: "White Admin Test",
                    link: "https://ripe-white-admin-ui-test.platforme.com"
                };
            }
            if (ctx.hasPermission("ripe-pulse.ui")) {
                apps.sputnik = {
                    text: "Sputnik Test",
                    link: "https://ripe-sputnik-ui-test.platforme.com"
                };
            }
            if (ctx.hasPermission("ripe-pulse.ui")) {
                apps.orchestra = {
                    text: "Orchestra Test",
                    link: "https://ripe-orchestra-ui-test.platforme.com"
                };
            }
            return apps;
    }
};

export default getApps;
