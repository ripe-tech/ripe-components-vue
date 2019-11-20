<template>
    <div class="footer-platforme">
        <!-- Desktop -->
        <div class="desktop">
            <div class="links-left">
                <ul>
                    <li class="copy">
                        © 2019 Platforme International
                    </li>
                    <li><a href="https://www.platforme.com/terms" target="_blank">Terms</a></li>
                    <li><a href="https://www.platforme.com/privacy" target="_blank">Privacy</a></li>
                </ul>
            </div>
            <div class="links-right">
                <ul>
                    <li><a href="mailto:info@platforme.com">Contact Platforme</a></li>
                    <li><a href="#">Pricing</a></li>
                    <li><a href="https://docs.platforme.com" target="_blank">API</a></li>
                    <li><a href="https://docs.platforme.com" target="_blank">Training</a></li>
                    <li><a href="https://dev.platforme.com">DevPortal</a></li>
                    <li><a href="https://www.platforme.com" target="_blank">About</a></li>
                </ul>
            </div>
            <div class="links-logo">
                <span class="footer-logo">
                    <a href="https://www.platforme.com" target="_blank" class="no-style">
                        <img src="~./assets/platforme.svg" />
                    </a>
                </span>
            </div>
        </div>
        <!-- Mobile -->
        <div class="mobile">
            <div class="container-links">
                <ul class="links-left">
                    <li><a href="mailto:info@platforme.com">Contact Platforme</a></li>
                    <li><a href="#">Pricing</a></li>
                    <li><a href="https://docs.platforme.com" target="_blank">API</a></li>
                    <li><a href="https://docs.platforme.com" target="_blank">Training</a></li>
                </ul>
                <ul class="links-left">
                    <li><a href="https://dev.platforme.com">DevPortal</a></li>
                    <li><a href="https://www.platforme.com" target="_blank">About</a></li>
                    <li><a href="https://www.platforme.com/privacy" target="_blank">Privacy</a></li>
                    <li><a href="https://www.platforme.com/terms" target="_blank">Terms</a></li>
                </ul>
            </div>
            <div class="container-foot">
                <span class="foot-left copy">
                    © 2019 Platforme International
                </span>
                <span class="foot-right footer-logo">
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

.footer-platforme .mobile{
    display:none;
}

body.mobile .footer-platforme .desktop{
    display:none;
}

body.mobile .footer-platforme .mobile {
    display: block;
}

body.mobile .container-links {
    margin: 15px 15px 0px 15px;
    display: flex;
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
    width: auto;
}

ul li {
    display: inline;
    font-size: 12px;
}

body.mobile ul li {
    display: block;
    margin: 20px 0px 0px 0px;
    letter-spacing: 0.7px;
    font-size: 14px;
}

ul li.copy {
    color: #6d6d6d;
    font-size: 11px;
    font-weight: 600;
}

body.mobile div .copy {
    color: #999999;
    line-height: 17px;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.7px;
}

ul li:hover {
    background-color: transparent;
}

.links-left,
.links-right {
    overflow: visible;
    width: calc(50% - 35px);
}

body.mobile .links-left, body.mobile
.links-right {
    float: none;
    line-height: 17px;
    overflow: visible;
    text-align: left;
    width: calc(50%);
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

body.mobile .container-foot {
    margin: 5px 0px 0px 0px;
    height: 70px;
    align-items: baseline;
    line-height: 70px;
    display: flex;
    justify-content: space-between;
}

body.mobile .foot-left {
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
