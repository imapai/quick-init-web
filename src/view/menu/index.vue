<template>
  <el-button
    type="primary"
    icon="el-icon-edit"
    @click="
      additionDialog = true;
      menu = {};
    "
    style="float: left"
    >新增</el-button
  >
  <el-table :data="menuList" border style="width: 100%">
    <el-table-column prop="title" label="标题" width="180" />
    <el-table-column prop="icon" label="图标" width="180" />
    <el-table-column prop="name" label="组件名称" />
    <el-table-column prop="path" label="路径" width="180" />
    <el-table-column prop="hidden" label="隐藏">
      <template #default="scope">
        <el-switch
          v-model="scope.row.hidden"
          @change="switchHidden(scope.row)"
        />
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button
          size="small"
          type="primary"
          @click="getMenu(scope.row)"
          >编辑</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="delMenu(scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    background
    layout="prev, pager, next"
    v-model:current-page="pagination.page"
    v-model:page-size="pagination.pageSize"
    :total="pagination.total"
    @current-change="pageMenuList()"
  >
  </el-pagination>
  <!-- 修改框 -->
  <el-dialog v-model="editDialog" title="修改菜单">
    <el-form :model="menu" label-width="120px">
      <el-form-item label="标题">
        <el-input v-model="menu.title"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-select v-model="menu.icon" placeholder="请选择需要修改的图标">
          <el-option label="home" value="el-icon-s-home" />
          <el-option label="user" value="el-icon-user-solid" />
          <el-option label="manage" value="el-icon-s-management" />
          <el-option label="menu" value="el-icon-menu" />
        </el-select>
      </el-form-item>
      <el-form-item label="组件名称">
        <el-input v-model="menu.name"></el-input>
      </el-form-item>
      <el-form-item label="路径">
        <el-input v-model="menu.path"></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="menu.sort"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editDialog = false">取消</el-button>
        <el-button
          type="primary"
          @click="
            editDialog = false;
            updateMenu(menu);
          "
          >修改</el-button
        >
      </span>
    </template>
  </el-dialog>
  <!-- 新增框 -->
  <el-dialog v-model="additionDialog" title="新增菜单">
    <el-form :model="menu" label-width="120px">
      <el-form-item label="标题">
        <el-input v-model="menu.title"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-select v-model="menu.icon" placeholder="请选择需要修改的图标">
          <el-option label="home" value="el-icon-s-home" />
          <el-option label="user" value="el-icon-user-solid" />
          <el-option label="manage" value="el-icon-s-management" />
          <el-option label="menu" value="el-icon-menu" />
        </el-select>
      </el-form-item>
      <el-form-item label="组件名称">
        <el-input v-model="menu.name"></el-input>
      </el-form-item>
      <el-form-item label="路径">
        <el-input v-model="menu.path"></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="menu.sort"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="additionDialog = false">取消</el-button>
        <el-button
          type="primary"
          @click="
            additionDialog = false;
            createMenu();
          "
          >添加</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {
  menuPage,
  getMenuById,
  createMenu,
  delMenu,
  updateMenu,
} from "/src/api/menu";

export default {
  data() {
    return {
      menu: {},
      menuList: [],
      pagination: {
        total: 100,
        page: 1,
        pageSize: 10,
      },
      editDialog: false,
      additionDialog: false,
    };
  },
  created() {
    this.pageMenuList();
  },
  methods: {
    popoverClose(index) {
      his.$refs['popover' + index].doClose();
    },
    pageMenuList() {
      menuPage(this.pagination).then((res) => {
        const { items, page, pageSize, total } = res.data.data;
        this.menuList = items;
        this.pagination.page = page;
        this.pagination.pageSize = pageSize;
        this.pagination.total = total;
      });
    },
    getMenu(row) {
      this.editDialog = true;
      this.menu = row
    },
    delMenu(row) {
      delMenu(row.menuId).then((res) => {
        this.pageMenuList();
        this.$message.success("删除成功");
      });
    },
    createMenu() {
      createMenu(this.menu).then((res) => {
        this.pageMenuList();
        this.$notify({
          title: "成功",
          message: "新增成功",
          type: "success",
          duration: 3000,
        });
      });
    },
    updateMenu(menu) {
      updateMenu(menu).then((res) => {
        this.pageMenuList();
        this.$notify({
          title: "成功",
          message: "修改成功",
          type: "success",
          duration: 3000,
        });
      });
    },
    switchHidden(menu) {
      updateMenu(menu).then((res) => {
        this.pageMenuList();
        this.$notify({
          title: "成功",
          message: "操作成功",
          type: "success",
          duration: 3000,
        });
      });
    },
  },
};
</script>

<style scoped>
.el-select {
  float: left;
}
</style>