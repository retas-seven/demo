/**
 * サンプル画面（円）
 */
class CircleState extends StateBase {
    constructor() {
        super();
    }

    /**
     * 初期化
     */
    init () {
        console.log("CircleState.init");
        
        // 描画する円を作成
        this.cm.add(new Circle(0, 0, 6, 2, 50, "rgb(0, 255, 128)"));
        this.cm.add(new Circle(350, 350, -3, -7, 50, "rgb(0, 200, 255)"));
        this.cm.add(new Circle(150, 250, 7, 3, 50, "rgb(255, 200, 0)"));

        // 背景色を設定
        back.fillStyle = 'rgb(100, 100, 0)';
        back.fillRect(0, 0, WIDTH, HEIGHT);
    }

    /**
     * 描画
     */
    draw() {
        this.cm.draw();
    }

    /**
     * 状態を更新
     */
    run() {
        this.cm.run();

        if (mouse.isRight) {
            this.changeState("CircleState");
        }

        if (this.cm.characterList.length == 0) {
            this.changeState("RectState");
        }

        if (mouse.isLeft) {
            console.log("CircleState　左クリック");
        }

        if (mouse.isRight) {
            console.log("CircleState　右クリック");
        }
    }
}