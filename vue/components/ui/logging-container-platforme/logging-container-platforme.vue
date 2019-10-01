<template>
    <div class="logging-container">
        <div v-for="entry in entries" v-bind:key="entry.index">
            <div class="log-entry">
                {{ entry }}
            </div>
        </div>
    </div>
</template>

<style>
.logging-container {
    background-color: #0d1d24;
    color: #ffffff;
    font-family: "Lucida Console", Monaco, monospace;
    font-size: 15px;
    height: 190px;
    overflow: auto;
    padding: 5px;
    text-align: left;
    width: 100%;
}

.log-entry {
    padding: 2px;
}
</style>

<script>
import Vue from "vue";

export const LoggingContainer = Vue.component("logging-container-platforme", {
    props: {
        entries: []
    }
});

export default LoggingContainer;
</script>
