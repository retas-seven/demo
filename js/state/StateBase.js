/**
 * ステートの基底クラス
 */
class StateBase {
    /**
     * 初期化
     */
    constructor() {
        this.cm = new CharacterManager();
        this._isChangeStateEnd = false;
        this.isReady = false;
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
}