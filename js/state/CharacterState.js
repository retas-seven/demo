/**
 * ゲーム画面
 */
class CharacterState extends StateBase {
    /** 背景画像名 */
    static get BG_NAME() {
        return "./img/bg01.jpg";
    }

    /**
     * コンストラクタ
     */
    constructor() {
        super();
    }

    /**
     * 初期化
     */
    init () {
        // 共有データのまるおは回数をリセット
        shareData.maruoDestroyCnt = 0;
        shareData.maruoRedDestroyCnt = 0;

        // 使用する画像を読み込む
        this.im.loadImage (
            () => {
                // イメージ読み込み後、背景を描画
                back.drawImage(this.im.imageMap.get(CharacterState.BG_NAME), 0, 0);
            }
            , Maruo.NORMAL_IMAGE_NAME
            , Maruo.DESTROY_IMAGE_NAME
            , MaruoRed.NORMAL_IMAGE_NAME
            , MaruoRed.DESTROY_IMAGE_NAME
            , CharacterState.BG_NAME
        );
        
        // 赤まるおを生成
        for (let i = 0; i < 35; i++) {
            let maruoRed = new MaruoRed(
                Math.random() * 1000 + WIDTH 
                , Math.random() * HEIGHT - MaruoRed.HEIGHT
                , Math.random() * -7 - 4
                , Math.random() * -7 - 4
            );

            maruoRed.destroyProcess = () => {
                shareData.maruoRedDestroyCnt++;
            }
            
            this.cm.add(maruoRed);
        }

        // まるおを生成
        for (let i = 0; i < 45; i++) {
            let maruo = new Maruo(
                Math.random() * 1000 + WIDTH 
                , Math.random() * HEIGHT - Maruo.HEIGHT
                , Math.random() * -5 - 1
                , Math.random() * -5 - 1
            );

            maruo.destroyProcess = () => {
                shareData.maruoDestroyCnt++;
            }
            
            this.cm.add(maruo);
        }

        // まるおを生成（スケジューリング）
        for (let i = 0; i < 10; i++) {
            let maruo = new Maruo(
                WIDTH 
                , (HEIGHT - MaruoRed.HEIGHT) / 2
                , -10
                , 0
            );

            maruo.destroyProcess = () => {
                shareData.maruoDestroyCnt++;
            }
            
            this.cm.addSchedule(i * 6, maruo);
        }
    }

    /**
     * 状態を更新
     */
    run() {
        if (this.cm.isEmpty()) {
            this.changeState("ResultState");
        }

        if (mouse.isLeft) {
            this.cm.add(new Laser(mouse.x, mouse.y));
        }
    }
}