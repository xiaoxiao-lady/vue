var apiURL = "https://api.github.com/repos/vuejs/vue/commits?per_page=3&sha=";
/**
 * Actual demo
 */

var demo = new Vue({
  el: "#demo",
  data: {
    name: "haha",
    list: [1, 3, 4],
  },

  created: function () {},

  watch: {},
  computed: {
    filterList() {
      return this.list.filter((ele) => ele > 1);
    },
  },

  filters: {},

  methods: {},
});
