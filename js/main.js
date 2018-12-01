/** 画面幅 */
const WIDTH = 720;
/** 画面高さ */
const HEIGHT = 405;
/** １フレームの描画に使用する時間（ミリ秒） */
const FRAME_MSEC = 1000 / 60;
/** コンテキスト（システム用CANVAS） */
var system;
/** コンテキスト（前面CANVAS） */
var front;
/** コンテキスト（背面CANVAS） */
var back;
/** マウスイベントハンドラ */
var mouse;
/** 画面（各場面） */
var state;
/** 描画タイミング調整用の変数：ループ開始時の時間（ミリ秒） */
var _loopStartMsc;
/** 描画タイミング調整用の変数：ループ終了時の時間（ミリ秒） */
var _loopEndMsc;
/** ゲーム内の共有データ */
var shareData;

var isSystemBlack = false;
var systemAlpha = 0;
var isSystemBlackClear = false;
var fadeAfterFunc;

/**
 * 初期処理
 */
function init() {
    let systemCanvas = document.getElementById("systemCanvas");
    let frontCanvas = document.getElementById("frontCanvas");
    let backCanvas = document.getElementById("backCanvas");
    system = systemCanvas.getContext("2d");
    front = frontCanvas.getContext("2d");
    back = backCanvas.getContext("2d");

    // 画面の大きさを設定
    systemCanvas.width = WIDTH;
    systemCanvas.height = HEIGHT;
    frontCanvas.width = WIDTH;
    frontCanvas.height = HEIGHT;
    backCanvas.width = WIDTH;
    backCanvas.height = HEIGHT;

    // マウスイベントハンドラ設定
    mouse = new Mouse();
    systemCanvas.addEventListener("click", mouse.leftClick, false);
    systemCanvas.addEventListener("contextmenu", mouse.rightClick, false);

    // 共有データを初期化 
    shareData = {};

    // 初期画面を設定
    state = new TitleState();
    state.init();

    // メインループ開始
    _loopEndMsc = 0;
    execMainLoop();
}

/**
 * メインループ
 */
function mainLoop() {
    _loopStartMsc = Date.now();
    
    if (FRAME_MSEC < (_loopStartMsc - _loopEndMsc) && state.im.isLoadImgComplete) {

        // 検知したマウスイベントをマウスオブジェクトに反映
        mouse.update();
        // 画面を初期化
        front.clearRect(0, 0, WIDTH, HEIGHT);
        // 状態を更新
        state.baseRun();
        // キャラクタの登場スケジュール調整
        state.baseScheduleCheck();
        // 描画
        state.baseDraw();
        // 後処理
        state.baseAfterProcess();
        // 検知したマウスイベントを無効化
        mouse.reset();
    	
    	systemFunc();

        // 描画間隔調整のための処理
        _loopEndMsc = _loopStartMsc;
    }
    
    execMainLoop();
}

/**
 * メインループ実行
 */
function execMainLoop() {
    requestAnimationFrame(mainLoop);
}

function blackFadeIn(callback) {
    fadeAfterFunc = callback;
    isSystemBlack = true;
    systemAlpha = 0;
}

function systemFunc() {
    if (isSystemBlack) {
        systemAlpha += 0.1;
        system.globalAlpha = systemAlpha;
        system.fillRect(0, 0, WIDTH, HEIGHT);
        if (1.0 <= systemAlpha) {

            // コールバック
            if (fadeAfterFunc !== void 0) {
                fadeAfterFunc();
                fadeAfterFunc = void 0;
            }

            isSystemBlack = false;
            isSystemBlackClear = true;
            systemAlpha = 1.0;
        }
    }
    else if (isSystemBlackClear) {
        systemAlpha -= 0.1;
        system.globalAlpha = systemAlpha;
        system.clearRect(0, 0, WIDTH, HEIGHT);
        system.fillRect(0, 0, WIDTH, HEIGHT);
        if (systemAlpha <= 0.0) {
            isSystemBlackClear = false;
            system.clearRect(0, 0, WIDTH, HEIGHT);
        }
    }
}
