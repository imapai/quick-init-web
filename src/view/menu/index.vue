<template>
  <div>11111111111111111111111</div>
</template>

<script>
import {menuPage} from "/src/api/menu"
export default {
  data() {
    return {
      menuList: [],
    };
  },
  created() {
    this.getMenuList();
  },
  methods: {
    getMenuList() {
      var query = {
        page: 1,
        pageSize: 10,
      }
      console.log(query)
      const data = menuPage(query)
      console.log(data)
    },
  },
};
</script>