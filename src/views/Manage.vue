<template>
  <div>
    <el-container style="height: 2000px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '2', '3']" router>
          <el-menu-item index="/manage/introduction">
            <template slot="title"> <i class="el-icon-info"></i>系统简介</template>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title"> <i class="el-icon-user-solid"></i>用户管理</template>
            <el-menu-item-group>
              <el-menu-item index="/manage/userList">用户信息</el-menu-item>
              <el-menu-item index="/manage/insertUser">添加用户</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"> <i class="el-icon-video-camera-solid"></i>视频管理</template>
            <el-menu-item-group>
              <el-menu-item index="/manage/videoList">视频信息</el-menu-item>
              <el-menu-item index="/manage/insertVideo">添加视频</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"> <i class="el-icon-headset"></i>音频管理</template>
            <el-menu-item-group>
              <el-menu-item index="/manage/audioList">音频信息</el-menu-item>
              <el-menu-item index="/manage/insertAudio">添加音频</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 33px; font-family: 宋体">
          <div style="margin-top: 10px;">
            CyShare 后台管理系统
            <el-link round plain @click="enterIndex()" style="margin-left: 400px; background: transparent">进入前台</el-link>
          </div>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  name: "Manage",
  data() {
    return{
      username: '',
    }
  },
  methods: {
    enterIndex() {
      this.$router.push('/');
    }
  },
  created() {
    this.username = JSON.parse(sessionStorage.getItem("username"));
  }
}
</script>

<style scoped>
.el-header {
  background-color: cadetblue;
}

.el-aside {
  color: #333;
}

</style>