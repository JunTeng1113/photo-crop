import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePreview } from './Preview';
import { SetData } from "../actions/SetData.js";
import { PositionOffest } from "../actions/PositionOffest.js";
import { fabric } from 'fabric';

const Crop = props => {
    const data = useSelector(state => state.reducer);
    const file = data?.file;
    
    useEffect(() => {
        // 將 canvas 傳入
        const fabricCanvas = new fabric.Canvas('cropCanvas');
        fabricCanvas.clear();
        const width = document.getElementById('cropContainer').offsetWidth;
        const height = document.getElementById('cropContainer').offsetHeight;
        fabricCanvas.setWidth(width);
        fabricCanvas.setHeight(height);
        // 從 url 讀取圖片
        fabric.Image.fromURL(file, img => {
            const image = img.set({
            // 這邊可以設定上下左右距離、角度、寬高等等
                // left: 150,
                // top: 150
                // angle: 15,
                // width: 500,
                // height: 500
            })
            // 將圖片縮放到寬高
            image.scaleToWidth(width-10);
            image.scaleToHeight(height-10);
            // 記得要加進入才會顯示
            fabricCanvas.add(image);
            fabricCanvas.renderAll();
        })
    }, [file])

    return ( <>
        <div id='cropContainer' style={{width: '100%', height: '100%'}}>
            <img id="initialImage" alt="" src={`${file}`} hidden />
            <canvas id="processRotateCanvas" hidden />
            <img id="rotatedPhoto" alt="" hidden />
            <canvas id="cropCanvas" style={{width: '100%', height: '100%'}} />
            <img id="maskImage" alt="" src="./crop/face_outline_outside.png" hidden />
        </div>
    </>);
}
export default Crop;