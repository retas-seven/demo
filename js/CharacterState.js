/**
 * サンプル画面（キャラクタ）
 */
class CharacterState extends StateBase {
    constructor() {
        super();
        this.bgImg = new Image();
        this.characterImgLoadComplete = false;
        this.bgImgLoadComplete = false;
    }

    /**
     * 初期化
     */
    init () {
        // 使用するキャラクタの画像を読み込む
        this.cm.loadImage (
            () => {
                this.characterImgLoadComplete = true;
                if (this.bgImgLoadComplete) {
                    this.isReady = true;
                    execMainLoop();
                }
                this.isReady = true;
                execMainLoop();
            }
            , Maruo.IMAGE_NAME
            , Maruo.EXPLOSION_IMAGE_NAME
            , MaruoRed.IMAGE_NAME
            , MaruoRed.EXPLOSION_IMAGE_NAME
        );

        // 描画するキャラクタを作成
        for (let i = 0; i < 45; i++) {
            this.cm.add(new Maruo(
                Math.random() * 1000 + WIDTH 
                , Math.random() * HEIGHT - Maruo.HEIGHT
                , Math.random() * -5 - 1
                , Math.random() * -5 - 1));
        }

        for (let i = 0; i < 8; i++) {
            this.cm.add(new MaruoRed(
                Math.random() * 1000 + WIDTH 
                , Math.random() * HEIGHT - MaruoRed.HEIGHT
                , Math.random() * -7 - 4
                , Math.random() * -7 - 4));
        }

        // 背景画像を設定
        this.bgImg.onload = () => {
            this.bgImgLoadComplete = true;
            back.drawImage(this.bgImg, 0, 0);
            if (this.characterImgLoadComplete) {
                this.isReady = true;
                execMainLoop();
            }
        };
        this.bgImg.src = "./img/bg01.jpg";

        // 背景色を設定
        let grd = back.createLinearGradient(0, 0, 0, WIDTH);
        grd.addColorStop(0, 'rgb(0, 0, 15)');
        grd.addColorStop(1, 'rgb(80, 80, 230)');
        back.fillStyle = grd;
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

        if (this.cm.characterList.length == 0) {
            // this.changeState("CircleState");
            this.changeState("CharacterState");
        }

        if (mouse.isLeft) {
            this.cm.add(new Laser(mouse.x, mouse.y));
        }
    }
}