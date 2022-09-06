import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import getCropImage from '../functions/getCropImage.js';

const IndexPage = props => {
    const editedFace = localStorage.getItem('editedFace');
    useEffect(() => {
        const testCanvas = document.getElementById("testCanvas");
        testCanvas.width = 1200;
        testCanvas.height = 1200;
        const testContext = testCanvas.getContext("2d");
        
        // 等待讀取完成 editedFace 後，將圖片繪製到 canvas
        var img = new Image();
        img.onload = function() {
            testContext.drawImage(img, 0, 0);
        }
        img.src = editedFace;
        getCropImage('https://toysrbooks.com/character/721a7584aa61ff961ad429993662ae30.png');
    }, [editedFace])

    return (<>
        <Link to="/crop/1">Goto PhotoCrop</Link><br />
        <img id="testImg" src={editedFace} alt='' />
        <canvas id="testCanvas"/>
        <div id='workpoint'>
            <canvas id='workCanvas'></canvas>
        </div>
    </>);
}
export { IndexPage };