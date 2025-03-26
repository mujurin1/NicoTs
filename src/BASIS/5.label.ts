import { createFont } from "../utils";

/**
 * 文字を表示する (ラベルとフォント)
 */
export function BASIS_label() {
  const scene = new g.Scene({ game: g.game });
  g.game.pushScene(scene);
  scene.onLoad.add(loaded);

  function loaded(scene: g.Scene) {
    /* ==========【ラベル】==========
     * Akashic Engine では文字を表示することも出来ます
     * 文字を表示するエンティティは g.Label です
     * これを特にラベルと呼びます
     * 
     * ラベルでは scene の他に次の値が必須です
     * ・text      - 文字
     * ・font      - フォント
     * 
     * 
     * 【フォント】
     * g.Label を作るためには必要なフォントには２種類あります
     * このチュートリアルでは g.DynamicFont のみを使用します
     * 
     * g.DynamicFont はエンティティではありません
     * ラベルエンティティを作るのに必要なものです
     * 
     * g.DynamicFont を作る方法もエンティティと似ています
     * 必須な値は次の３つです
     * ・game       - g.game
     * ・fontFamily - フォントの種類
     * ・size       - フォントサイズ
     */

    // ★まずは g.DynamicFont を作成します
    const font = new g.DynamicFont({
      game: g.game,
      fontFamily: "sans-serif",
      size: 40,
    });

    // ★作成したフォントを使ってラベルを作ります
    const label = new g.Label({
      scene, parent: scene,
      font,
      text: "文字を表示します",
      x: 200,
    });


    /* ==========【めんどくさいフォント】==========
     * フォントを作るためのコードは解説には重要でないですが
     * 多数の行を使って見た目が煩雑になるので
     * utils.ts ファイルにある createFont を以降は使います
     * 
     * 例えば
     * 
     * createFont({ size: 20 })
     * 
     * とした場合は次のコードと同じ意味です
     * 
     * new g.DynamicFont({
     *   game: g.game,
     *   fontFamily: "sans-serif",
     *   size: 20,
     * })
     */

    const x = new g.Label({
      scene, parent: scene,
      font: createFont({ size: 20 }),
      text: "createFont でフォントを作りました",
      x: 200, y: 500,
    });


    /* ==========【コラム】==========
     * 
     * ※このコラムは特にややこしいので最初は読まずに次へ進んでください
     * 
     * 
     * 【g.Label 以外の Label】
     * Akashic Engine 公式で提供されている akashic-label ライブラリがあります
     * これは標準で提供されている g.Label エンティティより高機能です
     * 
     * 複数行の表示やルビ機能などが利用できます
     * 
     * 動作サンプル - https://akashic-contents.github.io/samples/basic/akashic-label.html
     * ドキュメント - https://github.com/akashic-games/akashic-label/blob/master/akashic-label.md
     * 
     * 
     * 【g.DynamicFont/g.Label について】
     * g.DynamicFont と g.Label にはお互いに干渉する設定や
     * 特定の設定は別の設定によって効果が変わったり無意味になったりしてややこしい
     * ここではそれらの設定を列挙します
     * 
     * 
     * 【文字の色】
     * g.DynamicFont の生成時に fontColor を指定すると g.Label の色を変更出来る
     * g.Label にも textColor がありこれを指定すると g.DynamicFont より優先して色を変更出来る
     * 
     * 
     * 【文字のサイズ】
     * g.DynamicFont では文字のサイズとして size を設定しますが
     * g.Label にも fontSize があります
     * 
     * g.DynamicFont は正しい意味での文字サイズですが
     * g.Label の fontSize は内部で生成された文字列の画像を拡大することで大きさを変更しています
     * なので文字を綺麗に表示したい場合は g.Label の fontSize は使うべきではないです
     * 
     * 
     * 【ラベルエンティティの幅】
     * g.Label の横幅 (width) はデフォルトでは描画される文字の幅で自動調整されます
     * これを無効にする場合は widthAutoAdjust:false を指定する
     * その場合 width を指定しなければならない
     * 
     * 逆に widthAutoAdjust:false でない場合は width を指定しても意味がない
     * 
     * maxWidth は widthAutoAdjust:true の場合の最大幅を指定できる
     * 文字列の幅がこれより大きい場合はラベル全体が横に潰れて表示される
     * maxWidth は widthAutoAdjust:true の時のみ意味のある値 (たぶん)
     * 
     * 
     * 【文字の寄せ】
     * デフォルトでは文字は左寄せ設定になっている
     * これを変更するには textAlign を指定するのだがこの値を変更する場合は
     * widthAutoAdjust:false でなければならない
     * 
     * 
     * 【フォントについて】
     * g.DynamicFont と g.BitmapFont について詳しく知りたい方は次のリンクをどうぞ
     * DynamicFont - https://akashic-games.github.io/tutorial/v3/text.html
     * BitmpFont   - https://akashic-games.github.io/tutorial/v3/bitmap-font.html
     */
  }
}
