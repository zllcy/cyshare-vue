<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" style="text-align: left">
    <el-form-item label="用户名" prop="username" style="width: 25%">
      <el-input v-model="ruleForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password" style="width: 25%">
      <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass" style="width: 25%">
      <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="用户类型" prop="type">
      <el-select v-model="ruleForm.type" placeholder="请选择用户类型" >
        <el-option label="管理员" value="管理员"></el-option>
        <el-option label="注册用户" value="注册用户"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item >
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "InsertUser",
  data() {
    var checkUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户名不能为空'));
      }else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: '',
        checkPass: '',
        username: '',
        type: ''
      },
      rules: {
        password: [
          {required:true, validator: validatePassword, trigger: 'blur' },
          { min: 6, max: 10, message: '密码长度在 6 到 10 个字符', trigger: 'blur' }
        ],
        checkPass: [
          {required:true, validator: validatePass2, trigger: 'blur' },
        ],
        username: [
          {required:true, validator: checkUsername, trigger: 'blur' },
          { min: 2, max: 8, message: '用户名长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        type: [
          {required:true},
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      const _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.$axios.post('http://localhost:8888/user/register', this.ruleForm).then(function (resp){
            // console.log(resp)
            if (resp.data.code == 200) {
              _this.$message({
                message: '添加成功',
                type: 'success'
              });
            }else {
              _this.$message.error(resp.data.msg);
            }
            _this.$router.push('/manage/userList');
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>

</style>