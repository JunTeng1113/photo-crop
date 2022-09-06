export default function getCropImage(originalImage) {
    const canvas = document.getElementById('workCanvas');
    canvas.width = 1200;
    canvas.height = 1200;
    const context = canvas.getContext('2d')
    
    const maskImage = './crop/face_outline_inside.png';

    const mulitImg = [
        originalImage,
        maskImage
    ]

    let promiseAll = [], img = [], imgTotal = mulitImg.length;
    for(let i = 0 ; i < imgTotal ; i++){
        promiseAll[i] = new Promise((resolve, reject)=>{
            img[i] = new Image()
            img[i].src = mulitImg[i]
            img[i].onload = function(){
                //第i張加載完成
                resolve(img[i])
            }
        })
    }

    Promise.all(promiseAll).then((img)=>{
        //全部加載完成
        context.drawImage(img[0], 0, 0);

        context.globalCompositeOperation = "destination-out";
        context.drawImage(img[1], 0, 0);
        // document.getElementById('workpoint').appendChild(canvas);
    })
}