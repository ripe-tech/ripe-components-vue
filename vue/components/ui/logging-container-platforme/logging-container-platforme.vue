<template>
  <div class="logging-container">

      <div
        v-for="entry in entries"
        v-bind:key= entry.mesage>
        <log-entry
            v-bind:entry = entry.entry>
        </log-entry>
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

</style>

<script>
import Vue from "vue";

export const logcontainer = Vue.component("logging-container-platforme", {
    data(){
        return{
            entries:[
                { entry: "5:26:53 PM: WARNING in ./vue/components/logging/log.vue?vue&type=script&lang=js& 1:195-198"},
                { entry: "5:26:53 PM: WARNING in ./vue/components/logging/log.vue?vue&type=script&lang=js& 1:195-198"},
                { entry: "5:26:53 PM: WARNING in ./vue/components/logging/log.vue?vue&type=script&lang=js& 1:195-198"},
            ]
        }
    }
});

export default logcontainer;
</script>