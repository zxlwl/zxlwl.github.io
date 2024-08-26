const app = document.querySelector('.app');
(function () {
    let r = null
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
            console.log(r.cloneNode(true));
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
