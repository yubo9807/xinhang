let congit = {
	dom: {
		btns: document.querySelectorAll('.sign-nav ul>li'),
		texts: document.querySelectorAll('.main .text>li'),
		imgs: document.querySelectorAll('.main .img>img'),
		body: document.getElementsByTagName('body')[0],
	},
	bgs: ['#1b373a', '#2a223e', '#391b1b', '#1b373a', '#1c391b', '#1b2638', '#361b3a', '#1a3929'],
}

let btns = [...congit.dom.btns],
	texts = [...congit.dom.texts],
	imgs = [...congit.dom.imgs],
	bgs = congit.bgs;


btns.forEach((val, i) => {
	btns[i].onclick = () => {
		// 清空所有的 class
		btns.forEach((val, j) => {
			btns[j].className = imgs[j].className = '';
			for(let k =0; k < 3; k ++){
				texts[j].children[k].className = '';
			}
		});

		btns[i].className = imgs[i].className = 'active';  /* 切换图片和 btn */
		congit.dom.body.style.background = bgs[i];  /* 设置背景颜色 */

		texts[i].children[0].className = 'active';
		// 动画延时
		setTimeout(() => {
			texts[i].children[1].className = 'active';
		}, 200)	
		setTimeout(() => {
			texts[i].children[2].className = 'active';
		}, 400)
	}
});




