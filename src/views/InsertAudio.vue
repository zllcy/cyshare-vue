<template>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" style="text-align: left">
        <el-form-item label="用户名" prop="username" style="width: 25%">
            <el-input v-model="ruleForm.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="歌曲名" prop="song" style="width: 25%">
            <el-input v-model="ruleForm.song" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="歌手" prop="singer" style="width: 25%">
            <el-select v-model="ruleForm.singer" placeholder="请选择或输入歌手" allow-create filterable>
                <div v-for="(o, index) in singerTotal" :key="o" v-model="singerList">
                    <el-option :label="singerList[index].name" :value="singerList[index].name"></el-option>
                </div>
            </el-select>
        </el-form-item>
        <el-form-item label="风格" prop="style">
            <el-select v-model="ruleForm.style" placeholder="请选择音乐风格">
                <el-option label="流行" value="流行"></el-option>
                <el-option label="民谣" value="民谣"></el-option>
                <el-option label="摇滚" value="摇滚"></el-option>
                <el-option label="R&B" value="R&B"></el-option>
                <el-option label="古风" value="古风"></el-option>
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
            <el-input type="textarea" :rows="10" v-model="ruleForm.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上传音频" prop="audio" style="width: 40%">
            <el-upload
                    ref="upload"
                    drag
                    action="http://localhost:8888/audio/insertAudio"
                    multiple
                    :limit="1"
                    show-file-list
                    :auto-upload="false"
                    :data="ruleForm"
                    :on-success="handleSuccess">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">音频不能超过3000MB</div>
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
        name: "InsertAudio",
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
                    song: '',
                    singer: '',
                    style: '',
                    language: '',
                    year: '',
                    description: '',
                },
                rules: {
                    username: [
                        {required: true, validator: checkUsername, trigger: 'blur'},
                        {min: 2, max: 8, message: '用户名长度在 2 到 8 个字符', trigger: 'blur'}
                    ],
                    song: [
                        {required: true}
                    ],
                    singer: [
                        {required: true}
                    ],
                    style: [
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
                    audio: [
                        {required: true}
                    ]
                },
                singerList: null,
                singerTotal: '',
            };
        },
        methods: {
            submitForm() {
                this.$refs.upload.submit();
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleSuccess(resp) {
                // console.log(resp)
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
            this.$axios.get('http://localhost:8888/audio/listSinger').then(function (resp) {
                // console.log(resp)
                _this.singerList = resp.data.data;
                _this.singerTotal = resp.data.data.length;
            })
        }
    }
</script>

<style scoped>

</style>