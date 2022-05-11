var apiURL = "https://api.github.com/repos/vuejs/vue/commits?per_page=3&sha=";

/**
 * Actual demo
 */

var demo = new Vue({
  el: "#demo",

  data: {
    list:[1,2,3,4]
  },

  created: function () {

  },
  mounted(){
     this.list.push(5)
  },
  watch: {},
  computed: {

  },

  methods: {

  },
});
