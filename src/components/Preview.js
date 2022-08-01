import React, { useRef, useEffect, forwardRef } from 'react';
import styles from "../css/PhotoCrop.module.css";
import { useSelector } from 'react-redux';

export const updatePreview = props => {
    const canvas = document.getElementById('preview');
    const ctx = canvas.getContext('2d')
    canvas.width = 1200;
    canvas.height = 1200;
    const cw = canvas.width;
    const ch = canvas.height;
    
    // 重設畫布
    ctx.clearRect(0, 0, cw, ch);

    // 設定灰底背景
    // ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, cw, ch);

    // 複製 Crop 畫布
    const crop = document.getElementById('crop');
    const file = crop.src.split('/').pop();
    if (file !== 'null') {
        // 重設畫布
        ctx.clearRect(0, 0, cw, ch);
        
        const cropCanvas = document.getElementById('cropCanvas');
        ctx.drawImage(cropCanvas, 0, 0);
    }


    // 解決：canvas圖片模糊
    // https://blog.csdn.net/felicity_zll/article/details/109193602

    // 遮罩與圖片合併，裁剪出內容
    const image = document.getElementById('mask2');
    // ctx.globalCompositeOperation = "destination-out";
    ctx.globalAlpha = 1; // 設定透明度
    ctx.drawImage(image, 0, 0); // 遮罩

    // 將內容空白處填上灰底背景
    // ctx.globalCompositeOperation = "destination-over";
    // ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    // ctx.fillRect(0, 0, cw, ch);
}

const Preview = props => {
    useEffect(() => {
        updatePreview();
    }, )
    return (<>
        <canvas
        id="preview"
        style={{width: '100%', height: '100%'}}
        {...props}
        />
        <img
        id="mask2"
        alt=""
        src="./crop/face_outline_inside.png"
        hidden
        />
    </>)
}
export default Preview;