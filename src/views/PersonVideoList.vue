<template>
  <div>

<!--    <el-input-->
<!--            placeholder="请输入关键字"-->
<!--            style="width: 44%"-->
<!--            v-model="input"-->
<!--            prefix-icon="el-icon-search" @keyup.enter.native="search()">-->
<!--      <el-button type="primary" @click="search()" slot="suffix" size="small" style="margin-top: 3px">搜索</el-button>-->
<!--    </el-input>-->
    <el-table
        :data="videoList"
        border
        style="width: 100%; margin-top: 10px"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}">
      <el-table-column
          fixed
          prop="id"
          label="视频ID"
          width="80">
      </el-table-column>
      <el-table-column
          prop="username"
          label="所属用户"
          width="80">
      </el-table-column>
      <el-table-column
          prop="filename"
          label="文件名"
          width="160">
      </el-table-column>
      <el-table-column
          prop="title"
          label="标题"
          width="100">
      </el-table-column>
      <el-table-column
          prop="category"
          label="分类"
          width="80">
      </el-table-column>
      <el-table-column
          prop="label"
          label="标签"
          width="80">
      </el-table-column>
      <el-table-column
          prop="language"
          label="语言"
          width="80">
      </el-table-column>
      <el-table-column
          prop="year"
          label="年份"
          width="80">
      </el-table-column>
      <el-table-column
          prop="description"
          label="描述信息"
          width="240">
      </el-table-column>
      <el-table-column
          prop="cover"
          label="封面"
          width="176">
        <template slot-scope="scope">
          <el-image :src="require('D:/CyShareDB/Cover/'+scope.row.cover)"></el-image>
        </template>
      </el-table-column>
      <el-table-column
          label="操作"
          width="120">
        <template slot-scope="scope">
          <el-button @click="play(scope.row), videoDialogFormVisible = true" type="text" size="small">播放</el-button>
          <el-button @click="edit(scope.row), editDialogFormVisible = true" type="text" size="small">编辑</el-button>
          <el-button @click="del(scope.row), dialogVisible = true" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        background
        layout="prev, pager, next"
        page-size="5"
        :total="total"
        @current-change="page"
        style="margin-top: 10px">
    </el-pagination>
    <el-dialog :title="videoTitle" :visible.sync="videoDialogFormVisible" center @close="closeVideo()">
      <video controls autoplay :src="videoUrl" width="100%"/>
    </el-dialog>
    <el-dialog :title="'修改视频'" :visible.sync="editDialogFormVisible" center>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" style="text-align: left">
        <el-form-item label="视频ID" prop="id" >
          <el-input v-model.number="ruleForm.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="所属用户" prop="username" >
          <el-input v-model="ruleForm.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="文件名" prop="filename" >
          <el-input v-model="ruleForm.filename" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="category">
          <el-select v-model="ruleForm.category" placeholder="请选择视频类型">
            <el-option label="电视剧" value="电视剧"></el-option>
            <el-option label="电影" value="电影"></el-option>
            <el-option label="综艺" value="综艺"></el-option>
            <el-option label="动漫" value="动漫"></el-option>
            <el-option label="asmr" value="asmr"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签" prop="label" >
          <el-input v-model="ruleForm.label" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="语言" prop="language">
          <el-select v-model="ruleForm.language" placeholder="请选择视频语言">
            <el-option label="普通话" value="普通话"></el-option>
            <el-option label="粤语" value="粤语"></el-option>
            <el-option label="英语" value="英语"></el-option>
            <el-option label="韩语" value="韩语"></el-option>
            <el-option label="日语" value="日语"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年份" prop="year" >
          <el-input v-model="ruleForm.year" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述信息" prop="description" >
          <el-input type="textarea" :rows="3" v-model="ruleForm.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="封面" prop="cover" >
          <el-input v-model="ruleForm.cover" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"cover @click="update('ruleForm', editDialogFormVisible = false)">修改</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        v-model="deleteId">
      <span>确定要删除吗</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteVideo(), dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "PersonalVideoList",
  data() {
    return{
      videoList: null,
      total: null,
      videoUrl: '',
      videoDialogFormVisible: false,
      editDialogFormVisible: false,
      dialogVisible: false,
      deleteId: '',
      input: '',
      select: '',
      videoTitle: '',
      ruleForm: {
        id: '',
        username: '',
        filename: '',
        title: '',
        category: '',
        label: '',
        language: '',
        year: '',
        description: '',
        cover: '',
      },
      rules: {
        title: [
          {required: true}
        ],
        category: [
          {required: true}
        ],
        label: [
          {required: true}
        ],
        language: [
          {required: true}
        ],
        year: [
          {required: true}
        ],
        description: [
          {required: true}
        ],
      },
      currentPage: 1,
    }
  },
  methods: {
    page(currentPage) {
      const _this = this;
      this.currentPage = currentPage;
      if (this.input == '') {
        this.$axios.get('http://localhost:8888/video/listVideo/' + currentPage).then(function (resp) {
          // console.log(resp)
          _this.videoList = resp.data.data.list;
          _this.total = resp.data.data.total;
        })
      } else {
        let keyWords = 'title:' + this.input + 'OR category:' + this.input + 'OR label:' + this.input + 'OR language:' + this.input +
            'OR year:' + this.input + 'OR description:' + this.input
        this.$axios.get('http://localhost:8888/video/searchVideo/' + keyWords + '/' + currentPage).then(function (resp) {
          // console.log(resp)
          _this.videoList = resp.data.data.list;
          _this.total = resp.data.data.total;
        })
      }
    },
    play(row) {
      this.videoUrl = 'http://localhost:8888/video/play/' + row.filename;
      this.videoTitle = row.title;
    },
    closeVideo() {
      this.videoUrl = ''
    },
    edit(row) {
      this.ruleForm.id = row.id;
      this.ruleForm.username = row.username;
      this.ruleForm.filename = row.filename;
      this.ruleForm.title = row.title;
      this.ruleForm.category = row.category;
      this.ruleForm.label = row.label;
      this.ruleForm.language = row.language;
      this.ruleForm.year = row.year;
      this.ruleForm.description = row.description;
      this.ruleForm.cover = row.cover;
    },
    update(formName) {
      const _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.put('http://localhost:8888/video/updateVideo', this.ruleForm).then(function (resp) {
            if (resp.data.code == 200) {
              _this.$message({
                message: '修改成功',
                type: 'success'
              });
            } else {
              _this.$message.error(resp.data.msg);
            }
            _this.page(_this.currentPage);
          });
        }
      })
    },
    del(row) {
      this.deleteId = row.id;
    },
    deleteVideo() {
      const _this = this;
      this.$axios.delete('http://localhost:8888/video/deleteVideo/' + this.deleteId + '').then(function (resp) {

        if (resp.data.code == 200) {
          _this.$message({
            message: '删除成功',
            type: 'success'
          });
        } else {
          _this.$message.error(resp.data.msg);
        }
        _this.page(_this.currentPage);
        _this.dialogVisible = false;
      })
    },
    // search() {
    //   const _this = this;
    //   let keyWords = 'title:' + this.input + 'OR category:' + this.input + 'OR label:' + this.input + 'OR language:' + this.input +
    //       'OR year:' + this.input + 'OR description:' + this.input
    //   this.$axios.get('http://localhost:8888/video/searchVideo/' + keyWords + '/1').then(function (resp) {
    //     // console.log(resp)
    //     _this.videoList = resp.data.data.list;
    //     _this.total = resp.data.data.total;
    //   })
    // },
  },
  created() {
    const _this = this;
    let username = JSON.parse(sessionStorage.getItem("username"));
    // console.log(username)
    this.$axios.get('http://localhost:8888/video/listVideoByUsername/' +username+ '/1').then(function (resp) {
      _this.videoList = resp.data.data.list;
      _this.total = resp.data.data.total;
    })
  },
}
</script>

<style scoped>

</style>