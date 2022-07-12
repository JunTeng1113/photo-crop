import { Button } from "@mui/material";
import styles from "../css/PhotoCrop.module.css";

function Upload(props) {
    const token = 'eyJhbGciOiJIUzIEc9mz';
    const { userID } = props;
    // Upload
    const handleUpload = () => {
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
            method: 'POST',
            body: JSON.stringify(postData)
        })
        .then(data => {
            // 從資料庫下載圖片
            const link = document.createElement('a');
            link.download = `${userID}.png`;
            link.href = img;
            // link.click();
            
        
            // 顯示圖片
            document.getElementById('personal').src = img;
        })
        .catch(error => {
            console.error(error)
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