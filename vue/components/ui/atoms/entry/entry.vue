<template>
    <div class="entry">
        <div class="title">
            {{ title }}
        </div>
        <link-ripe
            class="value"
            v-bind:text="value"
            v-bind:href="link"
            v-bind:target="'_blank'"
            v-if="link"
        />
        <div class="value" v-else>
            {{ value }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
.entry {
    color: #0d0d0d;
    font-size: 14px;
    letter-spacing: 0.7px;
    padding: 16px 22px 16px 22px;
    text-align: left;
}

.entry > .title {
    font-weight: 700;
}

.entry > .value {
    display: inline-block;
    font-weight: 400;
    line-break: anywhere;
    margin: 8px 0px 0px 0px;
}
</style>

<script>
export const Entry = {
    name: "entry",
    props: {
        title: {
            type: String,
            default: null
        },
        value: {
            type: String,
            default: null
        },
        link: {
            type: String,
            default: null
        }
    }
};

export default Entry;
</script>
