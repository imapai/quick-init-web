<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <!-- <img src="../assets/wph.png" alt="" id="logo-img" /> -->
        <span>管理后台系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px':'200px'">
        <div class="toggle-button" @click="closeMenu">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF"
        unique-opened :collapse="isCollapse" :collapse-transition=false :router=true :default-active="activePath">
          <!-- 一级菜单 -->
          <el-menu-item :index="item.path + '' " v-for="item in menuList" :key="item.menuId"
          @click="saveNavState('/' + item.path)">
            <!-- 一级菜单模板区域 -->
            <template #title>
              <!-- 图标 -->
              <i :class="iconsObj[item.menuId]"></i>
              <!-- 文本 -->
              <span>{{item.title}}</span>
            </template>
            <!-- 二级菜单 -->
            <!-- <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.menuId"
            @click="saveNavState('/' + subItem.path)">
              <template #title>
                <i class="el-icon-menu"></i>
                <span>{{subItem.name}}</span>
              </template>
            </el-menu-item> -->
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      // 左侧菜单
      menuList: [],
      iconsObj: {
        125: 'el-icon-user-solid',
        103: 'el-icon-s-check',
        101: 'el-icon-s-shop',
        102: 'el-icon-s-goods',
        145: 'el-icon-s-data'
      },
      isCollapse: false,
      activePath: ''
    }
  },
  created () {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    },
    // 获取所有菜单
    async getMenuList () {
      const { data: res } = await this.axios.get('menus')
      if (res.code !== 0) {
        return this.$message.error(res.meta.msg)
      }
      this.menuList = res.data
      console.log(res)
    },
    // 折叠左侧菜单
    closeMenu () {
      this.isCollapse = !this.isCollapse
    },
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style scoped>
.home-container {
  height: 100%;
}
#logo-img {
  height: 55px;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;

}
.el-header > div {
    display: flex;
    align-items: center;
}

.el-header > div span {
    margin-left: 15px;
}
.el-aside {
  background-color: #333744;
}
.el-aside .el-menu {
    border-right: none;
}
.el-main {
  background-color: #eaedf1;
}
.toggle-button {
  background-color: #a6a9ad;
  font-size: 16px;
  line-height: 24px;
  color: #373d41;
  text-align: center;
  letter-spacing: 0.2em;
}
</style>