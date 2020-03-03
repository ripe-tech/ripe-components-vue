<template>
    <div class="oauth-part">
        <div class="oauth-container">
            <loader loader="ball-scale-multiple" class="loader-header" />
            <h2>{{ text }}</h2>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";
@import "css/animations.scss";

.oauth-part {
    align-items: center;
    display: flex;
    justify-content: center;
    min-height: 100vh;
}

.oauth-container {
    animation: fade-in 0.35s cubic-bezier(0.645, 0.045, 0.355, 1);
    margin: 0px auto 0px auto;
    text-align: center;
}

.ball-scale-multiple {
    display: inline-block;
    margin-bottom: 32px;
}
</style>

<script>
import { oauthMixin } from "../../../../mixins";

export const OAuthPart = {
    name: "oauth-part",
    mixins: [oauthMixin],
    props: {
        text: {
            type: String,
            default: "Redirecting from Platforme ID ..."
        },
        next: {
            type: String,
            default: null
        }
    },
    created: function() {
        this.oauth(this.next);
    }
};

export default OAuthPart;
</script>
