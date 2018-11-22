/**
 * キャラクタ
 */
class Maruo extends CharacterBase {
    /** 使用する画像名（通常） */
    static get IMAGE_NAME() {
        return ["./img/maruo_1.png", "./img/maruo_2.png", "./img/maruo_3.png"];
    }
    /** 使用する画像名（やられ） */
    static get EXPLOSION_IMAGE_NAME() {
        return ["./img/maruo_yarare.png"];
    }
    /** １つの画像を表示するフレーム数 */
    static get DRAW_FRAME() {
        return 4;
    }
    /** キャラクタの横幅 */
    static get WIDTH() {
        return 50;
    }
    /** キャラクタの高さ */
    static get HEIGHT() {
        return 50;
    }
    /** 状態：通常 */
    static get STATUS_NORMAL() {
        return 1;
    }
    /** 状態：やられ */
    static get STATUS_DESTROY() {
        return 2;
    }
    /** やられ状態の表示フレーム数 */
    static get DESTROY_FRAME() {
        return 8;
    }

    /**
     * 初期化
     */
    constructor(x, y, dx, dy) {
        super(x, y, Maruo.WIDTH, Maruo.HEIGHT);
        this.dx = dx;
        this.dy = dy;
        this.boundCnt = 0;
        this.imgIndex = 0;
        this.frameCnt = 0;
        this.status = Maruo.STATUS_NORMAL;
        this.isReachedLeftEnd = false;
        this.destroyFrameCnt = 0;
    }

    /**
     * キャラクタの状態更新
     */
    run() {
        if (Maruo.STATUS_NORMAL == this.status) {
            this.runNormal();
        } else if (Maruo.STATUS_DESTROY == this.status) {
            this.runExplosion();
        }
    }

    /**
     * 通常状態の状態更新
     */
    runNormal() {
        this.x += this.dx;
        this.y += this.dy;

        if ((WIDTH - this.width) < this.x) {
            if (this.isReachedLeftEnd) {
                this.x = (WIDTH - this.width);
                this.dx = -this.dx;
                this.boundCnt++;
            }
        } else if (this.x < 0) {
            this.x = 0;
            this.dx = -this.dx;
            this.boundCnt++;
            if (!this.isReachedLeftEnd) {
                this.isReachedLeftEnd = true;
            }
        }
        if ((HEIGHT - this.height) < this.y) {
            this.y = (HEIGHT - this.height);
            this.dy = -this.dy;
            this.boundCnt++;
        } else if (this.y < 0) {
            this.y = 0;
            this.dy = -this.dy;
            this.boundCnt++;
        }

        // 規定回数バウンドしたらキャラクタの終了フラグを立てる
        if (8 <= this.boundCnt) {
            this.isEnd = true;
        }

        // 描画する画像のインデックス調整
        this.imgIndex = Math.floor((this.frameCnt % (Maruo.IMAGE_NAME.length * Maruo.DRAW_FRAME)) / Maruo.DRAW_FRAME);

        this.frameCnt++;
    }

    /**
     * やられ状態の状態更新
     */
    runExplosion() {
        if (Maruo.DESTROY_FRAME <= this.destroyFrameCnt) {
            this.isEnd = true;
        } else {
            this.destroyFrameCnt++;
            this.x++;
            this.y--;
        }
    }

    /**
     * 描画
     */
    draw() {
        if (Maruo.STATUS_NORMAL == this.status) {
            front.drawImage(
                state.cm.characterImageMap.get(Maruo.IMAGE_NAME[this.imgIndex])
                , this.x
                , this.y
            );
        } else if (Maruo.STATUS_DESTROY == this.status) {
            front.drawImage(
                state.cm.characterImageMap.get(Maruo.EXPLOSION_IMAGE_NAME[0])
                , this.x
                , this.y
            );
        }

    }

    /**
     * 左クリック時の処理
     */
    leftClick() {
        this.status = Maruo.STATUS_DESTROY;
        this.clickEnable = false;
        this.destroyProcess();
    }
}