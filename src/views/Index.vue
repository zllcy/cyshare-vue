<template>
    <div>
        <el-container>
            <el-header class="header" :style="{'background-image': 'url('+ backgroundImg + ')'}" height="135px">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-button type="text" icon="el-icon-s-home" @click="index()" size="small"
                                   style="background: transparent; margin-top: 10px; margin-left: 20px">
                            首页
                        </el-button>
                        <i style="font-size: 33px; margin-left: 10px; font-family: 黑体; margin-top: 10px; background: transparent">
                            CyShare
                        </i>
                    </el-col>
                    <el-col :span="7">
                        <el-input placeholder="请输入关键字" v-model="input" class="input-with-select"
                                  style="width: 100%; margin-top: 10px"
                                  clearable @keyup.enter.native="searchVideoAndAudio()">
                            <el-button slot="append" icon="el-icon-search" @click="searchVideoAndAudio()"
                                       style="background: transparent"></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="6" style="text-align: left; margin-left: 20px; margin-top: 10px">
                        <el-popover trigger="hover" :disabled="!isLogin">
                            <div style="font-family: 黑体">
                                登录后你可以：
                            </div>
                            <div style="margin-top: 10px">
                                <div class="el-icon-upload">
                                    上传音视频
                                </div>
                                <div class="el-icon-download" style="margin-left: 20px">
                                    下载音视频
                                </div>
                            </div>
                            <div style="margin-top: 10px">
                                <div class="el-icon-s-check">
                                    管理员账号可进入后台
                                </div>
                            </div>
                            <div style="margin-top: 10px">
                                <el-button type="primary" @click="loginDialogFormVisible = true" style="width: 100%">
                                    立即登录
                                </el-button>
                            </div>
                            <div style="margin-left: 30px">
                                首次使用？
                                <el-button type="text"
                                           @click="registerDialogFormVisible = true">
                                    点我注册
                                </el-button>
                            </div>
                            <el-button type="primary" circle plain @click="loginDialogFormVisible = true"
                                       slot="reference" style="background: transparent">
                                {{ username }}
                            </el-button>
                        </el-popover>
                        <el-link type="info" icon="el-icon-user-solid" :disabled="isLogin"
                                 @click="userDialogFormVisible = true, editUser(username)"
                                 style="margin-left: 20px; margin-top: 5px; background: transparent">
                            个人信息
                        </el-link>
                        <el-link type="info" icon="el-icon-upload" :disabled="isLogin"
                                 @click="enterFileManage()" style="margin-left: 20px; margin-top: 5px">上传中心
                        </el-link>

                        <el-link type="danger" icon="el-icon-switch-button" @click="logout()"
                                 :disabled="isLogin" style="margin-left: 20px; margin-top: 5px">退出登录
                        </el-link>

                    </el-col>
                    <el-col :span="2" style="margin-left: 30px; margin-top: 10px">
                        <el-button type="primary" round plain v-show="!isManager" @click="enterManage()"
                                   style="background: transparent">进入后台
                        </el-button>
                    </el-col>
                </el-row>

            </el-header>
            <el-main>
                <el-header height="200px" style="margin-top: -10px">
                    <h1 class="el-icon-video-camera-solid">选视频</h1>
                    <h3 v-model="videoKeyWords" style="margin-top: 0px">
                        <el-button type="primary" @click="searchAllVideo()" size="small">全部分类</el-button>
                        <el-button size="mini" target="_blank" @click="searchVideo('category:电视剧')"
                                   style="margin-left: 10px">电视剧
                        </el-button>
                        <el-button size="mini" target="_blank" @click="searchVideo('category:电影')"
                                   style="margin-left: 10px">电影
                        </el-button>
                        <el-button size="mini" target="_blank" @click="searchVideo('category:综艺')"
                                   style="margin-left: 10px">综艺
                        </el-button>
                        <el-button size="mini" target="_blank" @click="searchVideo('category:动漫')"
                                   style="margin-left: 10px">动漫
                        </el-button>
                        <el-button size="mini" target="_blank" @click="searchVideo('category:asmr')"
                                   style="margin-left: 10px">asmr
                        </el-button>
                    </h3>
                    <h3>
                        <el-button type="primary" @click="searchAllVideo()" size="small">全部标签</el-button>
                        <i v-for="(o, index) in labelTotal" :key="o" v-model="labelList">
                            <el-button size="mini" target="_blank"
                                       @click="searchVideo('label:' + labelList[index].name)" style="margin-left: 10px">
                                {{labelList[index].name}}
                            </el-button>
                        </i>
                    </h3>
                    <h3>
                        <el-button type="primary" @click="searchAllVideo()" size="small">全部语言</el-button>
                        <el-button size="mini" target="_blank" @click="searchVideo('language:普通话')"
                                   style="margin-left: 10px">普通话
                        </el-button>
                        <el-button size="mini" target="_blank" @click="searchVideo('language:粤语')"
                                   style="margin-left: 10px">粤语
                        </el-button>
                        <el-button size="mini" target="_blank" @click="searchVideo('language:英语')"
                                   style="margin-left: 10px">英语
                        </el-button>
                        <el-button size="mini" target="_blank" @click="searchVideo('language:韩语')"
                                   style="margin-left: 10px">韩语
                        </el-button>
                        <el-button size="mini" target="_blank" @click="searchVideo('language:日语')"
                                   style="margin-left: 10px">日语
                        </el-button>
                    </h3>

                </el-header>
                <el-main>
                    <el-row>
                        <el-col :span="4" v-for="(o, index) in videoSize" :key="o" :offset="index > 0 ? 1 : 0"
                                v-model="videoList">
                            <el-popover
                                    placement="top-start"
                                    title="视频简介"
                                    width="220"
                                    trigger="hover">
                                <div style="white-space: pre-line">{{videoList[index].description}}</div>
                                <el-card :body-style="{ padding: '0px' }" slot="reference" shadow="hover">
                                    <img :src="require('D:/CyShareDB/Cover/'+videoList[index].cover)" class="image">
                                    <div style="padding: 14px;">
                                        <h3>{{ videoList[index].title }}</h3>
                                        <div class="bottom clearfix">
                                            <div>
                                                <label class="time">{{ videoList[index].category }}</label>&nbsp;
                                                <label class="time">{{ videoList[index].label }}</label>&nbsp;
                                                <label class="time">{{ videoList[index].language }}</label>
                                            </div>
                                            <div>
                                                <label class="time">{{ videoList[index].username }}</label>&nbsp;
                                                <time class="time">{{ videoList[index].year }}</time>
                                            </div>
                                            <el-button type="text" class="button"
                                                       @click="play(videoList[index]), videoDialogFormVisible = true">播放
                                            </el-button>
                                        </div>
                                    </div>
                                </el-card>
                            </el-popover>
                        </el-col>
                    </el-row>
                    <el-pagination
                            background
                            layout="prev, pager, next"
                            page-size="5"
                            :total="videoTotal"
                            @current-change="pageVideo"
                            style="text-align: center; margin-top: 10px">
                    </el-pagination>

                </el-main>

                <el-divider>世上再无张显宗，无人爱我岳绮罗</el-divider>

                <el-header height="200px" style="margin-top: -20px">
                    <h1 class="el-icon-headset">选音频</h1>
                    <h3 v-model="audioKeyWords" style="margin-top: 0px">
                        <el-button type="primary" @click="searchAllAudio()" size="small">全部风格</el-button>
                        <el-button size="mini" target="_blank" @click="searchAudio('style:流行')"
                                   style="margin-left: 20px">流行
                        </el-button>
                        <el-button size="mini" target="_blank" @click="searchAudio('style:民谣')"
                                   style="margin-left: 10px">民谣
                        </el-button>
                        <el-button size="mini" target="_blank" @click="searchAudio('style:摇滚')"
                                   style="margin-left: 10px">摇滚
                        </el-button>
                        <el-button size="mini" target="_blank" @click="searchAudio('style:R&B')"
                                   style="margin-left: 10px">R&B
                        </el-button>
                        <el-button size="mini" target="_blank" @click="searchAudio('style:古风')"
                                   style="margin-left: 10px">古风
                        </el-button>
                    </h3>
                    <h3>
                        <el-button type="primary" @click="searchAllAudio()" size="small">全部歌手</el-button>
                        <i v-for="(o, index) in 4" :key="o" v-model="singerList">
                            <el-button size="mini" target="_blank"
                                       @click="searchAudio('singer:' + singerList[index].name)"
                                       style="margin-left: 10px">
                                {{singerList[index].name}}
                            </el-button>
                        </i>

                        <el-dropdown>
                            <el-button size="mini" style="margin-left: 10px">
                                更多歌手<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="(singer, index) in singerList.slice(4, singerTotal)"
                                                  :key="singer"
                                                  v-model="singerList">
                                    <el-button type="text" style="color: #606266" size="mini" target="_blank"
                                               @click="searchAudio('singer:' + singerList[index].name)">
                                        {{singer.name}}
                                    </el-button>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </h3>
                    <h3>
                        <el-button type="primary" @click="searchAllAudio()" size="small">全部语言</el-button>
                        <el-button size="mini" target="_blank" @click="searchAudio('language:普通话')"
                                   style="margin-left: 10px">普通话
                        </el-button>
                        <el-button size="mini" target="_blank" @click="searchAudio('language:粤语')"
                                   style="margin-left: 10px">粤语
                        </el-button>
                        <el-button size="mini" target="_blank" @click="searchAudio('language:英语')"
                                   style="margin-left: 10px">英语
                        </el-button>
                        <el-button size="mini" target="_blank" @click="searchAudio('language:韩语')"
                                   style="margin-left: 10px">韩语
                        </el-button>
                        <el-button size="mini" target="_blank" @click="searchAudio('language:日语')"
                                   style="margin-left: 10px">日语
                        </el-button>
                    </h3>

                </el-header>
                <el-main>
                    <el-row>
                        <el-col :span="4.5" v-for="(o, index) in audioSize" :key="o"
                                v-model="audioList">
                            <el-popover
                                    placement="right"
                                    width="300"
                                    trigger="hover">
                                <div style="white-space: pre-line; text-align: center">{{audioList[index].description}}</div>
                                <el-card slot="reference" :style="{'margin-left': (index==0) ? '0px' : '23px'}"
                                         shadow="hover">
                                    <div>
                                        <h3>{{audioList[index].song}}</h3>
                                        <audio controls
                                               :src="'http://localhost:8888/audio/play/' + audioList[index].filename"
                                               width="100%"
                                               :controlsList="!isLogin ? '' : 'nodownload'"
                                               loop/>
                                    </div>
                                    <div>
                                        <label class="time">{{ audioList[index].singer }}</label>
                                        &nbsp;
                                        <label class="time">{{ audioList[index].style }}</label>
                                        &nbsp;
                                        <label class="time">{{ audioList[index].language }}</label>
                                    </div>
                                    <div>
                                        <label class="time">{{ audioList[index].username }}</label>
                                        &nbsp;
                                        <time class="time">{{ audioList[index].year }}</time>
                                    </div>
                                </el-card>
                            </el-popover>
                        </el-col>
                    </el-row>
                    <el-pagination
                            background
                            layout="prev, pager, next"
                            page-size="4"
                            :total="audioTotal"
                            @current-change="pageAudio"
                            style="text-align: center; margin-top: 10px">
                    </el-pagination>
                </el-main>


            </el-main>

            <el-dialog title="欢迎登录" :visible.sync="loginDialogFormVisible"
                       center width="40%">
                <div slot="title">
                    <div style="color: #409EFF; font-size: 22px; font-family: 宋体">欢迎登录</div>
                    <el-divider></el-divider>
                </div>
                <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" label-width="100px"
                         style="margin-top: -14px">
                    <el-form-item label="用户名" prop="username" style="margin-left: 60px">
                        <el-input v-model.number="loginForm.username" clearable
                                  style="width: 80%;" prefix-icon="el-icon-user"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password" style="margin-left: 60px">
                        <el-input type="password" v-model="loginForm.password" autocomplete="off" clearable
                                  style="width: 80%" prefix-icon="el-icon-lock"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" style="text-align: center; margin-top: -30px">
                    <el-button @click="registerDialogFormVisible = true"
                               style="background: transparent" type="primary" plain>没有账号？点击注册
                    </el-button>
                    <el-button type="primary" @click="login('loginForm'), loginDialogFormVisible = false"
                               style="background: transparent" plain>登录
                    </el-button>
                </div>
            </el-dialog>

            <el-dialog title="欢迎注册" :visible.sync="registerDialogFormVisible" center>
                <div slot="title">
                    <div style="color: #409EFF; font-size: 22px; font-family: 宋体">欢迎注册</div>
                    <el-divider></el-divider>
                </div>
                <el-form :model="registerForm" status-icon :rules="registerRules" ref="registerForm" label-width="100px"
                         style="text-align: left; margin-top: -14px">
                    <el-form-item label="用户名" prop="username" style="margin-left: 60px">
                        <el-input v-model.number="registerForm.username"
                                  style="width: 80%" prefix-icon="el-icon-user"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password" style="margin-left: 60px">
                        <el-input type="password" v-model="registerForm.password" autocomplete="off"
                                  style="width: 80%" prefix-icon="el-icon-lock"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass" style="margin-left: 60px">
                        <el-input type="password" v-model="registerForm.checkPass" autocomplete="off"
                                  style="width: 80%" prefix-icon="el-icon-lock"></el-input>
                    </el-form-item>
                    <el-form-item label="用户类型" prop="type" style="margin-left: 60px">
                        <el-input v-model="registerForm.type" :disabled="true" style="width: 80%"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align: center">
                        <el-button type="primary"
                                   @click="submitForm('registerForm', registerDialogFormVisible = false)"
                                   style="background: transparent" plain>注册
                        </el-button>
                        <el-button @click="resetForm('registerForm')" type="primary" plain
                                   style="margin-right: 100px;background: transparent">重置
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

            <el-dialog title="用户信息" :visible.sync="userDialogFormVisible" center width="40%">
                <el-form :model="userForm" :rules="userRules" ref="userForm" style="margin-top: -14px">
                    <el-form-item label="用户ID" :label-width="formLabelWidth" style="margin-left: 60px">
                        <el-input v-model.number="userForm.id" autocomplete="off"
                                  :disabled="true" style="width: 80%"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名" :label-width="formLabelWidth" style="margin-left: 60px">
                        <el-input v-model="userForm.username" autocomplete="off"
                                  :disabled="true" style="width: 80%"></el-input>
                    </el-form-item>
                    <el-form-item label="用户类型" :label-width="formLabelWidth" style="margin-left: 60px">
                        <el-input v-model="userForm.type" autocomplete="off"
                                  :disabled="true" style="width: 80%"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" :label-width="formLabelWidth" prop="password" style="margin-left: 60px">
                        <el-input type="password" v-model="userForm.password"
                                  autocomplete="off" style="width: 80%"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass" :label-width="formLabelWidth" style="margin-left: 60px">
                        <el-input type="password" v-model="userForm.checkPass"
                                  autocomplete="off" style="width: 80%"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" style="text-align: center; margin-top: -30px">
                    <el-button @click="userDialogFormVisible = false" plain
                               style="margin-left: 60px; background: transparent" type="primary">取 消
                    </el-button>
                    <el-button type="primary" @click="updateUser('userForm'), userDialogFormVisible = false"
                               style="background: transparent" plain>修改密码
                    </el-button>
                </div>
            </el-dialog>

            <el-dialog :title="videoTitle" :visible.sync="videoDialogFormVisible" center @close="closeVideo()">
                <div slot="title">
                    <div style="color: #409EFF; font-size: 22px; font-family: 宋体; margin-bottom: -10px">{{videoTitle}}
                    </div>
                    <el-divider></el-divider>
                </div>
                <video controls autoplay :src="videoUrl" width="100%" style="margin-top: -40px"
                       :controlsList="!isLogin ? '' : 'nodownload'" loop/>
            </el-dialog>
        </el-container>

    </div>

