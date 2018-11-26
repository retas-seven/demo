/**
 * タイトル画面
 */
class TitleState extends StateBase {
    constructor() {
        super();
    }

    /**
     * 初期化
     */
    init () {
        // 背景色を設定
        back.fillStyle = 'rgb(10, 10, 60)';
        back.fillRect(0, 0, WIDTH, HEIGHT);
    }

    /**
     * 描画
     */
    draw() {
        // TODO:文字の中央寄せ
        front.font = "bold 50px 'Arial'";
        front.fillStyle = "#ffffff";
        front.fillText("MARUO Shooting", 155,200);
        front.font = "bold 17px 'Arial'";
        front.fillText("mouse click", 315,350);
    }

    /**
     * 状態を更新
     */
    run() {
        if (mouse.isLeft || mouse.isRight) {
            this.changeState("CharacterState");
        }
    }
}