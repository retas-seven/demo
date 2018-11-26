/**
 * サンプル画面（四角）
 */
class RectState extends StateBase {
    constructor() {
        super();
        //this.init();
    }

    /**
     * 初期化
     */
    init () {
        console.log("RectState.init");

        /** 描画する四角を作成 */
        this._rects = [];
        this._rects.push({x: 150, y: 150, dx: 3, dy: 1, width: 100, height: 100, color: "rgb(255, 255, 128)", boundCnt: 0});
        this._rects.push({x: 350, y: 350, dx: -1, dy: -3, width: 100, height: 100, color: "rgb(128, 200, 255)", boundCnt: 0});

        // 背景色を設定
        back.fillStyle = 'rgb(0, 100, 100)';
        back.fillRect(0, 0, WIDTH, HEIGHT);
    }

    /**
     * 描画
     */
    draw() {
        for (let o of this._rects) {
            front.beginPath();
            front.fillStyle = o.color;
            front.fillRect(o.x, o.y, o.width, o.height);
            front.fill();
        }
    }

    /**
     * 状態を更新
     */
    run() {
        for(let o of this._rects) {
            o.x = o.x + o.dx;
            o.y = o.y + o.dy;

            if (WIDTH < o.x) {
                o.x = WIDTH;
                o.dx = -o.dx;
                o.boundCnt++;
            } else if (o.x < 0) {
                o.x = 0;
                o.dx = -o.dx;
                o.boundCnt++;
            }
            if (HEIGHT < o.y) {
                o.y = HEIGHT;
                o.dy = -o.dy;
                o.boundCnt++;
            } else if (o.y < 0) {
                o.y = 0;
                o.dy = -o.dy;
                o.boundCnt++;
            }

            // 既定の回数バウンドしたら画面を切り替える
            if (2 == o.boundCnt) {
                // console.log("RectState:State変更");
                this.changeState("CharacterState");
            }
        }

        if (mouse.isLeft) {
            console.log("RectState　左クリック");
            this._rects[0].dx = -this._rects[0].dx;
            this._rects[0].dy = -this._rects[0].dy;
        }
        if (mouse.isRight) {
            console.log("RectState　右クリック");
            this._rects[1].dx = -this._rects[1].dx;
            this._rects[1].dy = -this._rects[1].dy;
        }

    }
}