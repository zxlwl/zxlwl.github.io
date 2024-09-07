const a = new Vue({
    el: '.app',
    data: {
        nowzhuangtai: 'none',
        nowzhuangtaihtml: '',
        nowxuanzhong: null,
        nowpage: 0,
        list: [{
            data: [
                // {
                //     type: 'text',
                //     text: '这是文本',
                //     color: 'black',
                //     width: 100,
                //     height: 100,
                //     size: 12,
                //     top: 10,
                //     left: 20
                // },
                // {
                //     type: 'photo',
                //     width: 100,
                //     height: 100,
                //     url: '',
                //     top: 10,
                //     left: 20
                // },
                // {
                //     type: 'a',
                //     text: '链接',
                //     width: 100,
                //     height: 100,
                //     url: '',
                //     top: 10,
                //     left: 20
                // },
                // {
                //     type: 'mp3',
                //     width: 100,
                //     height: 100,
                //     url: 'https://static.codemao.cn/pickduck/H1PyV_Y30.mp3?hash=FjV44VrY2_Vf6j3DFKCFmvT3AEln',
                //     top: 10,
                //     left: 20
                // }
            ]
        }],

    },
    methods: {
        checkpage(index) {
            this.nowpage = index;
        },
        addpage() {
            this.list.push({
                data: [],
                photo: ''
            })
        },
        deleteppt(index) {
            this.nowxuanzhong = null
            this.nowzhuangtaihtml = null
            this.nowzhuangtai = 'none'
            console.log(index);
            console.log(this.list[this.nowpage].data);
            this.list[this.nowpage].data.splice(index, 1);
            console.log(this.list[this.nowpage].data);

        },
        daoru() {
            const r = document.createElement('input')
            r.type = 'file'
            r.click();
            r.addEventListener('change', (e) => {
                var file = e.target.files[0]

                // 创建FileReader对象
                var reader = new FileReader();

                // 定义文件读取成功后的回调函数
                reader.onload = function (e) {
                    // 获取文件内容
                    var fileContent = e.target.result;
                    console.log(fileContent);

                    a.list = JSON.parse(fileContent)
                };

                // 读取文件为文本
                reader.readAsText(file);
            })
        },
        daochu() {
            var blob = new Blob([JSON.stringify(a.list)], { type: "application/json" });
            // 创建一个链接元素
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = "newppt.json";
            link.click();
            window.URL.revokeObjectURL(link.href);
        },
        share() {
            var blob = new Blob([JSON.stringify(a.list)], { type: "application/json" });
            // var href = window.URL.createObjectURL(blob);
            // 创建一个链接元素
            console.log(blob);
            // console.log(href);

            var myHeaders = new Headers();
            myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

            var formdata = new FormData();
            formdata.append("file", blob, "page.json");
            formdata.append("path", "yppt");

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch("https://api.pgaot.com/user/up_cat_file", requestOptions)
                .then(response => response.json())
                .then(re => {
                    console.log(re, re['url'], re['url'])

                    navigator.clipboard.writeText('https://zxlwl.github.io/yppt/player?url=' + re['url']).then(() => {
                        alert("复制成功");
                    });
                })
                .catch(error => console.log('error', error));
        },
        yuran() {
            var blob = new Blob([JSON.stringify(a.list)], { type: "application/json" });
            // var href = window.URL.createObjectURL(blob);
            // 创建一个链接元素
            console.log(blob);
            // console.log(href);

            var myHeaders = new Headers();
            myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

            var formdata = new FormData();
            formdata.append("file", blob, "page.json");
            formdata.append("path", "yppt");

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch("https://api.pgaot.com/user/up_cat_file", requestOptions)
                .then(response => response.json())
                .then(re => {
                    console.log(re, re['url'], re['url'])

                    window.open('https://zxlwl.github.io/yppt/player?url=' + re['url'])
                })
                .catch(error => console.log('error', error));
        }
    }
});

