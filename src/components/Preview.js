import React, { useEffect } from 'react';

export const updatePreview = props => {
    const preview_canvas = document.getElementById('previewCanvas');
    const preview_canvas_context = preview_canvas.getContext('2d')
    preview_canvas.width = 1200;
    preview_canvas.height = 1200;
    const preview_canvas_width = preview_canvas.width;
    const preview_canvas_height = preview_canvas.height;
    
    // 重設畫布
    preview_canvas_context.clearRect(0, 0, preview_canvas_width, preview_canvas_height);

    // 設定灰底背景
    preview_canvas_context.fillStyle = "rgba(0, 0, 0, 0.5)";
    preview_canvas_context.fillRect(0, 0, preview_canvas_width, preview_canvas_height);

    // 檢查是否選擇檔案
    const initial_image = document.getElementById('initialImage');
    const file = initial_image.src.split('/').pop();
    if (file !== 'null') {
        // 重設畫布
        preview_canvas_context.clearRect(0, 0, preview_canvas_width, preview_canvas_height);
        
        // 複製 Crop 畫布
        const crop_canvas = document.getElementById('cropCanvas');
        preview_canvas_context.drawImage(crop_canvas, 0, 0);
    }
    // 遮罩與圖片合併，裁剪出內容
    const image = document.getElementById('mask2');
    preview_canvas_context.globalAlpha = 1; // 設定透明度
    preview_canvas_context.drawImage(image, 0, 0); // 遮罩
}

const Preview = props => {
    useEffect(() => {
        updatePreview();
    }, )

    return (<>
        <canvas id="previewCanvas" style={{width: '100%', height: '100%'}} />
        <img id="mask2" alt="" src="./photo-crop/crop/face_outline_inside.png" hidden />
    </>)
}
export default Preview;