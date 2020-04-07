try{
    var play = document.querySelector('.play');
    var imgs = document.querySelectorAll('.content .video-box');
    var btns = document.querySelectorAll('.content .movies button');
}catch(e){
    console.log(e);
}


btns = [...btns];
btns.forEach((val, i) => {
    btns[i].addEventListener('click', () => {
        let imgSrc = btns[i].parentNode.previousElementSibling.src;

        let imgFile = imgSrc.split('/');  /* 拆分图片地址 */

        // 拿到图片地址 name.jpg
        let last = imgFile[imgFile.length - 1];
        let name = last.split('.');
        let imgName = name[0];
        
        play.children[1].src = `./video/movies/${imgName}.mp4`;
        play.style.display = 'block';

    })
})

imgs = [...imgs];
imgs.forEach((val, i) => {
    imgs[i].addEventListener('click', () => {
        let imgSrc = imgs[i].children[0].src;
        
        // 拿到图片地址 name.jpg
        let imgFile = imgSrc.split('/');
        let last = imgFile[imgFile.length - 1];
        let name = last.split('.');
        let imgName = name[0];

        play.children[1].src = `./video/${imgName}.mp4`;
        play.style.display = 'block';

    })
})

play.children[0].addEventListener('click', () => {
    play.style.display = 'none';
    play.children[1].pause();  /* 视频暂停 */
})
