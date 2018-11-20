/**
 * キャラクタ：円
 */
class Circle extends CharacterBase {  
    /**
     * 初期化
     */
    constructor(x, y, dx, dy, radius, color) {
        super(x, y, radius * 2, radius * 2);
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
        this.boundCnt = 0;
    }

    run() {
        this.x += this.dx;
        this.y += this.dy;

        if ((WIDTH - this.width) < this.x) {
            this.x = (WIDTH - this.width);
            this.dx = -this.dx;
            this.boundCnt++;
        } else if (this.x < 0) {
            this.x = 0;
            this.dx = -this.dx;
            this.boundCnt++;
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
        if (this.boundCnt == 5) {
            this.isEnd = true;
        }
    }

    draw() {
        // 円を描く
        front.beginPath();
        front.fillStyle = this.color;
        front.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, 2 * Math.PI);
        front.fill();
    }

    leftClick() {
        // 進行方向を反転
        this.dx = -this.dx;
        this.dy = -this.dy;
    }
}