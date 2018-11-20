/**
 * マウスイベントハンドラクラス
 */
class Mouse {
    /**
     * 初期化
     */
    constructor() {
        // 外部公開用変数
        this.x = 0;
        this.y = 0;
        this.isLeft = false;
        this.isRight = false;

        // 内部用変数
        this._x = 0;
        this._y = 0;
        this._isLeft = false;
        this._isRight = false;
    }

    /**
     * 左クリックイベントハンドラ
     */
    leftClick(e) {
        mouse._x = e.offsetX;
        mouse._y = e.offsetY;
        mouse._isLeft = true;
        console.log(mouse._x + ", " + mouse._y);
    }

    /**
     * 右クリックイベントハンドラ
     */
    rightClick(e) {
        mouse._x = e.offsetX;
        mouse._y = e.offsetY;
        mouse._isRight = true;
    }

    /**
     * 検知したマウスイベントを外部公開用の変数に設定
     */
    update() {
        this.x = this._x;
        this.y = this._y;
        this.isLeft = this._isLeft;
        this.isRight = this._isRight;
    }

    /**
     * 検知したマウスイベントを無効化（検知したマウスイベントをを次のフレームに持ち越さない）
     */
    reset() {
        if (this.isLeft) {
            this.isLeft = false;
            this._isLeft = false;
        }
        if (this.isRight) {
            this.isRight = false;
            this._isRight = false;
        }
    }
}