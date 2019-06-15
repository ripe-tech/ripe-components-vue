<template>
    <div class="footer-platforme">
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
</template>

<style scoped>
.footer-platforme {
    border-top: 1px solid #f0f0f0;
    margin: 64px auto 20px auto;
    max-width: 1240px;
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
