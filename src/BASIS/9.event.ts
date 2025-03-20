import { createFont, sceneCreateAndSetOnLoad } from "../utils";

/**
 * イベントという仕組み
 */
export function BASIS_event() {
  sceneCreateAndSetOnLoad(loaded);

  function loaded(scene: g.Scene) {
    /* ==========【イベントの基本】==========
     * ニコ生ゲームに限らずあらゆるプログラムはイベントによってその処理が始まります
     * 例えばゲームが開始された時、クリックされた時、プレイヤーが参加した時などです
     * 
     * ニコ生ゲームではイベントは on[イベント名] という名前で提供されます
     * 特に重要なイベントは次の通りです
     * 
     * | 対象               | on[イベント名]      | 意味                                   |
     * | ------------------ | ------------------- | -------------------------------------- |
     * | g.E                | onPoint__           | クリック 操作が発生したとき            |
     * | g.Scene            | onPoint__Capture 系 | クリック 操作が発生したとき (シーン用) |
     * | g.Game g.Scene g.E | onUpdate            | 時間が経過したとき                     |
     * | g.Game             | onJoin              | 生主がゲームに参加したとき             |
     * | g.Game             | onSkipChange        | スキップ状態が変化したとき             |
     * | g.Scene            | onMessage           | 開発者の作成する任意のイベント         |
     * 
     * ※ 「__」という表記はそれに対応するものが複数ある場合に使っています
     *          こう表記されている場合、対応する全てのものが説明の対象です
     * 
     * この一覧にあるイベントは全てこのチュートリアルで説明します
     * onPoint__ 以外のイベントは別のファイルで解説します
     */

    /* ==========【イベントの登録】==========
     * 特定のイベントが発生した際に何かを行いたい場合
     * そのイベントに関数を登録します
     * 
     * イベントを登録するには on__.add 関数を使用します
     * 
     * 関数が呼び出された時に、そのイベントの情報を引数で受け取ることが出来ます
     * その情報の内容はイベントの種類によって変わります
     * 
     * ひとつのイベントに登録出来る数に制限はありません
     * 複数登録されている場合は登録順に呼び出されます
     */

    // ★クリックするとログを出力する矩形を
    const whiteRect = new g.FilledRect({
      scene, parent: scene,
      cssColor: "white",
      width: 100, height: 100,
      touchable: true,
    });
    // ★イベントを登録. クリックすると showLog 関数が実行されます
    whiteRect.onPointDown.add(showLog);

    function showLog(e: g.PointDownEvent) {
      // ★onPointDown イベントは引数として g.PointDownEvent を受け取ります
      console.log(`クリック: X:${e.point.x}  Y:${e.point.y}`);
      // ログ出力はブラウザの Devtools > Console を確認してください
    }

    /* ==========【イベントの解除】==========
     * 登録した関数がもう実行されて欲しくない場合に解除することが出来ます
     * 
     * on__.remove 関数を使用します
     */
    // ★if (true) に変更するとクリックしてもログ出力されなくなります
    if (false) {
      whiteRect.onPointDown.remove(showLog);
    }

    /* ==========【１度だけ実行する】==========
     * イベントが発生したら１回だけ実行してほしい場合があります
     * その場合は on__.addOnce 関数を使用します
     * これで登録した関数は１度呼び出されると自動で解除されます
     */
    // ★最初のクリック時のみログを出力する
    whiteRect.onPointDown.addOnce(() => {
      console.log("クリック！！！！！ (このログは１回しか出力されません)");
    });

    /* ==========【クリックイベントの種類】==========
     * クリックイベントには次の３種類があります
     * ・クリックされたとき            - onPointDown
     * ・クリックしたまま動いたとき    - onPointMove
     * ・クリックした後に離されたとき  - onPointUp
     * 
     * クリック操作可能なエンティティは touchable:true を指定する必要があります
     * 
     * ここからはこの３つのイベントを使ったサンプルです
     */

    // ★クリック操作可能な青い四角形を作成
    const blueRect = new g.FilledRect({
      scene, parent: scene,
      width: 100, height: 100,
      x: 210, y: 100,
      cssColor: "blue",
      touchable: true,
    });

    // ★３つのイベントをそれぞれ登録
    blueRect.onPointDown.add(downBlueButton);
    blueRect.onPointMove.add(moveBlueButton);
    blueRect.onPointUp.add(upBlueButton);

    // ★イベント発生時に実行される３つの関数を定義
    function downBlueButton(e: g.PointDownEvent) {
      // 受信したイベントの情報を引数として受け取ることが出来ます
      console.log("======== 四角形:クリック ========");
      console.log(`プレイヤーID: ${e.player?.id}   x:${e.point.x} y:${e.point.y}`);
      blueRect.cssColor = "red";
      blueRect.modified();
    }

    function moveBlueButton(e: g.PointMoveEvent) {
      console.log("======== 四角形:クリック → 移動 ========");
      console.log(`最初にクリックした座標                  x: ${e.point.x} y: ${e.point.y}`);
      console.log(`最初にクリックした座標からの総移動距離  x: ${e.startDelta.x} y: ${e.startDelta.y}`);
      console.log(`前回の onPointUp 発生時からの移動距離   x: ${e.prevDelta.x} y: ${e.prevDelta.y}`);
      blueRect.moveBy(e.prevDelta.x, e.prevDelta.y);
      blueRect.modified();
    }

    function upBlueButton(e: g.PointUpEvent) {
      console.log("======== 四角形:クリック → 離す ========");
      blueRect.cssColor = "blue";
      blueRect.modified();
    }

    // ★ログクリアボタンの作成
    const logClearText = new g.Label({
      scene, parent: scene,
      text: "ログを消す (ブラウザの Devtools Console のログを全て削除します)",
      font: createFont({ size: 20 }),
      touchable: true,
      x: 30, y: 230,
    });
    logClearText.onPointDown.add(() => console.clear());

    /* ==========【シーンのクリックイベント】==========
     * クリックイベントはシーンにも存在します
     * 種類は同じですがそれぞれイベントの後ろに Capture が付きます
     * ・クリックされたとき            - onPointDownCapture
     * ・クリックしたまま動いたとき    - onPointMoveCapture
     * ・クリックした後に離されたとき  - onPointUpCapture
     * 
     * また、エンティティがタッチされた場合は一番上のエンティティのみイベントが発生しますが
     * シーンの場合は必ずイベントが発生します
     * 
     * シーンのクリックイベントは画面全体のクリックイベントということになります
     */

    // ★if (true) にするとシーンにクリックイベントが登録されます
    if (true) {
      // ★３つのイベントをそれぞれ登録
      scene.onPointDownCapture.add(e => {
        console.log("======== シーン:クリック ========");
        console.log(`クリックしたエンティティの座標 X:${e.target?.x}  Y:${e.target?.y}`);
        // e.target はエンティティのクリックイベントでも存在します
      });
      scene.onPointMoveCapture.add(e => {
        console.log("======== シーン:クリック → マウス移動 ========");
      });
      scene.onPointUpCapture.add(e => {
        console.log("======== シーン:クリック → 離す ========");
      });
    }

    // TODO: ここから下の説明、読みづらい！

    /* ==========【コラム】関数の書き方について==========
     * イベントの登録で２通りの書き方をしています
     * 予め定義した関数を使う  function name(arg1, arg2, ...) { ... }
     * その場で書く            () => { ... }
     * 
     * これはそれぞれ違いがありますが、２種類の違いがあります
     * 1. 関数を定義する場所の違い (その場で定義 別の場所で定義)
     * 2. 関数 (function)  アロー関数 (() => {})  の違い
     * 
     * 【関数定義場所の違い】
     * 次の２つのコードは同じ意味です
     */
    if (false) {
      function down() { console.log("fn - 別の場所で定義"); }
      blueRect.onPointDown.add(down);
    }
    if (false) {
      blueRect.onPointDown.add(function () { console.log("fn - その場で定義"); });
    }

    // 【function と アロー関数の違い】
    // 次の２つのコードは同じ意味です
    function fn() { console.log("function"); }
    const arrow = () => { console.log("arrow"); };

    /* function と () => {} では基本的には同じ意味です
     * 基本的に同じですが‥重要な違いとして「this の扱いの差」がありますが説明しません
     * 簡単なニコ生ゲームを作る時に this は出てこないと思います。多分
     * (this の扱いの差が重要な場面自体あまりありません)
     * 
     * 基本的には読みやすさで使い分けます
     */
    if (false) {
      blueRect.onPointDown.add(function () { });
      blueRect.onPointDown.add(() => { });
    }
    // アロー関数の方が読みやすいと思いますがどうでしょうか？
    // 読みやすい方を使いましょう。どちらかに統一すると良いです

    // 一般的にはその場で定義する場合はアロー関数
    // それ以外は function を使う人が多い‥？両方アロー関数派の人もいます

    // function アロー関数の「書き方」について
    // https://midolog.net/javascript-lambda-expression-tutorial
    // より詳しい説明。読まなくて良いです
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/Arrow_functions
  }
}
