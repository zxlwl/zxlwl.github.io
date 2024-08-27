const app = document.querySelector('.app');
const link = document.querySelector('.link');
(function () {
    let r = null

    // link.addEventListener('click', () => {
    //     var element = document.querySelector('.table');

    //     // 创建一个Canvas元素

    //     // canvas.width = element.offsetWidth;
    //     // canvas.height = element.offsetHeight;

    //     // // 获取2D渲染上下文
    //     // var ctx = canvas.getContext('2d');

    //     // 将元素绘制到Canvas上
    //     // ctx.drawWindow(window, element.offsetLeft, element.offsetTop, canvas.width, canvas.height, "#f0f0f0");
    //     // ctx.drawImage(element, 0, 0, canvas.width, canvas.height);
    //     // 将Canvas内容转换为DataURL
    //     html2canvas(element).then(function (canvas) {
    //         // 将生成的 Canvas 添加到页面中
    //         document.body.appendChild(canvas);
    //     });
    //     var canvas = document.querySelector('canvas');
    //     var dataURL = canvas.toDataURL('image/png');

    //     // 可以将DataURL设置为图片的src，或者创建一个a标签下载
    //     var img = new Image();
    //     img.src = dataURL;
    //     document.body.appendChild(img); // 将图片添加到页面上显示

    //     // 如果需要下载图片，可以创建一个a标签并模拟点击下载
    //     var a = document.createElement('a');
    //     a.href = dataURL;
    //     a.download = 'screenshot.png';
    //     a.click();
    // });

    app.ondragstart = (e) => {
        r = e.target
        y = e.target.parentNode
        console.log(e.target);
        if (e.target.parentNode.dataset.if == 'move') {
            e.dataTransfer.effectAllowed = 'copy'
        }
        else {
            e.dataTransfer.effectAllowed = 'move'
        }
    }
    app.ondragover = (e) => {
        // console.log(e);

        e.preventDefault()
        // e.preventDefault();
    }
    app.ondragenter = (e) => {

        if (e.dataTransfer.effectAllowed == 'copy') {
            console.log(e.dataTransfer.effectAllowed);
            const t = document.querySelectorAll('.bo_li')
            t.forEach(item => {
                item.classList.remove('keep')
            })
            if (e.target.classList[0] == 'bo_li' && e.target.dataset.r != 'n') {
                e.target.classList.add('keep')
            }
        }
        else if (e.dataTransfer.effectAllowed == 'move') {
            const t = document.querySelectorAll('*')
            t.forEach(item => {
                item.classList.remove('keep')
            })
            if (e.target.classList[0] == 'left') {
                e.target.classList.add('keep')
            }
            else if (e.target.parentNode.classList[0] == 'left') {
                e.target.parentNode.classList.add('keep')
            }
        }



    }
    app.ondrop = (e) => {
        e.target.classList.remove('keep')
        if (e.dataTransfer.effectAllowed == 'copy') {
            // console.log(r.cloneNode(true));
            if (e.target.classList[0] == 'bo_li' && e.target.dataset.r != 'n') {
                e.target.innerHTML = ''
                e.target.appendChild(r.cloneNode(true))
            }
        }
        else if (e.dataTransfer.effectAllowed == 'move' && e.target.dataset.if == 'move' || e.target.parentNode.dataset.if == 'move') {
            y.innerHTML = ''
            if (e.target.parentNode.dataset.if == 'move') {
                e.target.parentNode.classList.remove('keep')
            }
        }
    }
})()


function takeScreenshot() {
    const targetElement = document.querySelector('.table'); // 可以替换为需要截取的特定元素
    const canvas = document.getElementById('screenshotCanvas');
    const ctx = canvas.getContext('2d');
    console.log(ctx);

    canvas.width = targetElement.offsetWidth;
    canvas.height = targetElement.offsetHeight;

    ctx.drawWindow(window, 0, 0, canvas.width, canvas.height, 'rgb(255, 255, 255)');
    // 或者使用 ctx.drawImage() 方法将特定元素绘制到 canvas 上
}

function saveScreenshot() {
    const canvas = document.getElementById('screenshotCanvas');
    const image = canvas.toDataURL('image/png');
    // image 包含了截图的 Base64 编码数据
    // 可以将其用作图片的 src 或发送给服务器保存
}

function downloadScreenshot() {
    const canvas = document.getElementById('screenshotCanvas');
    const image = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.download = 'screenshot.png';
    link.href = image;
    link.click();
}