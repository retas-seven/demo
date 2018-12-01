/**
 * ステートの基底クラス
 */
class StateBase {
    /**
     * 初期化
     */
    constructor() {
    	back.clearRect(0, 0, WIDTH, HEIGHT);
        this.cm = new CharacterManager();
        this.im = new ImageManager();
        this._isChangeStateEnd = false;
    }

    changeState(stateName) {
        if (!this._isChangeStateEnd) {

            blackFadeIn(() => {
                let nextState = eval("new " + stateName + "();");
                nextState.init();
                state = nextState;
            });

            this._isChangeStateEnd = true;
        }
    }

    baseRun() {
        this.cm.run();
        this.run();
    }

    baseScheduleCheck() {
        this.cm.scheduleCheck();
    }

    baseDraw() {
        this.cm.draw();
        this.draw();
    }

    baseAfterProcess() {
        this.cm.updateElapseFrm();
    }

    // 以下、派生クラスにて必要に応じてオーバーライドするメソッド
    draw() {}
    run() {}
}