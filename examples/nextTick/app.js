import { nextTick } from "process";

var apiURL = "https://api.github.com/repos/vuejs/vue/commits?per_page=3&sha=";

/**
 * Actual demo
 */

var demo = new Vue({
  el: "#demo",
  data: {
    num: 0,
  },
  created: function () {

  },
  watch: {},
});
