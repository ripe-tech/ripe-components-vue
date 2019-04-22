<template>
    <div class="footer-platforme">
        <div class="links-left">
            <ul>
                <li>© 2019 Platforme International</li>
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
                <li><a href="#">Blog</a></li>
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

ul li:hover {
    background-color: transparent;
}

.links-left {
    float: left;
    line-height: 60px;
}

.links-right {
    float: right;
    line-height: 60px;
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
</style>

<script>
export const FooterPlatforme = {};

export default FooterPlatforme;
</script>
