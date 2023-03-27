<template>
  <div>
    <p>{{ "params参数为-----" + $route.params.searchWord }}</p>
    <p>{{ "query参数为-----" + $route.query.searchWord }}</p>
  </div>
</template>
<script>
export default {
  name: "IndexSearch",
  data() {
    return {};
  },
  props: ["searchWord", "keyword"],
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>
