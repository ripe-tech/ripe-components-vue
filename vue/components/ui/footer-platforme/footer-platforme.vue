<template>
    <div class="footer-platforme">
        <ul class="links-part links-left">
            <li>
                <link-platforme text="Contact Platforme" href="mailto:info@platforme.com" />
            </li>
            <li><link-platforme text="Pricing" href="#" /></li>
            <li>
                <link-platforme text="API" href="https://docs.platforme.com" target="_blank" />
            </li>
            <li>
                <link-platforme text="Training" href="https://docs.platforme.com" target="_blank" />
            </li>
        </ul>
        <ul class="links-part links-right">
            <li>
                <link-platforme text="DevPortal" href="https://dev.platforme.com" target="_blank" />
            </li>
            <li>
                <link-platforme text="About" href="https://www.platforme.com" target="_blank" />
            </li>
            <li>
                <link-platforme text="Terms" href="https://www.platforme.com/terms" />
            </li>
            <li>
                <link-platforme text="Privacy" href="https://www.platforme.com/privacy" />
            </li>
        </ul>
        <div class="links-logo">
            <span class="footer-logo">
                <a href="https://www.platforme.com" target="_blank" class="no-style">
                    <img src="~./assets/platforme.svg" />
                </a>
            </span>
            <span class="footer-text">
                © 2019 Platforme International
            </span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.footer-platforme {
    border-top: 1px solid #f0f0f0;
    margin: 64px auto 0px auto;
    max-width: 1240px;
    padding: 0px 15px 20px 15px;
}

body.tablet .footer-platforme,
body.mobile .footer-platforme {
    border: none;
    font-size: 0px;
    margin-top: 35px;
    padding: 0px 20px 50px 30px;
    padding-bottom: 50px;
}

.footer-platforme .links-part {
    display: inline-block;
    line-height: 60px;
    list-style: none;
    margin: 0px 0px 0px 0px;
    overflow: visible;
    padding: 0px 0px 0px 0px;
    width: calc(50% - 120px);
    width: auto;
}

body.tablet .footer-platforme .links-part,
body.mobile .footer-platforme .links-part {
    display: inline-block;
    float: none;
    line-height: 17px;
    width: 50%;
}

.footer-platforme .links-part.links-left {
    float: left;
    text-align: left;
}

.footer-platforme .links-part.links-right {
    float: right;
    text-align: right;
}

body.mobile .footer-platforme .links-part.links-right {
    text-align: left;
}

.footer-platforme .links-part > li {
    display: inline;
    font-size: 12px;
    margin-right: 12px;
}

.footer-platforme .links-part > li:last-child {
    margin-right: 0px;
}

.footer-platforme .links-part > li:hover {
    background-color: transparent;
}

body.tablet .footer-platforme .links-part > li,
body.mobile .footer-platforme .links-part > li {
    display: block;
    font-size: 14px;
    letter-spacing: 0.7px;
    margin: 20px 0px 0px 0px;
}

.footer-platforme .links-logo {
    height: 60px;
    line-height: 60px;
    text-align: center;
}

body.tablet .footer-platforme .links-logo,
body.mobile .footer-platforme .links-logo {
    text-align: left;
}

.footer-platforme .links-logo .footer-text {
    color: #999999;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.7px;
    margin-left: 16px;
}

body.tablet .footer-platforme .links-logo .footer-text,
body.mobile .footer-platforme .links-logo .footer-text {
    font-size: 14px;
    line-height: initial;
    margin-left: 0px;
    vertical-align: bottom;
}

.footer-platforme .links-logo .footer-logo {
    cursor: pointer;
    display: inline-block;
    height: 28px;
    vertical-align: middle;
    width: 28px;
}

body.tablet .footer-platforme .links-logo .footer-logo,
body.mobile .footer-platforme .links-logo .footer-logo {
    float: right;
    height: 60px;
    width: 60px;
}

.footer-platforme .links-logo .footer-logo > a > img {
    display: block;
}
</style>

<script>
export const FooterPlatforme = {};

export default FooterPlatforme;
</script>
