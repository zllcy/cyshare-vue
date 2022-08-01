<template>
  <div>
    <el-container style="height: 2000px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '2']" router>
          <el-submenu index="1">
            <template slot="title"> <i class="el-icon-video-camera-solid"></i>视频管理</template>
            <el-menu-item-group>
              <el-menu-item index="/personalManage/personalVideoList">视频信息</el-menu-item>
              <el-menu-item index="/personalManage/insertVideo">添加视频</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"> <i class="el-icon-headset"></i>音频管理</template>
            <el-menu-item-group>
              <el-menu-item index="/personalManage/personalAudioList">音频信息</el-menu-item>
              <el-menu-item index="/personalManage/insertAudio">添加音频</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 33px; font-family: 宋体">
          <div style="margin-top: 10px;">
            上传中心
            <el-link round plain @click="enterIndex()" style="margin-left: 500px; background: transparent">返回主站</el-link>
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
  name: "PersonalManage",
  data() {
    return{
      username: ''
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
  background-color: powderblue;
  color: #333;
}

.el-aside {
  color: #333;
}
</style>