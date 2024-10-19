
var table1 = new pgdbs(dbs_fdd50789e9ddd2c5c4cd959f532ba189358dea38c3d2cece30f5b83123a2f2a5);
const t = Array.from('abcdefghijklmnopqrstuvwxyzQWERTYUIOPLKJHGFDSAMNBVCXZ1234567890!@#$%^&*()');
//设置数据成功回调函数
table1.onGetData((json, id, url) => {
    if (id == 'login') {
        if (json.fields[0].password == a.password) {
            console.log(1);
            a.data = JSON.parse(json.fields[0].data);
            a.nowdata = a.data.data
            alert('登入成功')
            a.dialogopen = false;
            a.islogin = true;
        }
    }
    else if (id == 'setTableData') {
        console.log(json);

    }
});

const a = new Vue({
    el: '.app',
    data: {
        nowdata:
            [],

        data: {
            id: 'zx-first',
            data: [],
        },
        dialogopen: true,
        password: '',
        uuid: '',
        nowid: 'zx-first',
        islogin: false
    },
    methods: {
        clickdata(index) {
            console.log(this.nowdata[index].id);
            if (this.nowdata[index].type == 'jia') {
                console.log(this.nowdata[index].id);
                console.log(this.nowid);
                this.nowid = this.nowdata[index].id
                this.nowdata = this.nowdata[index].data;


            }
            else {
                window.open(this.nowdata[index].url)
            }
        },
        returnmain() {
            this.nowid = this.data.id
            this.nowdata = this.data.data
        },
        login() {
            table1.getTableData(
                {
                    page: 1,
                    limit: 30,
                    id: 'getTableData',
                    filter: 'uuid=' + '"' + this.uuid + '"',
                    id: 'login'
                }
            );
        },
        setdata() {
            table1.setTableData({
                type: "UPDATE",
                filter: 'uuid=' + '"' + this.uuid + '"',
                fields: 'data=' + '"' + JSON.stringify(this.data).replace(/"/g, '\\"') + '"',
                id: 'setTableData'
            })
        },
        add() {
            console.log(2);
            const e = document.createElement('input')
            e.type = 'file'
            e.click()

            e.addEventListener('change', (ee) => {
                console.log(e.files);

                var myHeaders = new Headers();
                myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

                var formdata = new FormData();
                formdata.append("file", e.files[0], e.files[0].name);
                formdata.append("path", "y-cloud");

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: formdata,
                    redirect: 'follow'
                };

                fetch("https://api.pgaot.com/user/up_cat_file", requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        console.log(result)
                        if (result.url) {
                            function find(shuzhu, id) {
                                shuzhu.forEach(item => {

                                    if (item.id == id) {
                                        console.log(shuiji_id());
                                        item.data.push({
                                            name: result.name,
                                            type: result.type,
                                            url: result.url,
                                            id: shuiji_id()
                                        })
                                        this.nowdata = shuzhu
                                        console.log(a.islogin);
                                        if (a.islogin) {
                                            a.setdata();
                                        }
                                        return item

                                    }
                                    else {
                                        if (item.data) {
                                            console.log(2);
                                            find(item.data, id)
                                        }
                                    }
                                });
                            }
                            if (this.nowid == 'zx-first') {
                                let c = shuiji_id()
                                this.data.data.push({
                                    name: result.name,
                                    type: result.type,
                                    url: result.url,
                                    id: shuiji_id()
                                })
                                this.nowdata = this.data.data
                                this.nowid = c;


                                if (this.islogin) {
                                    this.setdata();
                                }
                            }
                            else {
                                find(this.data.data, this.nowid)
                            }
                        }
                    })
                    .catch(error => console.log('error', error));
            })
        },
        addwenjianjia() {
            console.log(this.nowid);

            let name = prompt('输入文件夹名称')
            console.log(name);

            if (name != '' && name) {
                function find(shuzhu, id) {

                    shuzhu.forEach(item => {

                        if (item.id == id) {
                            // console.log(shuiji_id());
                            let c = shuiji_id()
                            item.data.push({
                                name: name,
                                type: 'jia',
                                id: c,
                                data: []
                            })
                            this.nowdata = shuzhu
                            console.log(item);

                            this.nowid = c;
                            console.log(a.islogin);

                            if (a.islogin) {
                                a.setdata();
                            }
                            return item

                        }
                        else {
                            if (item.data) {
                                console.log(2);
                                find(item.data, id)
                            }
                        }
                    });
                }
                if (this.nowid == 'zx-first') {
                    let c = shuiji_id()
                    this.data.data.push({
                        name: name,
                        type: 'jia',
                        id: c,
                        data: []
                    })
                    this.nowdata = this.data.data
                    this.nowid = c;
                    if (this.islogin) {
                        this.setdata();
                    }
                }
                else {
                    find(this.data.data, this.nowid)
                }
            }
            else {
                alert('请输入内容')
            }
        }
    }
})

function shuiji_id() {
    let r = '';
    for (let i = 0; i < 26; i++) {
        r += t[Math.floor(Math.random() * (t.length + 1))]
    }
    return r
}
function find(shuzhu, id) {
    shuzhu.forEach(item => {

        if (item.id == id) {
            console.log(item);
            return item
        }
        else {
            if (item.data) {
                console.log(2);
                find(item.data, id)
            }
        }
    });
}
// console.log(find(a.data, '325353er45'));


a.nowdata = a.data.data
