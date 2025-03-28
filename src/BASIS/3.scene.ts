
/**
 * シーン (g.Scene)
 */
export function BASIS_scene() {
  /* ==========【シーン】==========
   * Akashic Engien では「画面」を「シーン」で表現します
   * 
   * シーンを作成してそれを現在のシーンにすると
   * そのシーンが画面に表示されます
   */

  // ★シーンを生成する
  const scene = new g.Scene({ game: g.game });

  // ★生成したシーンを表示する
  g.game.pushScene(scene);


  /* ==========【シーンの準備】==========
   * 作成したシーンは g.game.pushScene 関数を使うことで現在のシーンとして表示されます
   * しかしこの関数を使ってすぐそのシーンが表示されるわけではありません
   * 
   * この関数は次の事を行います
   * 1. 引数で受け取ったシーンの「準備」を始める
   * 2. 準備が完了したら現在のシーンとして表示する
   * 
   * この 2 の準備が完了してからでないと一部の事が出来ないため、
   * 基本的にこの準備が完了してから画面を構築します
   */

  // ★シーンの準備が完了したら loaded 関数を実行する
  scene.onLoad.add(loaded);


  function loaded(scene: g.Scene) {
    console.log("シーンの準備が完了したよ");
    // ログ出力はブラウザの Devtools > Console を確認してください
    // F12 を押して「Console/コンソール」タブを開きます
    // Link: https://sije.shizentai.jp/console.html
  }


  /* ==========【シーンの準備】==========
   * シーンの準備完了を知るには scene.onLoad.add 関数を使います
   * ※詳しくは BASIS/event で説明します
   * 
   * loaded 関数はシーンの準備が完了したら実行されます
   * 
   * まだシーンにはなにもないため画面には何も表示されません
   */
}
