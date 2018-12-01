/**
 * キャラクタの基底クラス
 */
class CharacterBase {
    /**
     * 初期化
     */
    constructor(x = 0, y = 0, width = 0, height = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isEnd = false;
        this.clickEnable = true;
        this.elapseFrm = 0;
    }

    // 以下、派生クラスにて必要に応じてオーバーライドするメソッド
    draw() {}
    run() {}
    leftClick() {}
    rightClick() {}
    destroyProcess() {}
}