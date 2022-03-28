var apiURL = "https://api.github.com/repos/vuejs/vue/commits?per_page=3&sha=";

/**
 * Actual demo
 */

var demo = new Vue({
  el: "#demo",

  data: {
    firstName: "王",
    lastName: "金玉",
  },

  created: function () {},

  watch: {},
  computed: {
    name() {
      return this.firstName + "" + this.lastName;
    },
  },

  filters: {
    formatDate: function (v) {
      return "wangxiaoyu";
    },
  },

  methods: {
    changeLastName(){
      this.lastName='云飞'
    },
    changeFirstName(){
      this.firstName = "李"
    }
  },
});
