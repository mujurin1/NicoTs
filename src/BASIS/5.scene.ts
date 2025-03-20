/**
 * シーン (g.Scene)
 */
export function BASIS_scene() {
  /* ==========【シーン (g.Scene)】==========
   * 画面上にエンティティを表示する場合、一番の親となるものがこのシーンです
   * 画面に表示されているエンティティは親を辿れば必ずシーンに辿り着きます
   * 
   * ただし、シーンはエンティティではないのでシーンをエンティティの子にすることは出来ません
   * 
   * また複数のシーンで親子関係を作る事もできません
   * シーンは必ず１つだけ表示されます (例外はありますが基本１つだけです)
   * 
   * プレイヤーが見る画面はこのシーン上に構築していきます
   * 
   * シーンには画面を構築する他にこのような役割があります
   * ・画面を表示する
   *     scene.append で追加されたエンティティはそのシーンに表示される
   * ・画面全体のクリック操作イベント
   *     BASIC/event で説明します
   * ・使用するアセットを管理する
   *     BASIC/asset で説明します
   * ・時間経過のルールを変更する (高度な機能。マルチプレイのみ)
   *     今のところ説明する予定はありません
   */

  /* ==========【シーンの作成】==========
   * シーンを作成するにはとりあえず new g.Scene({ game: g.game }) をします
   * それ以外の生成時に指定する値は今後説明します
   */

  // ★シーンを生成する
  const scene = new g.Scene({ game: g.game });

  /* シーンは作成するだけでは現在の画面に表示されないので
   * g.game.pushScene で現在の画面として表示します
   * 
   * これを行うと「シーンの準備」が始まります
   * 準備が完了した時に画面がそのシーンに切り替わります
   * 
   * シーンにの準備については BASIC/event で説明します
   */

  // ★生成したシーンを現在のシーンとして登録する
  g.game.pushScene(scene);
  // ★シーンの準備が完了したら loaded を実行する
  scene.onLoad.add(loaded);

  function loaded() {
    // ★シーンの準備が完了したら実行される
    console.log("シーンの準備が完了したよ！");

    /* ==========【シーンの遷移】==========
     * シーンを複数作成してシーンを切り替えることが出来ます
     * 
     * シーンを切り替えると以前のシーンは非表示になります
     * 以前のシーンやシーンに含まれるエンティティのイベントは呼ばれなくなります
     * 
     * この loaded 関数はそのシーンが準備完了した時のに実行されるので
     * 最初に現在のシーンになった時に１度だけ呼ばれます
     * シーンが切り替わっても２度呼ばれる事はありません
     */
    // ★シーンを切り替えるボタンを生成
    const sceneChange = new g.FilledRect({
      scene, parent: scene,
      cssColor: "blue",
      width: 100, height: 100,
      touchable: true,
    });
    sceneChange.onPointDown.add(() => {
      // ★新しいシーンを生成
      const newScene = new g.Scene({ game: g.game });
      // ★新しいシーンに遷移する
      g.game.pushScene(newScene);
      newScene.onLoad.add(() => {
        // ★新しいシーンの準備が完了したら実行される
        console.log("新しいシーンの準備が完了したよ！");

        // ★新しいシーンに表示される赤い矩形
        const red = new g.FilledRect({
          scene: newScene, parent: newScene,
          cssColor: "red",
          width: 100, height: 100,
          touchable: true
        });
        red.onPointDown.add(() => {
          // ★赤い矩形をクリックすると現在のシーンを取り除く (前のシーンに戻る)
          g.game.popScene();
        });
      });
    });
  }
}
