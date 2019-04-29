<template>
    <div class="button button-no-style button-platforme" v-on:click="() => this.$emit('click')">
        <span class="button-logo">
            <img src="./assets/platforme_id.svg" />
        </span>
        <span class="button-text">Sign in with Platforme ID</span>
    </div>
</template>

<style scoped>
.button.button-platforme {
    background-color: #0b57af;
    border-radius: 5px;
    color: #ffffff;
    font-size: 13px;
    font-weight: 600;
    height: 50px;
    letter-spacing: 1.5px;
    line-height: 50px;
    max-width: 320px;
    text-align: center;
    text-transform: uppercase;
    transition: background-color 0.1s ease, transform 0.15s ease-out;
}

.button.button-platforme:hover {
    background-color: #0b579a;
    transform: scale(1.025, 1.025);
}

.button.button-platforme > span.button-logo {
    background-color: #143b8c;
    border-radius: 5px 0px 0px 5px;
    float: left;
    height: 50px;
    line-height: 50px;
    text-align: center;
    transition: background-color 0.1s ease;
    width: 50px;
}

.button.button-platforme:hover > span.button-logo {
    background-color: #143b78;
}

.button.button-platforme > span.button-logo > img {
    height: 26px;
    vertical-align: middle;
}
</style>

<script>
export const ButtonPlatforme = {};

export default ButtonPlatforme;
</script>
