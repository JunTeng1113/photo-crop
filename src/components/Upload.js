import { Button } from "@mui/material";
import styles from "../css/PhotoCrop.module.css";

function Upload(props) {
    const token = 'eyJhbGciOiJIUzIEc9mz';
    const { userID } = props;
    // Upload
    const handleUpload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 1200;
        canvas.height = 1200;

        const pCanvas = document.getElementById('preview');
        context.drawImage(pCanvas, 0, 0);
    
        const mask = document.getElementById('mask2');
        context.globalCompositeOperation = "destination-out";
        context.globalAlpha = 1; // 設定透明度
        context.drawImage(mask, 0, 0); // 遮罩

        const resultImage = canvas.toDataURL('image/png');

        // 儲存至資料庫
        const postData  = new FormData();
        postData.append('token', token);
        postData.append('user_id', userID);
        postData.append('personal_photo', resultImage); // base64

        //無法通過CORS https://blog.huli.tw/2021/02/19/cors-guide-3/
        fetch('https://toysrbooks.com/dev/v0.1/uploadPhotoData.php', {
            body: postData, // must match 'Content-Type' header
            // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin', // include, same-origin, *omit
            headers: {
                // 'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'multipart/form-data'
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            // mode: 'cors', // no-cors, cors, *same-origin
            // redirect: 'follow', // manual, *follow, error
            // referrer: 'no-referrer', // *client, no-referrer
        })
        .then(data => {
            // 從資料庫下載圖片
            const link = document.createElement('a');
            link.download = `${userID}.png`;
            link.href = resultImage;
            // link.click();
            
            console.log(data);
        
            // 顯示圖片
            // document.getElementById('personal').src = resultImage;
        })
        .catch(error => {
            console.error(error)
            console.log(postData);
        });
        document.getElementById('personal').src = resultImage;
    }
    return (
        <Button
            className={`${styles['button']} ${styles['bg-dark']} ${styles['color-white']}`}
            variant="contained"
            onClick={handleUpload}
        >
            Upload
        </Button>
    )
}
export default Upload;