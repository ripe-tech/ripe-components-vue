import { storiesOf } from "@storybook/vue";

storiesOf("Header", module).add("Platforme", () => ({
    data: function() {
        return {
            mockAccount: {
                email: "john_doe@platforme.com",
                avatar_url: "http://i.pravatar.cc",
                meta: {
                    name: "John Doe",
                    company: "Platforme",
                    position: "Software Engineer"
                }
            }
        };
    },
    template: `
        <div>
            <overlay-platforme></overlay-platforme>
            <side-platforme></side-platforme>
            <header-platforme v-bind:platforme-account="mockAccount"></header-platforme>
        </div>`
}));
