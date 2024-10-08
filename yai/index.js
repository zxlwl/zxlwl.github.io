// const crypto = require('crypto');
// var axios = require('axios');
//变量
let data;
let config;
const v = new Audio();
marked.setOptions({
    renderer: new marked.Renderer(),
    pedantic: false,
    gfm: false,
    breaks: true,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
});




const a = new Vue({
    el: '.app',
    data: {
        talklist: [
            {
                name: '默认',
                data: [],
                class: true//废弃
            }
        ],
        guzilist: [],
        nowlist: 0,
        leftclass: 'talklistbox',
        allleftclass: 'left',
        iszhankai: false,
        talk: '',
        nowtitle: '默认对话',
        isdisabled: false
    },
    methods: {
        linktalk(index) {//历史对话
            this.talklist[this.nowlist].data = this.guzilist
            this.nowlist = index
            this.guzilist = this.talklist[this.nowlist].data
            this.nowtitle = this.talklist[this.nowlist].name
        },
        zhankai() {//侧边栏展开
            if (this.iszhankai) {
                this.leftclass = true
                this.allleftclass = 'left'
                this.iszhankai = false
            }
            else {
                this.leftclass = false
                this.allleftclass = 'left01'
                this.iszhankai = true

            }
        },
        newtalklist() {//新建
            this.talklist.push({
                name: '新建对话' + this.talklist.length,
                data: [],
                class: true
            })
            this.talklist[this.nowlist].data = this.guzilist
            this.nowlist = this.talklist.length - 1
            this.guzilist = this.talklist[this.nowlist].data
            this.nowtitle = this.talklist[this.nowlist].name
        },
        newtalk() {//对话
            if (!this.isdisabled) {
                if (this.talk != '') {
                    this.isdisabled = true
                    this.guzilist.push({
                        name: '我',
                        fangwei: true,
                        talk: this.talk
                    })
                    this.guzilist.push({
                        name: 'Y ai',
                        fangwei: false,
                        talk: 'loading'
                    })
                    data = JSON.stringify({
                        "prompt": this.talk,
                        "token": getToken(this.talk),
                        "stream": false
                    });
                    config = {
                        method: 'post',
                        url: 'https://ai.coludai.cn/api/chat',
                        headers: {
                            'ca': '0fb8f3f3-e2b7-412f-82c9-ff1f6187b1a7',
                            // 'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
                            'Content-Type': 'application/json'
                        },
                        data: data
                    };
                    axios(config)
                        .then(re => {
                            const e = marked(re.data.output)
                            // for (let i = 0; i < e.length; i++) {
                            //     this.guzilist[this.guzilist.length - 1].talk = e.substring(0, i)

                            // }
                            let i = 0;
                            const f = setInterval(() => {
                                this.guzilist[this.guzilist.length - 1].talk = e.substring(0, i)
                                i++;
                                if (i >= e.length) {
                                    clearInterval(f)
                                }
                            }, 50)
                            this.talk = ''
                            this.isdisabled = false
                        })
                        .catch((error) => {
                            console.log(error);
                            this.talk = ''
                            this.isdisabled = false
                            // alert('错误' + string(error))
                            this.$notify.error(
                                {
                                    title: '错误',
                                    duration: 3000,
                                    message: error
                                }
                            )
                            this.guzilist[this.guzilist.length - 1].talk = error
                        });
                }
                else {
                    this.$notify({
                        title: '提示',
                        message: '请勿输入空消息',
                        duration: 3000,
                        type: 'warning'
                    });
                    // alert('请勿输入空信息')
                }
            }
            else {
                this.$notify({
                    title: '提示',
                    message: '请等待当前对话完成哦',
                    duration: 3000,
                    type: 'warning'
                });
            }
        },
        genname() {
            let newtitle = prompt("请输入新名称：");
            if (newtitle) {
                this.talklist[this.nowlist].name = newtitle
                this.nowtitle = newtitle
            }
        },
        rangdu(index) {
            data = JSON.stringify({
                "text": this.guzilist[index].talk,
                "token": getToken(this.guzilist[index].talk),

            });
            config = {
                method: 'post',
                url: 'https://ai.coludai.cn/api/tts',
                headers: {
                    'ca': '0fb8f3f3-e2b7-412f-82c9-ff1f6187b1a7',
                    // 'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
                    'Content-Type': 'application/json'
                },
                data: data
            };
            axios(config)
                .then(re => {
                    console.log(re.data.dir);
                    v.pause()
                    v.src = 'https://ai.coludai.cn' + re.data.dir
                    v.play()
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        newphoto() {
            if (!this.isdisabled) {
                if (this.talk != '') {
                    this.isdisabled = true
                    this.guzilist.push({
                        name: '我',
                        fangwei: true,
                        talk: this.talk
                    })
                    this.guzilist.push({
                        name: 'Y ai',
                        fangwei: false,
                        talk: 'loading',
                        src: ''
                    })
                    data = JSON.stringify({
                        "text": this.talk,
                        "token": getToken(this.talk),
                    });
                    config = {
                        method: 'post',
                        url: 'https://ai.coludai.cn/api/txt2img',
                        headers: {
                            'ca': '0fb8f3f3-e2b7-412f-82c9-ff1f6187b1a7',
                            // 'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
                            'Content-Type': 'application/json'
                        },
                        data: data
                    };
                    axios(config)
                        .then(re => {
                            this.guzilist[this.guzilist.length - 1].talk = '图片消息'
                            this.guzilist[this.guzilist.length - 1].src = `https://ai.coludai.cn${re.data.dir}`
                            this.talk = ''
                            this.isdisabled = false
                        })
                        .catch((error) => {
                            console.log(error);
                            this.$notify.error(
                                {
                                    title: '错误',
                                    duration: 3000,
                                    message: error
                                }
                            )
                            this.guzilist[this.guzilist.length - 1].talk = error

                        });
                }
                else {
                    // alert('请勿输入空消息')
                    this.$notify({
                        title: '提示',
                        message: '请勿输入空消息',
                        duration: 3000,
                        type: 'warning'
                    });
                }
            }
            else {
                this.$notify({
                    title: '提示',
                    message: '请等待当前对话完成哦',
                    duration: 3000,
                    type: 'warning'
                });
            }


        },
        kanphoto(index) {
            console.log(this.guzilist[index].src);
            window.open(this.guzilist[index].src)
        }
    }
});
(function () {
    //感谢
    console.log('感谢 ai提供 sai https://coludai.cn/');
    console.log('输入框 https://blog.csdn.net/m0_74475812/article/details/138957419');

    const lefte = document.querySelector('.left')

})()


function calculateMd5(inputString) {
    const hash = CryptoJS.MD5(inputString);
    return (hash.toString(CryptoJS.enc.Hex))
}
function getToken(reqText) {
    // 获取日期
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    const dateMd5 = calculateMd5(formattedDate).substring(0, 6);
    const token = calculateMd5(reqText + dateMd5);
    return token;
}






