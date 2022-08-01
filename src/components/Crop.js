import React, { useRef, useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import styles from "../css/PhotoCrop.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { updatePreview } from './Preview';
import { Set } from "../actions/Set.js";
import { Increment } from "../actions/Increment.js";

const Crop = props => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.reducer);
    const x = data?.x;
    const y = data?.y;
    const file = data?.file;
    const size = data?.size;
    const rotate = data?.rotate;

    var offsetX=0, offsetY=0;
    var shape= {x: x, y: y, image: file, rotate: rotate, size: size};
    var isDragging=false;
    var startX,startY;
    
    var canvas;
    var ctx;
    var cw, ch;

    useEffect(() => {
        canvas = document.getElementById('cropCanvas');
        // used to calc canvas position relative to window
        function reOffset(){
            var BB = canvas.getBoundingClientRect();
            offsetX = BB.left;
            offsetY = BB.top;    
        }
        reOffset();
        window.onscroll = function(e){ reOffset(); }
        window.onresize = function(e){ reOffset(); }
        canvas.onresize = function(e){ reOffset(); }
    }, []);


    useEffect(() => {
        if (file === null) { return; }
        const imageCanvas = document.getElementById('imageCanvas');
        const ctx1 = imageCanvas.getContext('2d');
        const crop1 = document.getElementById('crop'); // 取得原始圖片
        imageCanvas.width = 1200;
        imageCanvas.height = 1200;
        cw = imageCanvas.width;
        ch = imageCanvas.height;

        // 讓圖片可以按原比例呈現
        const ratio = crop1.width / crop1.height;
        var width, height;
        if (ratio >= 1) {
            width = cw;
            height = ch / ratio;
        } else {
            width = cw * ratio;
            height = ch;
        }
        const offsetX = (cw / 2) - (width / 2);
        const offsetY = (cw / 2) - (height / 2);

        // 將圖片旋轉
        ctx1.save();
        ctx1.translate(imageCanvas.width / 2, imageCanvas.height / 2);
        ctx1.rotate(rotate * Math.PI / 180);
        ctx1.translate(-(imageCanvas.width / 2), -(imageCanvas.height / 2));
        // ctx1.drawImage(crop1, 0, 0, imageCanvas.width, imageCanvas.height);
        ctx1.drawImage(crop1, 0, 0, crop1.width, crop1.height, 
            offsetX, offsetY, width, height);
        ctx1.restore();

        // 旋轉後的原始圖片
        const crop2 = document.getElementById('crop2');
        crop2.src = imageCanvas.toDataURL('image/png');
    }, [file, rotate]);

    useEffect(() => {
        canvas = document.getElementById('cropCanvas');
        ctx = canvas.getContext("2d");
        canvas.width = 1200;
        canvas.height = 1200;
        cw = canvas.width;
        ch = canvas.height;
        // https://riptutorial.com/html5-canvas/example/18918/dragging-circles---rectangles-around-the-canvas
        // 解決：canvas圖片模糊
        // https://blog.csdn.net/felicity_zll/article/details/109193602

        // // 設定預設背景
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, cw, ch);
        // load the image
        const img = document.getElementById('crop2');
        var photo = new Image();
        photo.onload=function(){

            const iWidth = img.width;
            const iHeight = img.height;
            
            shape = {x: x, y: y, width: iWidth, height: iHeight, image: photo, rotate: rotate, size: size};
            
            drawAll();
            // listen for mouse events
            canvas.onmousedown=handleMouseDown;
            canvas.onmousemove=handleMouseMove;
            canvas.onmouseup=handleMouseUp;
            canvas.onmouseout=handleMouseOut;
            canvas.onmousewheel=handleMouseWheel;
        };
        // put your image src here!
        photo.src = img.src;
    
    }, [file, rotate, size])
    
    function drawAll(){
        // 重設畫布
        ctx.clearRect(0,0,cw,ch);

        // 繪製圖形
        const ratio = shape.width / shape.height;
                
        // 讓圖片可以按原比例呈現
        var width, height;
        if (ratio >= 1) {
            width = cw * shape.size;
            height = ch * shape.size / ratio;
        } else {
            width = cw * shape.size * ratio;
            height = ch * shape.size; 
        }
        const offsetX = (cw / 2) - (width / 2);
        const offsetY = (cw / 2) - (height / 2);
        ctx.drawImage(shape.image, 0, 0, shape.width, shape.height, 
            shape.x + offsetX, shape.y + offsetY, width, height);
        // 更新預覽畫面
        updatePreview();
        
        // 放上遮罩圖
        const mask = document.getElementById('mask');
        ctx.globalAlpha = 0.7; // 設定透明度為 0.7
        ctx.drawImage(mask, 0, 0, cw, ch);

        ctx.globalAlpha = 1; // 設定透明度為 1
    }

    function handleMouseWheel(e) {
        if (!shape.image) { return; }
        // 取消原事件處理
        e.preventDefault();
        e.stopPropagation();

        const max = 3.0;
        const step = 0.1;
        const min = 0.5;
        var value = e.deltaY < 0 ? Math.min(size + step, max) : Math.max(min, size - step);

        handleChangeSize(value);
    }
    
    function handleChangeSize(value) {
        dispatch(Set({size: value}));
    }

    function handleMouseDown(e){
        // 取消原事件處理
        e.preventDefault();
        e.stopPropagation();
        // 計算目前鼠標位置
        startX=parseInt(e.clientX-offsetX);
        startY=parseInt(e.clientY-offsetY);

        if (shape.image) {
            // 當鼠標在畫布中，設置為正在拖動
            isDragging=true;
            return;
        }

    }
    
    function handleMouseMove(e){
        // 如果不是在畫布中就取消處理
        if(!isDragging){return;}
        // 取消原事件處理
        e.preventDefault();
        e.stopPropagation();
        // 計算目前鼠標位置
        var mouseX=parseInt(e.clientX-offsetX);
        var mouseY=parseInt(e.clientY-offsetY);
        // how far has the mouse dragged from its previous mousemove position?
        var dx=mouseX-startX;
        var dy=mouseY-startY;

        handlePositionChange({x: dx, y: dy});
        shape.x+=dx;
        shape.y+=dy;
        
        drawAll();
        // update the starting drag position (== the current mouse position)
        startX=mouseX;
        startY=mouseY;
    }
    function handlePositionChange(data) {
        dispatch(Increment(data));
    }

    function handleMouseUp(e){
        // 如果不是在畫布中就取消處理
        if(!isDragging){return;}
        // 取消原事件處理
        e.preventDefault();
        e.stopPropagation();
        // 放開滑鼠，結束拖動事件
        isDragging=false;
    }

    function handleMouseOut(e){
        // 如果不是在畫布中就取消處理
        if(!isDragging){return;}
        // 取消原事件處理
        e.preventDefault();
        e.stopPropagation();
        // 放開滑鼠，結束拖動事件
        isDragging=false;
    }

    return ( <>
        <div style={{width: '100%', height: '100%'}}>
            <img
            id="crop"
            alt=""
            src={`${file}`}
            hidden
            />
            <img
            id="mask"
            alt=""
            src="./crop/face_outline_outside.png"
            hidden
            />
            <canvas
            id="cropCanvas" 
            style={{width: '100%', height: '100%'}}
            {...props}
            />
            <canvas
            id="imageCanvas" 
            hidden
            />
            <img
            id="crop2"
            alt=""
            hidden
            />
        </div>
    </>);
}
export default Crop;