const app = document.querySelector('.app');
const page = document.querySelector('.app .body .right .body');
let nowgetzhujianzuangtai = null;
let nowgetdev = null;
let nowtake = null;
let move = {
    x: null,
    y: null,
};
(function () {
    app.ondragstart = (e) => {
        nowtake = e.target.innerText
        console.log(nowtake);

    }
    app.ondragover = (e) => {
        e.preventDefault()
    }
    app.ondrop = (e) => {
        console.log(2222);
        if (e.target.dataset.get = 'yes') {
            if (nowtake == '文本') {
                a.list[a.nowpage].data.push({
                    type: 'text',
                    text: '这是文本',
                    color: 'black',
                    width: 100,
                    height: 100,
                    size: 12,
                    top: ((e.clientY - page.getBoundingClientRect().top + window.scrollY)) / page.offsetHeight * 100,
                    left: ((e.clientX - page.getBoundingClientRect().left + window.scrollX)) / page.offsetWidth * 100
                })
            }
            else if (nowtake == '图片') {
                a.list[a.nowpage].data.push({
                    type: 'photo',
                    width: 100,
                    height: 100,
                    url: '',
                    top: ((e.clientY - page.getBoundingClientRect().top + window.scrollY)) / page.offsetHeight * 100,
                    left: ((e.clientX - page.getBoundingClientRect().left + window.scrollX)) / page.offsetWidth * 100
                })
            }
            else if (nowtake == '超链接') {
                a.list[a.nowpage].data.push({
                    type: 'a',
                    width: 100,
                    height: 100,
                    text: '超链接',
                    url: '',
                    top: ((e.clientY - page.getBoundingClientRect().top + window.scrollY)) / page.offsetHeight * 100,
                    left: ((e.clientX - page.getBoundingClientRect().left + window.scrollX)) / page.offsetWidth * 100
                })
            }
            else if (nowtake == '音频') {
                a.list[a.nowpage].data.push({
                    type: 'mp3',
                    width: 200,
                    height: 100,
                    url: 'https://static.codemao.cn/pickduck/H1PyV_Y30.mp3?hash=FjV44VrY2_Vf6j3DFKCFmvT3AEln',
                    top: ((e.clientY - page.getBoundingClientRect().top + window.scrollY)) / page.offsetHeight * 100,
                    left: ((e.clientX - page.getBoundingClientRect().left + window.scrollX)) / page.offsetWidth * 100
                })
            }
            else {

            }
        }
    }
    page.addEventListener('mousedown', e => {
        if (e.target.dataset.id) {
            nowgetzhujianzuangtai = true
            nowgetdev = e.target.dataset.id
            move.x = e.clientX;
            move.y = e.clientY;
            e.target.classList.add('anzhu')
        }
    })

    function throttle(func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    const myEfficientFn = throttle(function (e) {

        if (nowgetzhujianzuangtai) {



            // console.log(((e.clientX - page.getBoundingClientRect().left + window.scrollX) - ((e.clientX - page.getBoundingClientRect().left + window.scrollX) - (e.clientX - e.target.getBoundingClientRect().left))) / page.offsetWidth);
            a.list[a.nowpage].data[nowgetdev].left = ((e.clientX - page.getBoundingClientRect().left + window.scrollX)) / page.offsetWidth * 100
            // a.list[a.nowpage].data[nowgetdev].left = ((e.clientX - page.getBoundingClientRect().left + window.scrollX) - ((e.clientX - page.getBoundingClientRect().left + window.scrollX) - (e.clientX - e.target.getBoundingClientRect().left))) / page.offsetWidth * 100
            // a.list[a.nowpage].data[nowgetdev].top = ((e.clientY - page.getBoundingClientRect().top + window.scrollY) - ((e.clientY - page.getBoundingClientRect().top + window.scrollY) - (e.clientY - e.target.getBoundingClientRect().top))) / page.offsetHeight * 100
            a.list[a.nowpage].data[nowgetdev].top = (((e.clientY - page.getBoundingClientRect().top + window.scrollY)) / page.offsetHeight) * 100

        }
    }, 5); // 规定时间设置为1000毫秒（1秒）

    // 绑定到事件

    page.addEventListener('mousemove', (e) => {
        myEfficientFn(e)
        // if (nowgetzhujianzuangtai) {


        //     if (e.layerX != 0 && e.layerY != 0 && e.layerX != -1 && e.layerY != -1) {

        //         a.list[a.nowpage].data[nowgetdev].left = (e.clientX - page.getBoundingClientRect().left + window.scrollX) / page.offsetWidth * 100
        //         a.list[a.nowpage].data[nowgetdev].top = ((e.clientY - page.getBoundingClientRect().top + window.scrollY) / page.offsetHeight) * 100
        //     }
        // }
    })
    page.addEventListener('mouseup', e => {
        nowgetzhujianzuangtai = false
        e.target.classList.remove('anzhu')
    })
    page.addEventListener('click', e => {
        console.log(e.target.dataset.id);

        if (e.target.hasAttribute('data-id')) {
            a.nowzhuangtai = 'block';
            a.nowxuanzhong = e.target.dataset.id
            if (a.list[a.nowpage].data[e.target.dataset.id].type == 'text') {
                a.nowzhuangtaihtml = 1;
            }
            else if (a.list[a.nowpage].data[e.target.dataset.id].type == 'photo') {
                a.nowzhuangtaihtml = 2;
            }
            else if (a.list[a.nowpage].data[e.target.dataset.id].type == 'mp3') {
                a.nowzhuangtaihtml = 3;
            }
            else if (a.list[a.nowpage].data[e.target.dataset.id].type == 'a') {
                a.nowzhuangtaihtml = 4;
            }
        }
        else {
            a.nowzhuangtai = 'none';
            a.nowzhuangtaihtml = 0;
        }
    })
})()