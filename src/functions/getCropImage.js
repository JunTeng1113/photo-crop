import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SetData } from "../actions/SetData.js";
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
                img[i].setAttribute("crossOrigin", "Anonymous");
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

        const resultImg = canvas.toDataURL('image/png');
        // localStorage.setItem('resultImg', resultImg);
        useDispatch(SetData({resultImg: resultImg}));

        // 沒有結果！！
        const newImg = new Image();
        newImg.onload = function() {
            document.getElementById('workpoint').appendChild(newImg);
        }
        newImg.src = useSelector(state => state.reducer)?.resultImg;
        
    })
}