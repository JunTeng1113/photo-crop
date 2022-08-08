import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePreview } from './Preview';
import { SetData } from "../actions/SetData.js";
import { PositionOffest } from "../actions/PositionOffest.js";

const Crop = props => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.reducer);
    const x = data?.x;
    const y = data?.y;
    const file = data?.file;
    const size = data?.size;
    const rotate = data?.rotate;

    var offsetX = 0, offsetY = 0; // 定義畫布在視窗的位置
    var crop_image_parameters = {x: x, y: y, imageFile: file, rotate: rotate, size: size};
    var is_dragging = false;
    var startX, startY; // 定義滑鼠在畫布的位置
    
    var crop_canvas;
    var crop_canvas_context;
    var crop_canvas_width, crop_canvas_height;

    // 取得畫布在視窗的位置
    useEffect(() => {
        crop_canvas = document.getElementById('cropCanvas');
        function reOffset(){
            var BB = crop_canvas.getBoundingClientRect();
            offsetX = BB.left;
            offsetY = BB.top;    
        }
        reOffset();
        window.onscroll = function(e){ reOffset(); }
        window.onresize = function(e){ reOffset(); }
        crop_canvas.onresize = function(e){ reOffset(); }
    }, []);

    // 處理圖片旋轉
    useEffect(() => {
        if (file === null) { return; }
        const process_rotate_canvas = document.getElementById('processRotateCanvas');
        const process_rotate_canvas_context = process_rotate_canvas.getContext('2d');
        const initial_image = document.getElementById('initialImage'); // 取得原始圖片
        process_rotate_canvas.width = 1200;
        process_rotate_canvas.height = 1200;
        crop_canvas_width = process_rotate_canvas.width;
        crop_canvas_height = process_rotate_canvas.height;

        // 讓圖片可以按原比例呈現
        const crop_image_ratio = initial_image.width / initial_image.height;
        var width = crop_canvas_width;
        var height = crop_canvas_height;
        if (crop_image_ratio >= 1) {
            height = height / crop_image_ratio;
        } else {
            width = height * crop_image_ratio;
        }
        const offsetX = (crop_canvas_width / 2) - (width / 2);
        const offsetY = (crop_canvas_width / 2) - (height / 2);

        // 將圖片旋轉
        process_rotate_canvas_context.save();
        process_rotate_canvas_context.translate(process_rotate_canvas.width / 2, process_rotate_canvas.height / 2);
        process_rotate_canvas_context.rotate(rotate * Math.PI / 180);
        process_rotate_canvas_context.translate(-(process_rotate_canvas.width / 2), -(process_rotate_canvas.height / 2));
        process_rotate_canvas_context.drawImage(initial_image, 0, 0, initial_image.width, initial_image.height, offsetX, offsetY, width, height);
        process_rotate_canvas_context.restore();

        // 旋轉後的原始圖片
        const rotated_photo = document.getElementById('rotatedPhoto');
        rotated_photo.src = process_rotate_canvas.toDataURL('image/png');
    }, [file, rotate]);

    useEffect(() => {
        crop_canvas = document.getElementById('cropCanvas');
        crop_canvas_context = crop_canvas.getContext("2d");
        crop_canvas.width = 1200;
        crop_canvas.height = 1200;
        crop_canvas_width = crop_canvas.width;
        crop_canvas_height = crop_canvas.height;

        // // 設定預設背景
        crop_canvas_context.fillStyle = "rgba(0, 0, 0, 0.5)";
        crop_canvas_context.fillRect(0, 0, crop_canvas_width, crop_canvas_height);
        
        // 讀取圖片
        const rotated_photo = document.getElementById('rotatedPhoto');
        var temp_photo = new Image();
        temp_photo.onload=function(){

            const rotated_photo_width = rotated_photo.width;
            const rotated_photo_height = rotated_photo.height;
            
            crop_image_parameters = {x: x, y: y, width: rotated_photo_width, height: rotated_photo_height, imageFile: temp_photo, rotate: rotate, size: size};
            
            drawAll();
            // 圖片處理事件
            crop_canvas.onmousedown=handleMouseDown;
            crop_canvas.onmousemove=handleMouseMove;
            crop_canvas.onmouseup=handleMouseUp;
            crop_canvas.onmouseout=handleMouseOut;
            crop_canvas.onmousewheel=handleMouseWheel;
        };
        // put your image src here!
        temp_photo.src = rotated_photo.src;
    
    }, [file, rotate, size])
    
    function drawAll(){
        // 重設畫布
        crop_canvas_context.clearRect(0,0,crop_canvas_width,crop_canvas_height);

        // 讓圖片可以按原比例呈現
        var crop_image_width, crop_image_height;
        const crop_image_ratio = crop_image_parameters.width / crop_image_parameters.height;
        if (crop_image_ratio >= 1) {
            crop_image_width = crop_canvas_width * crop_image_parameters.size;
            crop_image_height = crop_canvas_height * crop_image_parameters.size / crop_image_ratio;
        } else {
            crop_image_width = crop_canvas_width * crop_image_parameters.size * crop_image_ratio;
            crop_image_height = crop_canvas_height * crop_image_parameters.size; 
        }
        const offsetX = (crop_canvas_width / 2) - (crop_image_width / 2);
        const offsetY = (crop_canvas_width / 2) - (crop_image_height / 2);
        crop_canvas_context.drawImage(crop_image_parameters.imageFile, 0, 0, crop_image_parameters.width, crop_image_parameters.height, 
            crop_image_parameters.x + offsetX, crop_image_parameters.y + offsetY, crop_image_width, crop_image_height);
        // 更新預覽畫面
        updatePreview();
        
        // 放上遮罩圖
        const maskImage = document.getElementById('maskImage');
        crop_canvas_context.globalAlpha = 0.7; // 設定透明度為 0.7
        crop_canvas_context.drawImage(maskImage, 0, 0, crop_canvas_width, crop_canvas_height);
        crop_canvas_context.globalAlpha = 1; // 設定透明度為 1
    }

    function handleMouseWheel(e) {
        if (!crop_image_parameters.imageFile) { return; }
        // 取消原事件處理
        e.preventDefault();
        e.stopPropagation();

        // 設定圖片縮放比例最大為 3.0 倍最小為 0.5 倍，每次調整 0.1 倍
        const max = 3.0;
        const step = 0.1;
        const min = 0.5;
        var value = e.deltaY < 0 ? Math.min(size + step, max) : Math.max(min, size - step);

        handleChangeSize(value);
    }
    
    // 處理圖片大小修改
    function handleChangeSize(value) {
        dispatch(SetData({size: value}));
    }

    // 處理圖片拖動（滑鼠按下）
    function handleMouseDown(e){
        // 取消原事件處理
        e.preventDefault();
        e.stopPropagation();
        // 計算目前鼠標位置
        startX=parseInt(e.clientX-offsetX);
        startY=parseInt(e.clientY-offsetY);

        if (crop_image_parameters.imageFile) {
            // 當鼠標在畫布中，設置為正在拖動
            is_dragging=true;
            return;
        }

    }
    // 處理圖片拖動（滑鼠移動）
    function handleMouseMove(e){
        // 如果不是在畫布中就取消處理
        if(!is_dragging){return;}
        // 取消原事件處理
        e.preventDefault();
        e.stopPropagation();
        // 計算目前鼠標位置
        var mouseX=parseInt(e.clientX-offsetX);
        var mouseY=parseInt(e.clientY-offsetY);
        // 計算鼠標移動距離
        var dx=mouseX-startX;
        var dy=mouseY-startY;

        // 移動畫布圖片
        handlePositionChange({x: dx, y: dy});
        crop_image_parameters.x+=dx;
        crop_image_parameters.y+=dy;
        
        drawAll();
        // 更新鼠標位置
        startX=mouseX;
        startY=mouseY;
    }
    // 更新圖片所在位置
    function handlePositionChange(data) {
        dispatch(PositionOffest(data));
    }

    // 處理圖片拖動（滑鼠放開）
    function handleMouseUp(e){
        // 如果不是在畫布中就取消處理
        if(!is_dragging){return;}
        // 取消原事件處理
        e.preventDefault();
        e.stopPropagation();
        // 放開滑鼠，結束拖動事件
        is_dragging=false;
    }

    // 處理圖片拖動（滑鼠放開）
    function handleMouseOut(e){
        // 如果不是在畫布中就取消處理
        if(!is_dragging){return;}
        // 取消原事件處理
        e.preventDefault();
        e.stopPropagation();
        // 放開滑鼠，結束拖動事件
        is_dragging=false;
    }

    return ( <>
        <div style={{width: '100%', height: '100%'}}>
            <img id="initialImage" alt="" src={`${file}`} hidden />
            <canvas id="processRotateCanvas" hidden />
            <img id="rotatedPhoto" alt="" hidden />
            <canvas id="cropCanvas" style={{width: '100%', height: '100%'}} />
            <img id="maskImage" alt="" src="./crop/face_outline_outside.png" hidden />
        </div>
    </>);
}
export default Crop;