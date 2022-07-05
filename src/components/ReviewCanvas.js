import React, { useRef, useEffect, forwardRef } from 'react';
import styles from "../css/PhotoCrop.module.css";
import { useSelector } from 'react-redux';
const ReviewCanvas = forwardRef((props, ref) => {
    const data = useSelector(state => state.reducer);
    const file = data?.file;
    
    useEffect(() => {
        const canvas = ref.current
        const context = canvas.getContext('2d')
        const crop = document.getElementById('crop');
        const image = document.getElementById('mask2');
        
        // 設定預設背景
        context.fillStyle = "rgba(0, 0, 0, 0.5)";
        context.fillRect(0, 0, canvas.width, canvas.height);

        if (file) {
            canvas.width = 1300;
            canvas.height = 1300;
            context.drawImage(crop, 0, 0, 1300, 1300); //canvas圖片模糊 https://blog.csdn.net/felicity_zll/article/details/109193602
            
            // 輸出到第二張圖的結果
            context.globalCompositeOperation = "destination-out";
            context.globalAlpha = 1; // 設定透明度
            context.drawImage(image, 0, 0); // 遮罩

            // 填上背景
            context.globalCompositeOperation = "destination-over";
            context.fillStyle = "rgba(0, 0, 0, 0.5)";
            context.fillRect(0, 0, canvas.width, canvas.height);
            
            
            

        }
        

        
    }, )
    return (<>
        <canvas
        id="reviewCanvas"
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
export default ReviewCanvas;