<template>
    <div class="footer">
        <div class="links-left">
            <ul>
                <li class="copy">
                    © 2020 Platforme International
                </li>
                <li><link-ripe text="Terms" href="https://www.platforme.com/terms" /></li>
                <li><link-ripe text="Privacy" href="https://www.platforme.com/privacy" /></li>
            </ul>
        </div>
        <div class="links-right">
            <ul>
                <li>
                    <link-ripe text="Contact Platforme" href="mailto:info@platforme.com" />
                </li>
                <li><link-ripe text="Pricing" href="#" /></li>
                <li>
                    <link-ripe text="API" href="https://docs.platforme.com" target="_blank" />
                </li>
                <li>
                    <link-ripe text="Training" href="https://docs.platforme.com" target="_blank" />
                </li>
                <li>
                    <link-ripe text="DevPortal" href="https://dev.platforme.com" target="_blank" />
                </li>
                <li>
                    <link-ripe text="About" href="https://www.platforme.com" target="_blank" />
                </li>
            </ul>
        </div>
        <div class="links-logo">
            <span class="copy">
                © 2019 Platforme International
            </span>
            <span class="footer-logo">
                <a href="https://www.platforme.com" target="_blank" class="no-style">
                    <img src="~./assets/platforme.svg" />
                </a>
            </span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.footer {
    border-top: 1px solid #f0f0f0;
    font-size: 0px;
    margin: 64px auto 0px auto;
    max-width: 1240px;
    overflow: hidden;
    padding-bottom: 20px;
}

body.mobile .footer {
    border-top: none;
    margin-top: 18px;
    padding-bottom: 0px;
}

ul {
    display: inline-block;
    list-style: none;
    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
    width: auto;
}

ul li {
    display: inline;
    font-size: 12px;
}

body.mobile ul li {
    display: block;
    line-height: 28px;
    padding-left: 18px;
}

body.mobile ul li.copy {
    display: none;
}

ul li:hover {
    background-color: transparent;
}

.links-left,
.links-right {
    overflow: visible;
    width: calc(50% - 35px);
}

.links-left {
    float: left;
    line-height: 60px;
    text-align: left;
}

.links-right {
    float: right;
    line-height: 60px;
    text-align: right;
}

body.mobile .links-left,
body.mobile .links-right {
    display: inline-block;
    float: none;
    line-height: 0px;
    text-align: left;
    vertical-align: top;
    width: 50%;
}

.links-left ul li {
    margin-right: 12px;
}

.links-right ul li {
    margin-left: 12px;
}

.links-logo {
    height: 60px;
    line-height: 60px;
}

body.mobile .links-logo {
    height: 50px;
    line-height: 50px;
    padding: 0px 18px 0px 18px;
}

.links-logo > .copy {
    display: none;
}

body.mobile .links-logo > .copy {
    display: block;
    float: left;
}

body.mobile .links-logo > .footer-logo {
    display: block;
    float: right;
}

.copy {
    color: #6d6d6d;
    font-size: 11px;
    font-weight: 600;
}

.footer-logo {
    margin: 0px 0px 0px 0px;
    vertical-align: middle;
}

.footer-logo > a {
    border-bottom: none;
    padding-bottom: 0px;
}

.footer-logo > a:hover,
.footer-logo > a.hover {
    border-color: transparent;
}

.footer-logo > a > img {
    display: block;
    width: 30px;
}

body.mobile .footer-logo > a > img {
    display: inline-block;
    vertical-align: middle;
}

.footer-logo,
.footer-logo:not(.button-no-style) {
    background: transparent none no-repeat left 0px;
    border-bottom: none;
    cursor: pointer;
    display: inline-block;
    padding: 0px 0px 0px 0px;
}
</style>

<script>
export const Footer = {
    name: "footer-ripe"
};

export default Footer;
</script>
