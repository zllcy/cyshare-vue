<template>
  <div>
    <el-input
            placeholder="请输入用户名"
            style="width: 44%"
            v-model="input"
            prefix-icon="el-icon-search" @keyup.enter.native="search()">
      <el-button type="primary" @click="search()" slot="suffix" size="small" style="margin-top: 3px">搜索</el-button>
    </el-input>
    <el-table
        :data="userList"
        border
        style="width: 100%; margin-top: 10px"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}">
      <el-table-column
          fixed
          prop="id"
          label="用户ID"
          width="200">
      </el-table-column>
      <el-table-column
          prop="username"
          label="用户名"
          width="200">
      </el-table-column>
      <el-table-column
          prop="password"
          label="密码"
          width="400">
      </el-table-column>
      <el-table-column
          prop="type"
          label="用户类型"
          width="200">
      </el-table-column>
      <el-table-column
          label="操作"
          width="260">
        <template slot-scope="scope">
          <el-button @click="dialogFormVisible = true, edit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="dialogVisible = true, del(scope.row)">删除</el-button>
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

    <el-dialog title="更新用户" :visible.sync="dialogFormVisible" center>
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="用户ID" :label-width="formLabelWidth">
          <el-input v-model.number="form.id" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" prop="password">
          <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户类型" prop="type" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择用户类型">
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="注册用户" value="注册用户"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update('form'), dialogFormVisible = false">修改</el-button>
      </div>
    </el-dialog>

    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        v-model="deleteId">
      <span>确定要删除吗</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteUser(), dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>


  </div>
</template>

<script>
export default {
  name: "UserList",
  methods: {
    page(currentPage) {
      const _this = this;
      this.currentPage = currentPage;
      if (this.input == '') {
        this.$axios.get('http://localhost:8888/user/listUser/' + currentPage).then(function (resp) {
          // console.log(resp);
          _this.userList = resp.data.data.list;
          _this.total = resp.data.data.total;
        })
      }else {
        this.$axios.get('http://localhost:8888/user/searchUserByName/' + this.input).then(function (resp) {
          _this.userList = [resp.data.data];
          _this.total = resp.data.data.total;
        })
      }
    },
    edit(row) {
      this.form.id = row.id;
      this.form.username = row.username;
      this.form.type = row.type;
    },
    update(formName) {
      const _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.put('http://localhost:8888/user/updateUser', this.form).then(function (resp) {
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
    deleteUser() {
      const _this = this;
      this.$axios.delete('http://localhost:8888/user/deleteUser/' + this.deleteId + '').then(function (resp) {
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
    search() {
      const _this = this;
      this.$axios.get('http://localhost:8888/user/searchUserByName/' + this.input).then(function (resp) {
        _this.userList = [resp.data.data];
        _this.total = 1;
      })
    }
  },
  created() {
    const _this = this;
    this.$axios.get('http://localhost:8888/user/listUser/1').then(function (resp) {

      _this.userList = resp.data.data.list;
      _this.total = resp.data.data.total;
    })
  },

  data() {
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      total: null,
      userList: null,
      dialogFormVisible: false,
      dialogVisible: false,
      form: {
        id: '',
        username: '',
        password: '',
        checkPass: '',
        type: ''
      },
      formLabelWidth: '120px',
      rules: {
        password: [
          {required: true, validator: validatePassword, trigger: 'blur'},
          {min: 6, max: 10, message: '密码长度在 6 到 10 个字符', trigger: 'blur'}
        ],
        checkPass: [
          {required: true, validator: validatePass2, trigger: 'blur'},
        ],
        type: [
          {required: true},
        ]
      },
      deleteId: null,
      input: '',
      currentPage: 1,
    }
  }
}
</script>

<style scoped>

</style>