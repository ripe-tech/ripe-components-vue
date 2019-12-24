<template>
    <div class="attachments" v-bind:style="attachmentsStyle">
        <div class="attachments-title" v-if="title">
            {{ title }}
        </div>
        <div class="attachments-list" v-bind:style="listStyle">
            <div class="attachment" v-for="(attachment, index) in attachments" v-bind:key="index">
                <link-ripe
                    v-bind:text="attachment.name"
                    v-bind:href="attachment.path"
                    v-bind:disabled="false"
                    v-bind:size="'small'"
                    v-bind:color="'black'"
                    v-bind:target="'_blank'"
                    v-bind:ref="index"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.attachments {
    background-color: #f9fafd;
    border: 1px solid #e4e8f0;
    font-size: 0px;
}

.attachments .attachments-title {
    background-color: $white;
    border-bottom: 1px solid #e4e8f0;
    color: $light-black;
    display: block;
    font-size: 13px;
    font-weight: 600;
    height: 42px;
    letter-spacing: 0.7px;
    line-height: 42px;
    padding: 0px 20px 0px 20px;
    transition: background-color 0.15s ease-in-out;
}

.attachments .attachments-list {
    overflow: auto;
}

.attachments .attachments-list .attachment {
    background-image: url("~./assets/file.svg");
    background-position: center left 10px;
    background-repeat: no-repeat;
    background-size: 20px 20px;
    border-bottom: 1px solid #e4e8f0;
    cursor: pointer;
    height: 44px;
    padding-left: 40px;
    user-select: none;
}

.attachments .attachments-list .attachment:last-child {
    border-bottom: none;
}

.attachments .attachments-list .attachment:hover {
    background-color: $white;
}

.attachments .attachments-list .attachment:active {
    background-color: $white;
}

.attachments .attachments-list .attachment .link {
    border: none;
    display: inline-block;
    line-height: 44px;
    vertical-align: top;
    width: 100%;
}
</style>

<script>
export const Attachments = {
    name: "attachments",
    props: {
        title: {
            type: String,
            default: "Files"
        },
        attachments: {
            type: Array,
            default: () => []
        },
        width: {
            type: Number,
            default: null
        },
        height: {
            type: Number,
            default: null
        }
    },
    data: function() {
        return {};
    },
    computed: {
        attachmentsStyle() {
            const base = {};
            if (this.width) base.width = `${this.width}px`;
            return base;
        },
        listStyle() {
            const base = {};
            if (this.height) base.height = `${this.height}px`;
            return base;
        }
    }
};
export default Attachments;
</script>
