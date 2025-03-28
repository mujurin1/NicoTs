/**
 * マルチプレイの小さいサンプル
 */
export function BASIS_minimal() {
  /* ==========【ゲームが実行されるタブの操作】==========
   * ブラウザのゲームの実行されているタブの左上にある
   *「人影+」アイコンをクリックすると新しいタブが開きます
   * 単純に http://localhost:3000 を複数のタブで開いてもOKです
   * 
   * またマルチプレイではタブをリロードしても最新の時刻まで「追っかけ」されます
   * 開発中に最初からやり直す場合はタブの左上の「電源」アイコンをクリックしてください
   * 
   * ※`dev` で実行している場合はエディターで保存するたび最初から実行し直されます
   */


  // ★シーンの作成＆表示
  const scene = new g.Scene({ game: g.game });
  g.game.pushScene(scene);

  // ★mainScene の準備が完了したら loadedMainScene を実行します
  scene.onLoad.add(loadedMainScene);


  function loadedMainScene(scene: g.Scene): void {
    /* ==========【シンプルなマルチプレイゲームの例】==========
     * 1. 複数のブラウザタブでゲームを開く
     * 2. どれか1つのタブで青い四角形をクリック
     * 3. 全てのタブで同時に四角形が移動することを確認
     * 
     * 1人のプレイヤーの操作が全てのプレイヤーに共有され、
     * 全員の画面は同じ表示になります
     */

    // ★青色の四角形を作成
    const blueRect = new g.FilledRect({
      scene: scene, parent: scene,
      cssColor: "blue",
      width: 100, height: 100,

      x: 100, y: 100,
      touchable: true,
    });

    // ★青色の四角形をクリックすると 10px 移動する
    blueRect.onPointDown.add(() => {
      blueRect.x += 10;
      blueRect.modified();
    });
  }
}
