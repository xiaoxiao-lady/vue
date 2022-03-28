var apiURL = "https://api.github.com/repos/vuejs/vue/commits?per_page=3&sha=";

/**
 * Actual demo
 */

var demo = new Vue({
  el: "#demo",

  data: {
    value: "业务",
  },

  created: function () {},

  watch: {
    value(){
       console.log('变化了')
    }
  },
  computed: {

  },

  filters: {

  },

  methods: {
    change(){
      this.value="新业务"
    },

  },
});
