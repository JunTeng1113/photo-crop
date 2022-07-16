import { Button } from "@mui/material";
import styles from "../css/PhotoCrop.module.css";

function Upload(props) {
    const token = 'eyJhbGciOiJIUzIEc9mz';
    const { userID } = props;
    // Upload
    const handleUpload = () => {
        const newCanvas = document.createElement('canvas');
        const newContext = newCanvas.getContext('2d');
        const previewCanvas = document.getElementById('preview');
        newContext.drawImage(previewCanvas, 0, 0);
        
        const canvas = document.getElementById('preview');
        const context = canvas.getContext('2d')
        const image = document.getElementById('mask2');
    
        context.globalCompositeOperation = "destination-out";
        context.globalAlpha = 1; // 設定透明度
        context.drawImage(image, 0, 0); // 遮罩
        const img = canvas.toDataURL('image/png');
        
        // 填上背景
        context.globalCompositeOperation = "destination-over";
        context.fillStyle = "rgba(0, 0, 0, 0.5)";
        context.fillRect(0, 0, canvas.width, canvas.height);
                
    
        // 儲存至資料庫
        const postData = {
            token: token,
            user_id: userID,
            personal_photo: img, // base64
        }

        //無法通過CORS https://blog.huli.tw/2021/02/19/cors-guide-3/
        fetch('https://toysrbooks.com/dev/v0.1/uploadPhotoData.php', {
            body: JSON.stringify(postData), // must match 'Content-Type' header
            // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin', // include, same-origin, *omit
            // headers: {
            //     'user-agent': 'Mozilla/4.0 MDN Example',
            //     'content-type': 'application/json'
            // },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            // mode: 'cors', // no-cors, cors, *same-origin
            // redirect: 'follow', // manual, *follow, error
            // referrer: 'no-referrer', // *client, no-referrer
        })
        .then(data => {
            // 從資料庫下載圖片
            const link = document.createElement('a');
            link.download = `${userID}.png`;
            link.href = img;
            // link.click();
            
            console.log(data);
        
            // 顯示圖片
            document.getElementById('personal').src = img;
        })
        .catch(error => {
            console.error(error)
            console.log(postData);
        });
    }
    return (
        <Button
            className={styles.buttonDark}
            sx={{ width: 180 }}
            variant="contained"
            onClick={handleUpload}
        >
            Upload
        </Button>
    )
}
export default Upload;