import { sceneCreateAndSetOnLoad } from "../utils";

/**
 * 文字を表示する (ラベルとフォント)
 */
export function BASIS_label() {
  sceneCreateAndSetOnLoad(loaded);

  function loaded(scene: g.Scene) {
    /* ==========【ラベルの作り方】==========
     * 文字を表示するエンティティはラベル (g.Label) です
     * 
     * 生成時には g.E で指定可能な値に加えて次の値を指定可能です
     * (必須な値に * をつけています)
     * 
     * ・text (*)  - 文字
     * ・font (*)  - フォント
     * ・textColor - 文字色
     * 
     * ※ g.Label にはこれ以外の指定可能な値もありますが今は省略しています
     *    後でちゃんと説明します (TODO: 書いてね)
     * 
     * 【フォント】
     * g.Label を作るためには必要なフォントには２種類あります
     * このチュートリアルでは DynamicFont のみを使用します
     * 
     * DynamicFont を作成するのに必須な値は次の３つです
     * ・game       - g.game  (← これは BASIC/game で解説します)
     * ・fontFamily - フォントの種類
     * ・size       - フォントサイズ
     * 
     * フォントについて詳しく知りたい方は次のリンクをどうぞ
     * DynamicFont - https://akashic-games.github.io/tutorial/v3/text.html
     * BitmpFont   - https://akashic-games.github.io/tutorial/v3/bitmap-font.html
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
      touchable: true,
      x: 200,
      maxWidth: 100,
    });

    /* ==========【g.Label 以外の Label】==========
     * Akashic Engine 公式で提供されている akashic-label ライブラリがあります
     * これは標準で提供されている g.Label エンティティより高機能です
     * 
     * 複数行の表示やルビ機能などが利用できます
     * 
     * 動作サンプル - https://akashic-contents.github.io/samples/basic/akashic-label.html
     * ドキュメント - https://github.com/akashic-games/akashic-label/blob/master/akashic-label.md
     */

    /* ==========【コラム】g.DynamicFont/g.Label の仕様==========
     * g.DynamicFont と g.Label にはお互いに干渉する設定や
     * 特定の設定は別の設定によって効果が変わったり無意味になったりしてややこしい
     * ここではそれらの設定を列挙します
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
     */
  }
}
