$(function () {
    /*=================================================
    ハンバーガーメニュー
    ===================================================*/
      // ハンバーガーメニューのクリックイベント
    $(".toggle_btn").on("click", function() {
        // headerにopenクラスが存在する場合
        if ($("header").hasClass("open")) {
          // openクラスを削除
          // openクラスを削除すると、openクラスのCSSがはずれるため、
          // メニューが非表示になる
        $("header").removeClass("open");
    
        // headerにopenクラスが存在しない場合
        } else {
          // openクラスを追加
          // openクラスを追加すると、openクラスのCSSが適応されるため、
          // メニューが表示される
        $("header").addClass("open");
        }
    });

        // メニューが表示されている時に画面をクリックした場合
    $(".mask , a[href^='#']").on("click", function () {

        $("header").removeClass("open");
    });
    });


var unit = 100,
    canvasList, // キャンバスの配列
    info = {}, // 全キャンバス共通の描画情報
    colorList; // 各キャンバスの色情報

/**
 * Init function.
 * 
 * Initialize variables and begin the animation.
 */
function init() {
    info.seconds = 0;
    info.t = 0;
    canvasList = [];
    colorList = [];
    // canvas1個めの色指定
    canvasList.push(document.getElementById("waveCanvas"));
    colorList.push(['#fff']);
    
    // canvas2個めの色指定
    // canvasList.push(document.getElementById("waveCanvas2"));
    // colorList.push(['#43c0e4']);
    
    // canvas3個めの色指定
    // canvasList.push(document.getElementById("waveCanvas3"));
    // colorList.push(['#fff']);
// 各キャンバスの初期化
        for(var canvasIndex in canvasList) {
        var canvas = canvasList[canvasIndex];
        canvas.width = document.documentElement.clientWidth; //Canvasのwidthをウィンドウの幅に合わせる
        canvas.height = 150;//波の高さ
        canvas.contextCache = canvas.getContext("2d");
    }
    // 共通の更新処理呼び出し
    update();
}

function update() {
    for(var canvasIndex in canvasList) {
        var canvas = canvasList[canvasIndex];
        // 各キャンバスの描画
        draw(canvas, colorList[canvasIndex]);
    }
    // 共通の描画情報の更新
    info.seconds = info.seconds + .014;
    info.t = info.seconds*Math.PI;
    // 自身の再起呼び出し
    setTimeout(update, 35);
}

/**
 * Draw animation function.
 * 
 * This function draws one frame of the animation, waits 20ms, and then calls
 * itself again.
 */
function draw(canvas, color) {
    // 対象のcanvasのコンテキストを取得
    var context = canvas.contextCache;
    // キャンバスの描画をクリア
    context.clearRect(0, 0, canvas.width, canvas.height);

    //波を描画 drawWave(canvas, color[数字（波の数を0から数えて指定）], 透過, 波の幅のzoom,波の開始位置の遅れ )
    drawWave(canvas, color[0], 1, 3, 0);
}

/**
* 波を描画
* drawWave(色, 不透明度, 波の幅のzoom, 波の開始位置の遅れ)
*/
function drawWave(canvas, color, alpha, zoom, delay) {
    var context = canvas.contextCache;
    context.fillStyle = color;//塗りの色
    context.globalAlpha = alpha;
    context.beginPath(); //パスの開始
    drawSine(canvas, info.t / 0.5, zoom, delay);
    context.lineTo(canvas.width + 10, canvas.height); //パスをCanvasの右下へ
    context.lineTo(0, canvas.height); //パスをCanvasの左下へ
    context.closePath() //パスを閉じる
    context.fill(); //波を塗りつぶす
}

/**
 * Function to draw sine
 * 
 * The sine curve is drawn in 10px segments starting at the origin. 
 * drawSine(時間, 波の幅のzoom, 波の開始位置の遅れ)
 */
function drawSine(canvas, t, zoom, delay) {
    var xAxis = Math.floor(canvas.height/2);
    var yAxis = 0;
    var context = canvas.contextCache;
    // Set the initial x and y, starting at 0,0 and translating to the origin on
    // the canvas.
    var x = t; //時間を横の位置とする
    var y = Math.sin(x)/zoom;
    context.moveTo(yAxis, unit*y+xAxis); //スタート位置にパスを置く

    // Loop to draw segments (横幅の分、波を描画)
    for (i = yAxis; i <= canvas.width + 10; i += 10) {
        x = t+(-yAxis+i)/unit/zoom;
        y = Math.sin(x - delay)/3;
        context.lineTo(i, unit*y+xAxis);
    }
}

init();


// slick
$(".slide-items").slick({
    arrows: false,
    centerMode: true,
    centerPadding: "10%",
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
    {
        breakpoint: 968,
        settings: {
        centerPadding: "50px",
        slidesToShow: 1,
        },
    },
    ],
});


/*=================================================
スムーススクロール
===================================================*/
    // クリックイベント（#で始まるボタンがクリックされた際に実行）
    $('a[href^="#"]').click(function () {


        // クリックしたaタグのリンクを取得
        let href = $(this).attr("href");
        // ジャンプ先のid名をセット hrefの中身が#もしくは空欄なら,htmlタグをセット
        let target = $(href == "#" || href == "" ? "html" : href);
        // ページトップからジャンプ先の要素までの距離を取得
        let position = target.offset().top;
    
    
        // 0.5秒かけてページトップへ移動
        $("body,html").animate({ scrollTop: position },500 , "swing");
        // イベントが親要素へ伝播しないための記述
        // ※詳しく知りたい方は「イベント　バブリング」または「jQuery バブリング」で調べてみてください
        return false;
    });


/*=================================================
スクロール時の画像フェード表示
===================================================*/
  // スクロール時のイベント
$(window).scroll(function () {
    // fadeinクラスに対して順に処理を行う
    $(".fadein").each(function () {
      // スクロールした距離
    let scroll = $(window).scrollTop();
      // fadeinクラスの要素までの距離
    let target = $(this).offset().top;
      // 画面の高さ
    let windowHeight = $(window).height();
      // fadeinクラスの要素が画面下にきてから200px通過した
      // したタイミングで要素を表示
    if (scroll > target - windowHeight + 100) {
        $(this).css("opacity", "1");
        $(this).css("transform", "translateY(0)");
    }
    });
});