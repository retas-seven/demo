/**
 * キャラクタを管理するクラス
 */
class CharacterManager {
    /**
     * 初期化
     */
    constructor() {
        // スケジュールリスト（キャラクタを画面に登場させるスケジュールを管理する配列）
        this.scheduleList = [];
        // キャラクタリスト（画面に登場するキャラクタを管理する配列）
        this.characterList = [];
    }

    /**
     * キャラクタを追加する
     */
    add(character) {
        this.scheduleList.push(
            new Schedule(0, character)
        )
    }

    /**
     * キャラクタを追加する
     */
    addSchedule(standByFrm, character) {
        this.scheduleList.push(
            new Schedule(standByFrm, character)
        )
    }

    /**
     * キャラクタの残存チェック
     */
    isEmpty() {
        if(this.scheduleList.length == 0 && this.characterList.length == 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * キャラクタごとの処理を実行する
     */
    run() {
        // 左クリックイベントの処理
        if (mouse.isLeft) {
            for (let c of this.characterList) {
                if (c.clickEnable && c.x <= mouse.x && mouse.x <= (c.x + c.width) && c.y <= mouse.y && mouse.y <= (c.y + c.height)) {
                    c.leftClick();
                }
            }
        }

        // 右クリックイベントの処理
        if (mouse.isRight) {
            for (let c of this.characterList) {
                if (c.clickEnable && c.x <= mouse.x && mouse.x <= (c.x + c.width) && c.y <= mouse.y && mouse.y <= (c.y + c.height)) {
                    c.rightClick();
                }
            }
        }

        // キャラクタを動かす
        for (let i = 0; i < this.characterList.length; i++) {
            this.characterList[i].run();

            if (this.characterList[i].isEnd) {
                // 終了フラグが立っている場合は配列から取り除く
                this.characterList.splice(i, 1);
                i--;
            }
        }
    }

    /**
     * 待機フレームが０になったキャラクタをキャラクタリストに移動
     */
    scheduleCheck() {
        let tmpSchedule;

        for (let i = 0; i < this.scheduleList.length; i++) {
            tmpSchedule = this.scheduleList[i];

            if (tmpSchedule.standByFrm <= 0) {
                // 待機フレームが０になったキャラクタをキャラクタリストに移動
                this.scheduleList.splice(i, 1);
                i--;
                this.characterList.push(tmpSchedule.character);

            } else {
                tmpSchedule.standByFrm--;
            }
        }
    }

    /**
     * キャラクタを描画する
     */
    draw() {
        // キャラクタを描画する
        for (let c of this.characterList) {
            c.draw();
        }
    }

    /**
     * 経過フレームを更新
     * 描画回数と経過フレームが同じになるように調整する
     */
    updateElapseFrm() {
        for (let c of this.characterList) {
            c.elapseFrm++;
        }
    }
}