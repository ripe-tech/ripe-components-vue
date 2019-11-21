<template>
    <div class="footer-platforme">
        <div>
            <ul class="links-left">
                <li class="desktop copy">
                    © 2019 Platforme International
                </li>
                <li>
                    <link-platforme text="Terms" href="https://www.platforme.com/terms" />
                </li>
                <li>
                    <link-platforme
                        text="Privacy"
                        href="https://www.platforme.com/privacy"
                    />
                </li>
            </ul>
            <ul class="links-right">
                <li>
                    <link-platforme
                        text="Contact Platforme"
                        href="mailto:info@platforme.com"
                    />
                </li>
                <li><link-platforme text="Pricing" href="#" /></li>
                <li>
                    <link-platforme
                        text="API"
                        href="https://docs.platforme.com"
                        target="_blank"
                    />
                </li>
                <li>
                    <link-platforme
                        text="Training"
                        href="https://docs.platforme.com"
                        target="_blank"
                    />
                </li>
                <li>
                    <link-platforme
                        text="DevPortal"
                        href="https://dev.platforme.com"
                        target="_blank"
                    />
                </li>
                <li>
                    <link-platforme
                        text="About"
                        href="https://www.platforme.com"
                        target="_blank"
                    />
                </li>
            </ul>
            <div class="links-logo">
                <span class="mobile foot-left copy">
                    © 2019 Platforme International
                </span>
                <span class="footer-logo foot-right">
                    <a href="https://www.platforme.com" target="_blank" class="no-style">
                        <img src="~./assets/platforme.svg" />
                    </a>
                </span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.mobile {
    display: none;
}

body.mobile .desktop {
    display: none;
}

body.mobile .container-links {
    display: block;
    margin: 15px 15px 0px 15px;
}

.footer-platforme {
    border-top: 1px solid #f0f0f0;
    margin: 64px auto 0px auto;
    max-width: 1240px;
    padding-bottom: 20px;
}

body.mobile .footer-platforme {
    border-top: 1px solid #e4e8f0;
    margin: 0px auto 0px auto;
    padding-bottom: 50px;
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
    font-size: 14px;
    letter-spacing: 0.7px;
    margin: 20px 0px 0px 0px;
}

ul li.copy {
    color: #6d6d6d;
    font-size: 11px;
    font-weight: 600;
}

body.mobile div .copy {
    color: #999999;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.7px;
    line-height: 17px;
}

ul li:hover {
    background-color: transparent;
}

.links-left,
.links-right {
    overflow: visible;
    line-height: 60px;
    width: calc(50% - 35px);
}

body.mobile .links-left,
body.mobile .links-right {
    display: inline-block;
    float: none;
    vertical-align: top;
    line-height: 17px;
    overflow: visible;
    text-align: left;
    width: calc(50% - 10px);
}

.links-left {
    float: left;
    text-align: left;
}

body.mobile .links-left {
    margin-left: 15px;
}

.links-right {
    float: right;
    text-align: right;
}

.links-left li {
    margin-right: 12px;
}

.links-right li {
    margin-left: 12px;
}

.links-logo {
    height: 60px;
    line-height: 60px;
}

body.mobile .links-logo {
    display: block;
    height: 70px;
    line-height: 70px;
    margin: 5px 0px 0px 0px;
    text-align: justify;
}

body.mobile .links-logo::after {
    content: "";
    display: inline-block;
    width: 100%;
}

body.mobile .foot-left, body.mobile .foot-right {
    display: inline-block;
}

body.mobile .foot-left{
    margin: 0px 0px 0px 16px;
}

body.mobile .foot-right {
    margin: 0px 16px 0px 0px;
}

.footer-logo {
    height: 28px;
    margin: 0px 0px 0px 0px;
    vertical-align: middle;
    width: 28px;
}

body.mobile .footer-logo {
    height: 60px;
    vertical-align: baseline;
    width: 60px;
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
export const FooterPlatforme = {};

export default FooterPlatforme;
</script>
