let iBody = document.querySelector('.handset-body');


// 阻止移动端双击放大，双指放大
(function() {
    // 阻止双击放大
    var lastTouchEnd = 0;
    document.addEventListener('touchstart', (event) => {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    });
    document.addEventListener('touchend', (event) => {
        var now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            // event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // 阻止双指放大
    document.body.addEventListener('gesturestart', (event) => {
        event.preventDefault();
    });
})();

// 侧边栏功能
function sidebarMore(){
    let sidebarItem = document.querySelector(".sidebar"),
        more = document.querySelector(".more");
    let count = 0;
  
    more.onclick = (e) => {
        count ++;
        if(count % 2 == 1){
            sidebarItem.style.transform = 'translatex(0)';  // 侧边栏显示
            more.children[0].style.transform = 'rotate(-180deg)';
        }else{
            sidebarItem.style.transform = 'translatex(150px)';  // 侧边栏隐藏
            more.children[0].style.transform = 'rotate(0)';
        
            // 小圆点恢复到初始位置
            sidebarItem.children[1].style.top = 85 + 'px';

        }

        stopBubble(e);

    }
    iBody.onclick = (e) => {
        sidebarItem.style.transform = 'translatex(150px)';  // 侧边栏隐藏
        more.children[0].style.transform = 'rotate(0)';
        count = 0;
        stopBubble(e);
    }

    // 小圆点移动位置
    let sidebar = [...sidebarItem.children[0].children];
    sidebar.forEach((val, i) => {
        sidebar[i].onmousemove = () => {
            setTimeout(() => {
                sidebarItem.children[1].style.top = i * 40 + 83 + 'px';
                sidebarItem.children[1].style.transition = 'top .4s ease';
            }, 30);
        }
    })
}
sidebarMore()

// 取消冒泡
function stopBubble(e){
    e = e || window.enent;
    if(e.stopPropagation){
        e.stopPropagation();
    }else{
        e.cancelBubble = true;
    }
}


// close.addEventListener('click', () => land.style.display = 'none')


/**
 * 回到底部
 * @param {*} ele Dom元素
 */
function goTop(ele){
    let scrollSeat = iBody.scrollTop;
    let gotop = document.querySelector(ele);

    // 滚动条位置>30,元素显示
    if(scrollSeat > 30){
        gotop.style.transform = "translateY(0)";
        gotop.style.opacity = "1";
    }else{
        gotop.style.opacity = "0";
    }
}

iBody.addEventListener('scroll', function(){
    goTop('.return-top')
}, false);


// 头部遮罩
let shade = document.querySelector('.shade');
iBody.onscroll = () => {
    var t = iBody.scrollTop;
    if (t > 27) {
        shade.style.transform = 'translateY(0)';
    }else{
        shade.style.transform = 'translateY(-3rem)';
    }
}

// close.addEventListener('click', () => land.style.display = 'none');
// land.children[4].onclick = () => {
//     window.location.href = './default.html';
// }