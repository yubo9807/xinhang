let congit = {
    dom: {
        wraps: document.querySelectorAll(".img-wrap li"),
        btns: document.querySelectorAll(".btn li"),
        more: document.querySelector(".more"),
        sidebar: document.querySelector(".sidebar"),
        footer: document.querySelector(".footer"),
        flag: document.querySelector('.flag'),
        close: document.querySelector('.close'),
    },
    index: 0,  /* 索引值 */
    timing: null,  /* 定时器 */
    timer: 3000,  /* 轮换时间 */
}

// 轮播图切换
function tab() {
    let wraps = [...congit.dom.wraps],
        btns = [...congit.dom.btns];

    // 刚进入页面的文字动画
    animation(congit.dom.wraps[0].children[0], 'y', 1.8);
    animation(congit.dom.wraps[0].children[1], 'x', 2.4);

    // 自动轮播定时器
    congit.timing = setInterval(autoPlay, congit.timer);

    // 自动轮播函数
    function autoPlay() {
        let i = congit.index;
        i ++;
        i > (wraps.length-1) && (i = 0);  // 返回到第一张图片
        wraps.forEach((val, i) => {
            wraps[i].className = btns[i].className = '';  // 清除所有 li 的样式
        })
        
        wraps[i].className = btns[i].className = 'active';  // 添加样式

        // 重新赋值索引值
        congit.index = i;
        // console.log(congit.index)

        let strong = congit.dom.wraps[i].children[0],
            span = congit.dom.wraps[i].children[1];
        
        // 给文本添加动画
        animation(strong, 'y', 1.2, true);
        animation(span, 'x', 2.2, true);

        // 图片切换后将版权信息隐藏
        congit.dom.footer.style.transform='translateY(74px)';
    }

    /**
     * 文本动画
     * @param {element} ele dom对象
     * @param {string} direction 只能传“x, y”
     * @param {number} timer 动画时间
     */
    function animation(ele, direction, timer, judge = true){
        ele.style.transform = `translate${direction}(20px)`;
        ele.style.opacity = 1;
        ele.style.transition = `transform ${timer}s ease`;

        // congit.timer 后将文本消失
        if(judge == false){
            return;
        }else{
            setTimeout(() => {
                ele.style.transform = 'none';
                ele.style.opacity = 0;
            }, congit.timer)
        }
    }


    // 轮播图 btn 事件
    btns.forEach((val, i) => {

        // 轮播图 btn 鼠标移入事件
        btns[i].onmousemove = () => {
            clearInterval(congit.timing);  // 鼠标移入后清除轮播图定时器
            btns.forEach((val, i) => {
                btns[i].className = wraps[i].className= '';  // 清除样式
            })
            btns[i].className = wraps[i].className = 'active';  // 添加样式

            congit.index = i;  // 索引值重新赋值
            
            let strong = congit.dom.wraps[i].children[0],
                span = congit.dom.wraps[i].children[1];
            
            // 添加文本动画
            animation(strong, 'y', 1.2, false);
            animation(span, 'x', 2.2, false);

            // 鼠标移入后版权信息隐藏
            congit.dom.footer.style.transform='translateY(74px)';
        }
        // 轮播图 btn 鼠标移除事件
        btns[i].onmouseout = () => {
            congit.timing = setInterval(autoPlay, congit.timer);
        }
    });
}
tab()




// 版权信息功能（滚轮控制）
mScroll(document,function(){
	congit.dom.footer.style.transform='translateY(0)';
},function(){
	congit.dom.footer.style.transform='translateY(74px)';
});

/*
	滚轮事件
	mousewheel			IE/Chrome
		滚动的方向		event.wheelDelta
						上：120（正数）
						下：-120（负数）
	
	DOMMouseScroll		FF(必需要用addEventListener添加)
		滚动的方向		event.detail
						上：-3（负数）
						下：3（正数）
*/
function mScroll(obj, callBackUp, callBackDown) {
	obj.addEventListener('mousewheel', fn, {passive: false});
	obj.addEventListener('DOMMouseScroll', fn);	//FF

	function fn(ev) {
		if (ev.wheelDelta > 0 || ev.detail < 0) {
			callBackUp.call(obj, ev);
		} else {
			callBackDown.call(obj, ev);
		}

		ev.preventDefault();	//阻止浏览器的默认行为
	};
}