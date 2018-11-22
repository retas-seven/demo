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
    }

    draw() {
        
    }

    run() {

    }

    leftClick() {

    }

    rightClick() {

    }

    destroyProcess() {

    }
}