</template>

<script>
    export default {
        name: "Index",
        data() {
            var checkUsername = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('用户名不能为空'));
                } else {
                    callback();
                }
            };
            var validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var validatePass3 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.userForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                input: '',
                username: '',
                loginForm: {
                    password: '',
                    username: ''
                },
                registerForm: {
                    password: '',
                    checkPass: '',
                    username: '',
                    type: '注册用户'
                },
                loginRules: {
                    password: [
                        {required: true, validator: validatePassword, trigger: 'blur'},
                        {min: 6, max: 10, message: '密码长度在 6 到 10 个字符', trigger: 'blur'}
                    ],
                    username: [
                        {required: true, validator: checkUsername, trigger: 'blur'},
                        {min: 2, max: 8, message: '用户名长度在 2 到 8 个字符', trigger: 'blur'}
                    ]
                },
                registerRules: {
                    password: [
                        {required: true, validator: validatePassword, trigger: 'blur'},
                        {min: 6, max: 10, message: '密码长度在 6 到 10 个字符', trigger: 'blur'}
                    ],
                    checkPass: [
                        {required: true, validator: validatePass2, trigger: 'blur'},
                    ],
                    username: [
                        {required: true, validator: checkUsername, trigger: 'blur'},
                        {min: 2, max: 8, message: '用户名长度在 2 到 8 个字符', trigger: 'blur'}
                    ],
                },
                userForm: {
                    id: '',
                    username: '',
                    password: '',
                    checkPass: '',
                    type: ''
                },
                formLabelWidth: '120px',
                userRules: {
                    password: [
                        {required: true, validator: validatePassword, trigger: 'blur'},
                        {min: 6, max: 10, message: '密码长度在 6 到 10 个字符', trigger: 'blur'}
                    ],
                    checkPass: [
                        {required: true, validator: validatePass3, trigger: 'blur'},
                    ],
                },
                loginDialogFormVisible: false,
                registerDialogFormVisible: false,
                userDialogFormVisible: false,
                videoDialogFormVisible: false,
                isLogin: true,
                isManager: true,
                videoTotal: null,
                videoList: null,
                audioTotal: null,
                audioList: null,
                videoSize: null,
                audioSize: null,
                videoKeyWords: '',
                audioKeyWords: '',
                backgroundImg: require('../assets/1.webp'),
                labelList: null,
                labelTotal: '',
                singerList: null,
                singerTotal: '',
            }
        },
        methods: {
            login(formName) {
                const _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.$axios.post('http://localhost:8888/user/login', this.loginForm).then(function (resp) {
                            console.log(resp)
                            if (resp.data.code == 200) {
                                _this.$message({
                                    message: '登录成功',
                                    type: 'success'
                                });
                                _this.username = resp.data.data.username;
                                window.sessionStorage.setItem("username", JSON.stringify(_this.username));
                                window.sessionStorage.setItem("type", JSON.stringify(resp.data.data.type));
                                if (resp.data.data.type == '管理员') {
                                    _this.isManager = false;
                                } else {
                                    _this.isManager = true;
                                }
                                _this.isLogin = false;
                            } else {
                                _this.$message.error(resp.data.msg);
                            }
                            _this.$router.go(0);
                        })
                    } else {
                        return false;
                    }
                });
            },
            enterManage() {
                this.$router.push('/manage');
            },
            submitForm(formName) {
                const _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.$axios.post('http://localhost:8888/user/register', this.registerForm).then(function (resp) {
                            console.log(resp)
                            if (resp.data.code == 200) {
                                _this.$message({
                                    message: '注册成功，请重新登录',
                                    type: 'success'
                                });

                            } else {
                                _this.$message.error(resp.data.msg);
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            editUser(username) {
                const _this = this;
                this.$axios.get('http://localhost:8888/user/searchUserByName/' + username).then(function (resp) {
                    _this.userForm.id = resp.data.data.id;
                    _this.userForm.username = resp.data.data.username;
                    _this.userForm.type = resp.data.data.type;
                })
            },
            updateUser(formName) {
                const _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.put('http://localhost:8888/user/updateUser', this.userForm).then(function (resp) {
                            if (resp.data.code == 200) {
                                _this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                _this.$router.go(0);
                            } else {
                                _this.$message.error(resp.data.msg);
                            }
                        });
                    }
                })
            },
            enterFileManage() {
                this.$router.push('/personalManage')
            },
            play(video) {
                this.videoUrl = 'http://localhost:8888/video/play/' + video.filename;
                this.videoTitle = video.title;
            },
            closeVideo() {
                this.videoUrl = ''
            },
            searchVideo(keyWords) {
                const _this = this;
                this.videoKeyWords = keyWords;
                this.$axios.get('http://localhost:8888/video/searchVideo/' + keyWords + '/1').then(function (resp) {
                    // console.log(resp)
                    _this.videoList = resp.data.data.list;
                    _this.videoTotal = resp.data.data.total;
                    _this.videoSize = resp.data.data.size;
                })
            },
            searchAllVideo() {
                const _this = this;
                this.$axios.get('http://localhost:8888/video/listVideo/1').then(function (resp) {
                    // console.log(resp)
                    _this.videoList = resp.data.data.list;
                    _this.videoTotal = resp.data.data.total;
                    _this.videoSize = resp.data.data.size;
                })
                this.videoKeyWords = '';
            },
            searchAudio(keyWords) {
                const _this = this;
                this.audioKeyWords = keyWords;
                this.$axios.get('http://localhost:8888/audio/searchAudio/' + keyWords + '/1').then(function (resp) {
                    // console.log(resp)
                    _this.audioList = resp.data.data.list;
                    _this.audioTotal = resp.data.data.total;
                    _this.audioSize = resp.data.data.size;
                })
            },
            searchAllAudio() {
                const _this = this;
                this.$axios.get('http://localhost:8888/audio/listAudio/1').then(function (resp) {
                    // console.log(resp)
                    _this.audioList = resp.data.data.list;
                    _this.audioTotal = resp.data.data.total;
                    _this.audioSize = resp.data.data.size;
                })
                this.audioKeyWords = '';
            },
            searchVideoAndAudio() {
                const _this = this;
                let keyWords = 'title:' + this.input + 'OR category:' + this.input + 'OR label:' + this.input + 'OR language:' + this.input +
                    'OR year:' + this.input + 'OR description:' + this.input
                this.$axios.get('http://localhost:8888/video/searchVideo/' + keyWords + '/1').then(function (resp) {
                    // console.log(resp)
                    _this.videoList = resp.data.data.list;
                    _this.videoTotal = resp.data.data.total;
                    _this.videoSize = resp.data.data.size;
                })

                let keyWords2 = 'sing:' + this.input + 'OR singer:' + this.input + 'OR style:' + this.input + 'OR language:' + this.input +
                    'OR year:' + this.input + 'OR description:' + this.input
                this.$axios.get('http://localhost:8888/audio/searchAudio/' + keyWords2 + '/1').then(function (resp) {
                    // console.log(resp)
                    _this.audioList = resp.data.data.list;
                    _this.audioTotal = resp.data.data.total;
                    _this.audioSize = resp.data.data.size;
                })
                this.videoKeyWords = '';
                this.audioKeyWords = '';
            },
            pageVideo(currentPage) {
                const _this = this;
                if (this.input == '' && this.videoKeyWords == '') {
                    this.$axios.get('http://localhost:8888/video/listVideo/' + currentPage).then(function (resp) {
                        // console.log(resp)
                        _this.videoList = resp.data.data.list;
                        _this.videoTotal = resp.data.data.total;
                        _this.videoSize = resp.data.data.size;
                    })
                } else if (this.videoKeyWords != '') {
                    this.$axios.get('http://localhost:8888/video/searchVideo/' + this.videoKeyWords + '/' + currentPage).then(function (resp) {
                        // console.log(resp)
                        _this.videoList = resp.data.data.list;
                        _this.videoTotal = resp.data.data.total;
                        _this.videoSize = resp.data.data.size;
                    })
                } else {
                    let keyWords = 'title:' + this.input + 'OR category:' + this.input + 'OR label:' + this.input + 'OR language:' + this.input +
                        'OR year:' + this.input + 'OR description:' + this.input
                    this.$axios.get('http://localhost:8888/video/searchVideo/' + keyWords + '/' + currentPage).then(function (resp) {
                        // console.log(resp)
                        _this.videoList = resp.data.data.list;
                        _this.videoTotal = resp.data.data.total;
                        _this.videoSize = resp.data.data.size;
                    })
                }
            },
            pageAudio(currentPage) {
                const _this = this;
                if (this.input == '' && this.audioKeyWords == '') {
                    this.$axios.get('http://localhost:8888/audio/listAudio/' + currentPage).then(function (resp) {
                        // console.log(resp)
                        _this.audioList = resp.data.data.list;
                        _this.audioTotal = resp.data.data.total;
                        _this.audioSize = resp.data.data.size;
                    })
                } else if (this.audioKeyWords != '') {
                    this.$axios.get('http://localhost:8888/audio/searchAudio/' + this.audioKeyWords + '/' + currentPage).then(function (resp) {
                        // console.log(resp)
                        _this.audioList = resp.data.data.list;
                        _this.audioTotal = resp.data.data.total;
                        _this.audioSize = resp.data.data.size;
                    })
                } else {
                    let keyWords2 = 'sing:' + this.input + 'OR singer:' + this.input + 'OR style:' + this.input + 'OR language:' + this.input +
                        'OR year:' + this.input + 'OR description:' + this.input
                    this.$axios.get('http://localhost:8888/audio/searchAudio/' + keyWords2 + '/' + currentPage).then(function (resp) {
                        // console.log(resp)
                        _this.audioList = resp.data.data.list;
                        _this.audioTotal = resp.data.data.total;
                        _this.audioSize = resp.data.data.size;
                    })
                }
            },
            logout() {
                this.username = '登录';
                window.sessionStorage.removeItem('username');
                window.sessionStorage.removeItem('type');
                this.$router.go(0);
            },
            index() {
                this.$router.go(0);
            }
        },
        created() {
            if (JSON.parse(window.sessionStorage.getItem('username')) == null) {
                this.username = '登录'
                this.isLogin = true;
            } else {
                this.username = JSON.parse(window.sessionStorage.getItem('username'))
                this.isLogin = false;
                let type = JSON.parse(window.sessionStorage.getItem('type'))
                if (type == '管理员') {
                    this.isManager = false;
                }
            }

            const _this = this;
            this.$axios.get('http://localhost:8888/video/listVideo/1').then(function (resp) {
                console.log(resp)
                _this.videoList = resp.data.data.list;
                _this.videoTotal = resp.data.data.total;
                _this.videoSize = resp.data.data.size;
            })
            this.$axios.get('http://localhost:8888/audio/listAudio/1').then(function (resp) {
                // console.log(resp)
                _this.audioList = resp.data.data.list;
                _this.audioTotal = resp.data.data.total;
                _this.audioSize = resp.data.data.size;
            })

            this.$axios.get('http://localhost:8888/video/listLabel').then(function (resp) {
                // console.log(resp)
                _this.labelList = resp.data.data;
                _this.labelTotal = resp.data.data.length;
            })

            this.$axios.get('http://localhost:8888/audio/listSinger').then(function (resp) {
                // console.log(resp)
                _this.singerList = resp.data.data;
                _this.singerTotal = resp.data.data.length;
            })

        },
    }
</script>

<style scoped>
    .time {
        font-size: 13px;
        color: #999;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 100%;
        display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    /deep/ .el-dialog.el-dialog--center {
        border-radius: 8px;
        background-color: #091f2cee;
        border: 1px solid rgb(13, 210, 236);
    }


    /deep/ el-textarea__inner {
        background: transparent;
    }

    /deep/ .el-input__inner {
        background: transparent;
    }

</style>