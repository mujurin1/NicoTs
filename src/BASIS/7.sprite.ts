/**
 * 画像アセット
 */
export function BASIS_sprite() {
  const scene = new g.Scene({
    game: g.game,
    assetIds: ["500x500", "player"]
  });
  g.game.pushScene(scene);
  scene.onLoad.add(loaded);

  function loaded(scene: g.Scene) {
    /* ==========【画像アセットの基本】==========
     * 画像アセットには jpeg, png 形式のファイルを使えます
     * 
     * ※svg も使えますが説明しません
     * Link: https://akashic-games.github.io/reverse-reference/v3/asset/svg-asset.html
     */

    // ★画像アセットの取得
    const spriteAsset = scene.asset.getImageById("500x500");
    const playerAsset = scene.asset.getImageById("player");


    /* ==========【スプライトエンティティ】==========
     * 画像を表示するにはスプライトエンティティ (g.Sprite) を使用します
     * 
     * スプライトは scene に加えて次の値が必須です
     * ・src - 使用する画像アセット
     */

    // ★スプライトの生成
    const sprite = new g.Sprite({
      scene, parent: scene,
      src: spriteAsset,
    });


    /* ==========【画像の一部を表示する】==========
     * src で指定された画像アセットの一部分のみを表示することが出来ます
     * スプライトの生成時引数で表示範囲を指定します
     * 
     * 切り抜きたい範囲の左上座標 - srcX, srcY
     * 切り抜きたい範囲の広さ     - width/srcWidth, height/srcHeight
     * 
     * 切り抜きたい範囲の広さには２通りの指定が出来ますが、
     * まずは width/height で指定する例です
     */

    // ★画像の一部分を切り抜いたスプライトの生成
    // sprite と画像アセットは同じですが、一部分のみを切り取ってスプライト化します
    const cutSprite = new g.Sprite({
      scene, parent: scene,
      src: spriteAsset,
      y: 550,

      // 「100 * 」の右側の値を 0~4 に変更すると見た目が変わります
      srcX: 100 * 0,
      srcY: 100 * 1,
      width: 100, height: 100,
    });


    /* ==========【スプライトサイズの注意点】==========
     * 画像アセットの表示範囲を width/height で指定するとスプライトのサイズも変わります
     * これは時に罠となります
     * 
     * スプライトのサイズを変更しようと width/height を指定すると
     * 画像アセットの表示範囲も変わってしまいます
     * 本当は width/height はスプライト自体のを設定したかったのにです
     * 
     * スプライトのサイズとは別に表示範囲を指定するには srcWidth/srcHeight を使います
     * 今回は例として 32x32 の画像を 100x100 のスプライトで表示してみます
     */

    // ★大きさを変えたスプライトの作成
    const player100x100Px = new g.Sprite({
      scene, parent: scene,
      src: playerAsset,
      x: 600, y: 100,
      touchable: true,
      // ★スプライトのサイズは 100x100
      width: 100, height: 100,
      // ★表示する画像アセットの範囲は変えない (32x32)
      srcWidth: playerAsset.width,
      srcHeight: playerAsset.height,
    });

    /* 表示されるスプライトの大きさは 100x100 ですが
     * 表示されている範囲は画像アセットの (X:0,Y:0)~(X:32,Y:32) の範囲です
     * 
     * また、これは画像アセットに限りませんがエンティティの大きさをスケールで変更することが出来ます
     * スケールは割合で指定します (100% = 1, 250% = 2.5)
     */

    // ★スケールでサイズを変更したスプライトを生成
    const player100x100Scale = new g.Sprite({
      scene, parent: scene,
      src: playerAsset,
      x: 600, y: 300,
      touchable: true,
      // 画像サイズによらず 100px で表示されるようにスケールを調整
      scaleX: 100 / playerAsset.width,    // 32px なので計算結果は 3.125
      scaleY: 100 / playerAsset.height,
    });

    /* スケールの指定は小数点なので
     * ピクセルサイズを厳密に指定したい場合には不向きです
     * 
     * また、スケールを変更した場合もクリック操作は見た目通りに反応します
     */

    // ★スプライトのクリック操作
    player100x100Px.onPointDown.add(() => {
      player100x100Px.x += 1;
      player100x100Px.modified();
    });
    player100x100Scale.onPointDown.add(() => {
      // スケールを変更したエンティティのクリック判定もちゃんと見た目通りです
      player100x100Scale.x += 1;
      player100x100Scale.modified();
    });


    /* ==========【コラム】==========
     * 
     * 【画像アセットの小容量化】
     * ゲームの容量を小さくするために複数の画像を１つに纏めるというテクニックがあります
     * この方法を２つ紹介します
     * 
     * 1. ゲームを出力する時に画像を纏めるオプションを付ける
     * Link - https://akashic-games.github.io/recent-changes/2022/202206.html#export-pack-image
     * 
     * こちらは2022年の情報で「実験的」とされているので現在は使えないかも‥？
     * (TODO: 検証する. 使えなかったらゴメンナサイ)
     * 
     * 
     * 2. 「画像を纏めた画像化を生成し、それを切り取る情報も生成する」ツールを使う
     * Link - https://www.npmjs.com/package/pack-image
     * 
     * 使い方
     * 1. npm ツールをインストールします `npm i -g pack-image`
     * 2. 纏めたい画像のみを入れたフォルダを用意する (ここでは `pack_images` というフォルダ名で行う前提で進めます)
     * 3. コマンドを実行
     *    例) `pack-image "pack_images/*.png" --output "packed.png" --json "packed.json" --verbose`
     *    意味) `pack-image "纏める画像を指定" --output "生成される画像ファイル名" --json "生成されるJSONファイル名"
     * 4. 生成された画像 (この例では packed.png) を image フォルダに移動
     * 5. 生成されたJSON (この例では packed.json) を text フォルダに移動
     * 6. JSON を元に画像を切り抜く
     * 
     * 
     * 【JavaScriptの数値計算】
     * JavaScript は小数点の計算が苦手です
     * これは小数点の計算には誤差が生まれる場合があるためです
     * 例として 0.1+0.2 を計算すると 0.30000000000000004 になります
     * 
     * エンティティのスケールを変更した場合にはこの理由で
     * 想定していたピクセルサイズと実際のサイズで誤差が生まれる場合があります
     * 
     * また、整数でもめっちゃでかい数 (マイナス方向も含む) の計算では誤差が生まれる場合があります
     * JavaScript で整数を安全に計算出来る範囲は -2^53+1 ~ 2^53-1 です (9007兆1992億5474万0991)
     * これを超える整数の計算は誤差が生まれる場合があります
     * 例として「9007199254740991 + 2」を計算すると「9007199254740992」になります (+1しかされない)
     * 
     * 例のように大きい数と小さい数で計算を行うと特に誤差が生まれやすいです
     */
  }
}
