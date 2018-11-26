/**
 * 結果表示画面
 */
class ResultState extends StateBase {
    /** 赤まるおアイコン画像名 */
    static get MARUO_RED_ICON_NAME() {
        return "./img/maruo_red_3.png";
    }
    /** まるおアイコン画像名 */
    static get MARUO_ICON_NAME() {
        return "./img/maruo_3.png";
    }

    /**
     * コンストラクタ
     */
    constructor() {
        super();
    }

    /**
     * 初期化
     */
    init () {
        // 使用する画像を読み込む
        this.im.loadImage (
            () => {}
            , ResultState.MARUO_RED_ICON_NAME
            , ResultState.MARUO_ICON_NAME
        );
    }

    /**
     * 描画
     */
    draw() {
        // 赤まるおのアイコンを表示
        front.drawImage(
            this.im.imageMap.get(ResultState.MARUO_RED_ICON_NAME)
            , 200
            , 200
        );

        // まるおのアイコンを表示
        front.drawImage(
            this.im.imageMap.get(ResultState.MARUO_ICON_NAME)
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