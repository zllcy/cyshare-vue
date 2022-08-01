<template>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" style="text-align: left">
        <el-form-item label="用户名" prop="username" style="width: 25%">
            <el-input v-model="ruleForm.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title" style="width: 25%">
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
        <el-form-item label="标签" prop="label">
            <el-select v-model="ruleForm.label" placeholder="请选择或输入标签" allow-create filterable>
                <div v-for="(o, index) in labelTotal" :key="o" v-model="labelList">
                    <el-option :label="labelList[index].name" :value="labelList[index].name"></el-option>
                </div>
            </el-select>
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
        <el-form-item label="年份" prop="year" style="width: 25%">
            <el-input v-model="ruleForm.year" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述信息" prop="description" style="width: 30%">
            <el-input type="textarea" :rows="3" v-model="ruleForm.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上传视频" prop="video" style="width: 40%">
            <el-upload
                    ref="upload"
                    drag
                    action="http://localhost:8888/video/insertVideo"
                    multiple
                    :limit="1"
                    show-file-list
                    :auto-upload="false"
                    :data="ruleForm"
                    :on-success="handleSuccess">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">视频不能超过3000MB</div>
            </el-upload>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "InsertVideo",
        data() {
            var checkUsername = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('用户名不能为空'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    username: '',
                    title: '',
                    category: '',
                    label: '',
                    language: '',
                    year: '',
                    description: '',
                },
                rules: {
                    username: [
                        {required: true, validator: checkUsername, trigger: 'blur'},
                        {min: 2, max: 8, message: '用户名长度在 2 到 8 个字符', trigger: 'blur'}
                    ],
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
                    video: [
                        {required: true}
                    ]
                },
                labelList: null,
                labelTotal: '',

            };
        },
        methods: {
            submitForm() {
                this.$refs.upload.submit();
                this.$notify({
                    message: '等待一段时间上传视频和制作封面',
                    type: 'warning',
                    showClose: false,
                    duration: 0
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleSuccess(resp) {
                // console.log(resp)
                this.$notify.closeAll();
                if (resp.code == 200) {
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                } else {
                    this.$message.error(resp.data.msg);
                }
                this.$router.push('/');
            }
        },
        created() {
            this.ruleForm.username = JSON.parse(window.sessionStorage.getItem('username'))
            const _this = this;
            this.$axios.get('http://localhost:8888/video/listLabel').then(function (resp) {
                // console.log(resp)
                _this.labelList = resp.data.data;
                _this.labelTotal = resp.data.data.length;
            })
        }
    }
</script>

<style scoped>

</style>