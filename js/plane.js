// 配置
let congit = {
    dom: {
        wrap: document.querySelectorAll('.content .wrap'),
        twoList: document.querySelectorAll('.two-list ul > li'),
        imgs: document.querySelectorAll('.content .wrap img'),
        preview: document.querySelector('.preview'),
        previewImg: document.querySelector('.preview img'),
        close: document.querySelector('.preview .close'),
        left: document.querySelector('.preview .left'),
        right: document.querySelector('.preview .right'),
    },
    imgNumber: 60,
}
// console.log(congit.dom.wrap);

// 初始化事件
function init(){
    let twoList = [...congit.dom.twoList],
        wrap = [...congit.dom.wrap],
        imgs = [...congit.dom.imgs];

    // 图片分类
    twoList.forEach((val, i) => {
        // 列表切换事件
        twoList[i].onclick = () => {
            twoList.forEach((val, j) => {
                twoList[j].className = '';
                wrap[j].className = 'wrap';
            })
            twoList[i].className = 'active';
            wrap[i].className += ' active';
        }
    })

    // 图片预览
    imgs.forEach((val, i) => {
        imgs[i].onclick = () => {
            let src = imgs[i].src;
            congit.dom.preview.style.display = 'block';
            congit.dom.previewImg.src = src;
        }
    });

    // 关闭预览
    congit.dom.close.onclick = () => {
        congit.dom.preview.style.display = 'none';
    }

    /**
     * 图片切换
     * @param {number} n 正数为下 n 张，负数为上 n 张
     */
    function imgMove(n){
        let newSrc = congit.dom.previewImg.src;
        let strArr = newSrc.split('/');
        for(var k = 0; k < strArr.length; k++){
            var lastStr = strArr[k];  // 取数组最后一部分
        }
        
        // 拿到图片的路径截取数字 多取一位保证取的到两位数
        let srcNum = Math.floor(lastStr.slice(0, 2));
        let newSrcNum = srcNum + n;

        // 判断图片的边界
        if(newSrcNum > congit.imgNumber){
            newSrcNum = 1;
            congit.dom.previewImg.src = `./imgs/match/${newSrcNum}.jpg`;
        }
        if(newSrcNum < 1){
            newSrcNum = congit.imgNumber;
            congit.dom.previewImg.src = `./imgs/match/${newSrcNum}.jpg`;
        }

        congit.dom.previewImg.src = `./imgs/match/${newSrcNum}.jpg`;

    }

    // 下一张、上一张图片事件
    congit.dom.right.onclick = () => imgMove(1);
    congit.dom.left.onclick = () => imgMove(-1);

}
init();
