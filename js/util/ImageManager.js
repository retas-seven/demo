/**
 * イメージを管理するクラス
 */
class ImageManager {
    /**
     * 初期化
     */
    constructor() {
        // ステートで使用するイメージを格納するMap
        this.imageMap = new Map();
        
        this.useImageCnt = 0;
        this.loadCompleteImageCnt = 0;
        this.isLoadImgComplete = true;
    }

    /**
     * 使用するイメージを読み込む
     */
    loadImage(callback, ...imgName) {
        let allImgAry = [];
        let uniqueImgAry = [];
        this.isLoadImgComplete = false;

        for (let IndividualImgName of imgName) {
            if (Array.isArray(IndividualImgName)) {
                allImgAry.push(...IndividualImgName);
            } else {
                allImgAry.push(IndividualImgName);
            }
        }

        uniqueImgAry = Array.from(new Set(allImgAry));
        this.useImageCnt = uniqueImgAry.length;

        for (let imgName of uniqueImgAry) {
            let img = new Image() ;
            img.onload = () => {
                this.loadCompleteImageCnt++;
                console.log("loadCompleteImageCnt:" + this.loadCompleteImageCnt);

                if (this.loadCompleteImageCnt == this.useImageCnt) {
                    callback();
                    this.isLoadImgComplete = true;
                    console.log("isLoadImgComplete:" + this.isLoadImgComplete);
                }
            };
            img.src = imgName;
            this.imageMap.set(imgName, img);
        }
    }
}