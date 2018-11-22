/**
 * 結果表示画面
 */
class ResultState extends StateBase {
    constructor() {
        super();
    	this.loadCompleteImgCnt = 0;
    	this.iconImg = {
    		maruoImg: new Image()
    		, maruoRedImg: new Image()
    	}
    }

    /**
     * 初期化
     */
    init () {
        // 使用画像を読み込む
		for (let img of Object.values(this.iconImg)) {
			img.onload = () => {
				this.loadCompleteImgCnt++;
	            if (this.loadCompleteImgCnt == Object.keys(this.iconImg).length) {
	                this.isReady = true;
	            }
			}
		}
    	
        this.iconImg.maruoImg.src = "./img/maruo_3.png";
        this.iconImg.maruoRedImg.src = "./img/maruo_red_3.png";
    }

    /**
     * 描画
     */
    draw() {
        // 赤まるおのアイコンを表示
        front.drawImage(
            this.iconImg.maruoRedImg
            , 200
            , 200
        );

        // まるおのアイコンを表示
        front.drawImage(
            this.iconImg.maruoImg
            , 400
            , 200
        );
        
        // 結果を表示 
        // TODO:文字の中央寄せ
    	front.font = "bold 50px 'Arial'";
        front.fillStyle = "#ffffff";
        front.fillText("RESULT", 265, 140);
        front.font = "bold 25px 'Arial'";
        front.fillText(":", 280, 231);
        front.fillText(":", 480, 231);
        front.fillText(shareData.maruoRedDestroyCnt, 315, 233);
        front.fillText(shareData.maruoDestroyCnt, 515, 233);

        front.font = "bold 17px 'Arial'";
        front.fillText("left click - RETRY", 60,370);
        front.fillText("right click - TITLE", 515,370);
    }

    /**
     * 状態を更新
     */
    run() {
        if (mouse.isLeft) {
            this.changeState("CharacterState");
        }
        if (mouse.isRight) {
            this.changeState("TitleState");
        }
    }
}