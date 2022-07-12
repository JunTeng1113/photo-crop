import React, { useRef, useEffect, forwardRef } from 'react';
import styles from "../css/PhotoCrop.module.css";
import { useSelector } from 'react-redux';

export function updatePreview(props) {
    const canvas = document.getElementById('preview');
    const ctx = canvas.getContext('2d')
    canvas.width = 1200;
    canvas.height = 1200;
    const cw = canvas.width;
    const ch = canvas.height;
    canvas.style.border='1px solid red';
    
    // 重設畫布
    ctx.clearRect(0, 0, cw, ch);

    // 設定灰底背景
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 複製 Crop 畫布
    const cropCanvas = document.getElementById('cropCanvas');
    ctx.drawImage(cropCanvas, 0, 0);

    // 解決：canvas圖片模糊
    // https://blog.csdn.net/felicity_zll/article/details/109193602

    // 遮罩與圖片合併，裁剪出內容
    const image = document.getElementById('mask2');
    ctx.globalCompositeOperation = "destination-out";
    ctx.globalAlpha = 1; // 設定透明度
    ctx.drawImage(image, 0, 0); // 遮罩

    // 將內容空白處填上灰底背景
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const Preview = forwardRef((props, ref) => {
    useEffect(() => {
        updatePreview();
    }, )
    return (<>
        <canvas
        id="preview"
        className={styles.canvas}
        ref={ref}
        {...props}
        />
        <img
        id="mask2"
        className={styles.reviewCanvasIcon}
        alt=""
        src="./face_outline_outside-mask.png"
        hidden
        />
    </>)
})
export default Preview;