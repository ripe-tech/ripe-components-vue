<template>
<div class="log-entry">
    {{entry}}
</div>
  
</template>

<style>
.log-entry {
    padding: 2px;
}

</style>

<script>
import Vue from "vue";

export const logentry = Vue.component("log-entry-platforme", {
    props:{
        entry: {
            type: String,
            required: true
        }
    }
});

export default logentry;
</script>
