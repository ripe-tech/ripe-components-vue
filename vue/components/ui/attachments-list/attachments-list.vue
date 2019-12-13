<template>
    <div class="attachments" v-bind:style="attachmentsStyle">
        <div class="attachments-title">{{ title }}</div>
        <div class="attachments-list" v-bind:style="listStyle">
            <div class="attachment" v-for="attachment in attachments" v-bind:key="attachment.name" >
                <link-ripe
                    v-bind:text="attachment.name"
                    v-bind:href="attachment.path"
                    v-bind:disabled="false"
                    v-bind:size="'small'"
                    v-bind:color="'black'"
                    v-bind:target="'_blank'"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.attachments {
    background-color: $grey-6;
    border: solid 1px #e4e8f0;
    font-size: 0px;
}

.attachments .attachments-title {
    background-color: $white;
    border: solid 1px #e4e8f0;
    height: 42px;
    color: $light-black;
    display: block;
    font-weight: bold;
    letter-spacing: 0.7px;
    line-height: 42px;
    padding: 0px 20px 0px 20px;
    font-size: 16px;
}

.attachments .attachments-list {
    overflow: auto;
}

.attachments .attachments-list .attachment {
    background-repeat: no-repeat;
    border: solid 1px #e4e8f0;
    cursor: pointer;
    height: 44px;
    background-image: url("~./../../../assets/icons/black/file.svg");
    background-size: 20px 20px;
    background-position: center left 10px;
    padding-left: 40px;
}

.attachments .attachments-list .attachment:active {
    background-color: $lighter-grey;
}

.attachments .attachments-list .attachment .link {
    line-height: 44px;
    vertical-align: top;
}

.attachments .attachments-list .attachment:hover .link {
    border-color: #1d2631;
}
</style>

<script>
export const AttachmentsList = {
    name: "attachments-list",
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
    },
    methods: {
        onClick(attachment) {
            window.location = attachment.path;
        }
    }
};
export default AttachmentsList;
</script>
