import { storiesOf } from "@storybook/vue";

storiesOf("Header", module).add("Platforme", () => ({
    data: function() {
        return {
            mockLinks: [
                { id: "enabled", text: "Enabled" },
                { id: "selected", text: "Selected", selected: true },
                { id: "separator" },
                { id: "disabled", text: "Disabled", disabled: true }
            ],
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
            <overlay-platforme v-bind:visible='true' v-bind:global='true'></overlay-platforme>
            <side-platforme v-bind:links="mockLinks"></side-platforme>
            <header-platforme v-bind:platforme-account="mockAccount"></header-platforme>
        </div>`
}));
