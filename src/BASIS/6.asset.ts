/**
 * アセットの使い方
 */
export function BASIS_asset() {
  /* ==========【アセットの基本】==========
   * Akashic Engine では画像や音声などをアセットとして扱います
   * アセットは以下の種類があります 
   * 
   * | 種別名 | 説明                                |
   * | ------ | ----------------------------------- |
   * | image  | png jpeg 形式の画像                 |
   * | audio  | ogg と m4a 形式 (または aac) の音声 |
   * | script | JavaScript ファイル                 |
   * | text   | その他のデータ (テキスト形式)       |
   * 
   * それぞれ種別名と同じフォルダにアセットを配置します
   * 画像の場合は image のフォルダです
   * 
   * 【重要】アセットを「追加/削除/内容の変更」した場合は `akashic scan asset` を実行する必要があります
   *         これを実行するとゲームで利用するアセットを game.json の assets 項目へ登録されます
   * 
   * game.json の assets はゲームで利用する全てのアセットが登録されています
   * ファイル名を項目名として assets の一覧に並び、その項目名がゲームで利用するアセットIDになります
   * 
   * ファイル名 ＝ game.json の assets の項目名 ＝ ゲームで利用するアセットID
   * 
   * ※`serve:watch` で実行中であればアセットを更新すると自動で `akashic scan asset` されるっぽい？
   */

  /* ==========【アセットを使用する】==========
   * game.json の assets に登録されたアセットを使用することが出来ます
   * アセットを使うにはまずシーンでアセットのIDを指定します
   */

  // ★シーンの作成とアセット指定
  const scene = new g.Scene({
    game: g.game,
    // ★アセットを使用するために使用したいアセットをIDで指定
    assetIds: ["player", "shot", "se"],
  });
  g.game.pushScene(scene);
  // ★シーンの準備にはアセットの準備も含まれる
  scene.onLoad.add(loaded);

  /* ==========【シーンの準備】==========
   * scene.onLoad で渡した関数はシーンの準備が完了したら実行されます
   * このシーンの準備には指定したIDの準備が含まれています
   * 
   * アセットはゲームの実行中に必要な分だけを適宜ダウンロードする仕組みになっているため
   * まだダウンロードされていないアセットがある場合はアセットのダウンロードが始まります
   * 
   * 全てのアセットのダウンロードが完了して初めてシーンの準備が完了したことになります
   */

  function loaded() {
    /* ==========【アセットの取り出し方】==========
     * 1. そのシーンで使用するアセットIDを指定する
     * 2. シーンの準備完了を待つ
     * 3. 準備が完了したらシーンからアセットを取り出す
     * 
     * アセット取り出すには scene.get[種別名]ById 関数を使います
     * 引数にはそのシーンの assetIds で指定したのと同じ値を指定します
     * 
     * 【注意】アセットを使用するためにはそのシーンが準備完了している必要があります
     *         onLoad 前に scene.asset.get__ を呼ぶとエラーになります
     */

    // ★アセットの取得
    const playerAsset = scene.asset.getImageById("player");
    const shotAsset = scene.asset.getImageById("shot");
    const shotSeAsset = scene.asset.getAudioById("se");

    /* ==========【アセットの使い方】==========
     * 取り出したアセットはその種類ごとに使い方が変わります
     * ここでは画像/音声アセットの使い方を簡単に説明します
     * 
     * 【画像アセットの使い方】
     * 画像アセットは new g.Sprite の引数 src に指定することで
     * その画像の見た目を持つエンティティを生成できます
     * 
     * 詳細は BASIC/sprite で説明します
     * 
     * 【音声アセットの使い方】
     * 音声アセットは取り出したアセットの play 関数を呼ぶことで
     * その音声を再生できます
     * 
     * 詳細は BASIC/audio で説明します
     */

    // ★画像アセットを使う
    const player = new g.Sprite({
      scene, parent: scene,
      // src に画像アセットを指定します
      src: playerAsset,
      x: 100, y: 100,
    });

    // ★画面クリック時のショット発射とサウンド再生
    scene.onPointDownCapture.add(() => {
      const shot = new g.Sprite({
        scene, parent: scene,
        src: shotAsset,
        x: player.x + player.width,
        y: player.y + player.height / 2 - shotAsset.height / 2,
      });
      shot.onUpdate.add(() => {
        shot.x += 10;
        shot.modified();
        // ゲーム画面の外側に出たら shot を削除します
        if (shot.x >= g.game.width) shot.destroy();
      });

      // ★音声アセットを使う
      const se = shotSeAsset.play();
      // 音量を変更する (0~1 の範囲内)
      se.changeVolume(0.1);
    });

    /* ==========【コラム】(書きかけ)==========
     * 
     * アセットを指定/読み込むにはIDの他にパスで指定する方法もあります
     * 
     * アセットの種類にはここで説明した以外に binary があります
     */
  }
}
