import React, { useRef, useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import styles from "../css/PhotoCrop.module.css";
import { useSelector } from 'react-redux';
import { updatePreview } from './Preview';

const marks = [
    {
        value: 0.5,
        label: '50%'
    }, {
        value: 2.0,
        label: '200%'
    }
]

const Crop = props => {
    const data = useSelector(state => state.reducer);
    const file = data?.file;
    const [loading, setLoading] = useState(false);
    const [tSize, setTSize] = useState(1.0);

    useEffect(() => {
        setLoading(true);
    }, []);

    function handleChangeSize(e, value) {
        if (tSize !== value) {
            console.log(value);
            setTSize(value);
        }
    }

    useEffect(() => {
        // https://riptutorial.com/html5-canvas/example/18918/dragging-circles---rectangles-around-the-canvas
        // 解決：canvas圖片模糊
        // https://blog.csdn.net/felicity_zll/article/details/109193602
        // canvas related vars
        const canvas = document.getElementById('cropCanvas');
        const ctx = canvas.getContext("2d");
        canvas.width = 1200;
        canvas.height = 1200;
        const cw = canvas.width;
        const ch = canvas.height;
        // // 設定預設背景
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, cw, ch);
        
        // used to calc canvas position relative to window
        function reOffset(){
            var BB = canvas.getBoundingClientRect();
            offsetX = BB.left;
            offsetY = BB.top;        
        }
        var offsetX, offsetY;
        reOffset();
        window.onscroll = function(e){ reOffset(); }
        window.onresize = function(e){ reOffset(); }
        canvas.onresize = function(e){ reOffset(); }
    
        // save relevant information about shapes drawn on the canvas
        var shapes=[];
    
        // drag related vars
        var isDragging=false;
        var startX,startY;
    
        // hold the index of the shape being dragged (if any)
        var selectedShapeIndex;
    
        // 縮放比例
        var size = 1.0;
    
        // load the image
        const img = document.getElementById('crop');
        var photo = new Image();
        photo.onload=function(){
            const iWidth = img.width;
            const iHeight = img.height;
            // define one image and save it in the shapes[] array
            shapes.push( {x: 0, y: 0, width: iWidth, height: iHeight, image: photo} );
            // draw the shapes on the canvas
            drawAll();
            // listen for mouse events
            canvas.onmousedown=handleMouseDown;
            canvas.onmousemove=handleMouseMove;
            canvas.onmouseup=handleMouseUp;
            canvas.onmouseout=handleMouseOut;
        };
        // put your image src here!
        photo.src = img.src;
    
    
        // 已移除
        // given mouse X & Y (mx & my) and shape object
        // return true/false whether mouse is inside the shape
        function isMouseInShape(mx,my,shape){
            // is this shape an image?
            if(shape.image){
                // this is a rectangle
                var rLeft=shape.x;
                var rRight=shape.x+shape.width;
                var rTop=shape.y;
                var rBott=shape.y+shape.height;
                // math test to see if mouse is inside image
                if( mx>rLeft && mx<rRight && my>rTop && my<rBott){
                    return(true);
                }
            }
            // the mouse isn't in any of this shapes
            return(false);
        }
    
        function handleMouseDown(e){
            // tell the browser we're handling this event
            e.preventDefault();
            e.stopPropagation();
            // calculate the current mouse position
            startX=parseInt(e.clientX-offsetX);
            startY=parseInt(e.clientY-offsetY);

            // test mouse position against all shapes
            // post result if mouse is in a shape
            for(var i=0;i<shapes.length;i++){
                // if(isMouseInShape(startX,startY,shapes[i])){
                //     // the mouse is inside this shape
                //     // select this shape
                //     selectedShapeIndex=i;
                //     // set the isDragging flag
                //     isDragging=true;
                //     // and return (==stop looking for 
                //     //     further shapes under the mouse)
                //     return;
                // }
                if (shapes[i].image) {
                    // the mouse is inside this shape
                    // select this shape
                    selectedShapeIndex=0;
                    // set the isDragging flag
                    isDragging=true;
                    return;
                }
            }

        }
    
        function handleMouseUp(e){
            // return if we're not dragging
            if(!isDragging){return;}
            // tell the browser we're handling this event
            e.preventDefault();
            e.stopPropagation();
            // the drag is over -- clear the isDragging flag
            isDragging=false;
        }
    
        function handleMouseOut(e){
            // return if we're not dragging
            if(!isDragging){return;}
            // tell the browser we're handling this event
            e.preventDefault();
            e.stopPropagation();
            // the drag is over -- clear the isDragging flag
            isDragging=false;
        }
    
        function handleMouseMove(e){
            // return if we're not dragging
            if(!isDragging){return;}
            // tell the browser we're handling this event
            e.preventDefault();
            e.stopPropagation();
            // calculate the current mouse position         
            var mouseX=parseInt(e.clientX-offsetX);
            var mouseY=parseInt(e.clientY-offsetY);
            // how far has the mouse dragged from its previous mousemove position?
            var dx=mouseX-startX;
            var dy=mouseY-startY;
            // move the selected shape by the drag distance
            var selectedShape=shapes[selectedShapeIndex];
            selectedShape.x+=dx;
            selectedShape.y+=dy;
            // clear the canvas and redraw all shapes
            drawAll();
            // update the starting drag position (== the current mouse position)
            startX=mouseX;
            startY=mouseY;
        }
        canvas.addEventListener("mousewheel",function (e) {
            if (e.deltaY < 0) { // 滾輪放大
                for(var i = 0; i < shapes.length; i++){
                    if(shapes[i].image) {
                        const max = 2.0;
                        const step = 0.1;
                        size = Math.min(size + step, max);
                        setTSize(size);
                        // setSize(Math.min(size + step, max));
                    }
                }
            } else if (e.deltaY > 0) { // 滾輪縮小
                for(var i = 0; i < shapes.length; i++){
                    if(shapes[i].image) {
                        const min = 0.5;
                        const step = 0.1;
                        size = Math.max(min, size - step);
                        setTSize(size);
                        // setSize(Math.max(min, size - step));
                    }
                }
            }
            drawAll();
            // if (e.originalEvent.wheelDelta>0 && w<max_w){  // 向上滚动放大但不超出最大宽度
            //     w+=dw;v+=10;
            //     img.width(Math.max(w,mask_w));range.val(v);  //  设置滑动条联动
            //     checkArea(img);
            // }else if (e.originalEvent.wheelDelta<0 && w>min_w){  
            //     w-=dw;v-=10;
            //     img.width(Math.max(w,mask_w));range.val(v);
            //     checkArea(img);
            // }
        })
        // clear the canvas and 
        // redraw all shapes in their current positions
        function drawAll(){
            
            // 重設畫布
            ctx.clearRect(0,0,cw,ch);
    
            // 繪製圖形
            for(var i=0;i<shapes.length;i++){
                var shape=shapes[i];
                if(shape.image){
                    const ratio = shape.width / shape.height;
                    
                    // 讓圖片可以按原比例呈現
                    var width, height;
                    if (ratio >= 1) {
                        width = cw * size;
                        height = ch * size / ratio;
                    } else {
                        width = cw * size * ratio;
                        height = ch * size; 
                    }
                    const offsetX = (cw / 2) - (width / 2);
                    const offsetY = (cw / 2) - (height / 2);
                    ctx.drawImage(shape.image, 0, 0, shape.width, shape.height, 
                        shape.x + offsetX, shape.y + offsetY, width, height);
    
                } else if (shape.width) {
                    ctx.fillStyle = shape.color;
                    ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
                }
            }
            // 更新預覽畫面
            updatePreview();
            
            // 放上遮罩圖
            const mask = document.getElementById('mask');
            ctx.globalAlpha = 0.7; // 設定透明度為 0.7
            ctx.drawImage(mask, 0, 0, cw, ch);
    
            ctx.globalAlpha = 1; // 設定透明度為 1
        }
    }, [loading, file])
    
    
    return ( <>
        <div style={{width: '100%', height: '100%'}}>
            <img
            id="crop"
            className={styles.reviewCanvasIcon}
            alt=""
            src={`${file}`}
            hidden
            />
            <img
            id="mask"
            className={styles.mask}
            alt=""
            src="./face_outline_outside.png"
            hidden
            />
            <canvas
            id="cropCanvas" 
            className={styles.canvas}
            style={{width: '100%', height: '100%'}}
            {...props}
            />
        </div>
        <Slider
            defaultValue={1.0}
            step={0.1}
            min={0.5}
            max={2.0}
            value={tSize}
            valueLabelDisplay="auto"
            onChange={handleChangeSize}
            marks={marks}
            valueLabelFormat={(value) => {return `${(value * 100).toFixed(0)}%`}}
        />
    </>);
}
export default Crop;