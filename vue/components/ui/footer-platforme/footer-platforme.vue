<template>
    <div class="footer-platforme">
        <div class="links-left">
            <ul>
                <li class="copy">
                    © 2019 Platforme International
                </li>
                <li><link-platforme text="Terms" href="https://www.platforme.com/terms" /></li>
                <li><link-platforme text="Privacy" href="https://www.platforme.com/privacy" /></li>
            </ul>
        </div>
        <div class="links-right">
            <ul>
                <li>
                    <link-platforme text="Contact Platforme" href="mailto:info@platforme.com" />
                </li>
                <li><link-platforme text="Pricing" href="#" /></li>
                <li>
                    <link-platforme text="API" href="https://docs.platforme.com" target="_blank" />
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
                    <link-platforme text="About" href="https://www.platforme.com" target="_blank" />
                </li>
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
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.footer-platforme {
    border-top: 1px solid #f0f0f0;
    margin: 64px auto 0px auto;
    max-width: 1240px;
    padding-bottom: 20px;
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

ul li.copy {
    color: #6d6d6d;
    font-size: 11px;
    font-weight: 600;
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

.footer-logo {
    height: 28px;
    margin: 0px 0px 0px 0px;
    vertical-align: middle;
    width: 28px;
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
