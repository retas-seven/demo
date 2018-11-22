/**
 * キャラクタを管理するクラス
 */
class CharacterManager {
    /**
     * 初期化
     */
    constructor() {
        // ステートに登場するキャラクタを管理する配列
        this.characterList = [];
        // ステートで使用するイメージを格納するMap
        this.characterImageMap = new Map();

        this.useImageCnt = 0;
        this.loadCompleteImageCnt = 0;
        this.isLoadImgComplete = false;
    }

    /**
     * 使用するイメージを読み込む
     */
    loadImage(callback, ...imgNameAry) {
        let allImgAry = [];
        let uniqueImgAry = [];

        for (let IndividualImgNameAry of imgNameAry) {
            allImgAry.push(...IndividualImgNameAry);
        }

        uniqueImgAry = Array.from(new Set(allImgAry));
        this.useImageCnt = uniqueImgAry.length;

        for (let imgName of uniqueImgAry) {
            let img = new Image() ;
            img.onload = () => {
                this.loadCompleteImageCnt++;
                console.log("loadCompleteImageCnt:" + this.loadCompleteImageCnt);

                if (this.loadCompleteImageCnt == this.useImageCnt) {
                    this.isLoadImgComplete = true;
                    console.log("isLoadImgComplete:" + this.isLoadImgComplete);
                    callback();
                }
            };
            img.src = imgName;
            this.characterImageMap.set(imgName, img);
        }
    }

    /**
     * キャラクタを追加する
     */
    add(character) {
        this.characterList.push(character);
    }

    /**
     * キャラクタを描画する
     */
    draw() {
        // キャラクタを描画する
        for (let c of this.characterList) {
            c.draw();
        }
    }

    /**
     * キャラクタごとの処理を実行する
     */
    run() {
        // 左クリックイベントの処理
        if (mouse.isLeft) {
            for (let c of this.characterList) {
                if (c.clickEnable && c.x <= mouse.x && mouse.x <= (c.x + c.width) && c.y <= mouse.y && mouse.y <= (c.y + c.height)) {
                    c.leftClick();
                }
            }
        }

        // 右クリックイベントの処理
        if (mouse.isRight) {
            for (let c of this.characterList) {
                if (c.clickEnable && c.x <= mouse.x && mouse.x <= (c.x + c.width) && c.y <= mouse.y && mouse.y <= (c.y + c.height)) {
                    c.rightClick();
                }
            }
        }

        // キャラクタを動かす
        for (let i = 0; i < this.characterList.length; i++) {
            this.characterList[i].run();

            // 終了フラグが立っている場合は配列から取り除く
            if (this.characterList[i].isEnd) {
                this.characterList.splice(i, 1);
                i--;
            }
        }
    }
}