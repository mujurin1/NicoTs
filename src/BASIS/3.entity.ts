import { sceneCreateAndSetOnLoad } from "../utils";

/**
 * エンティティとは
 */
export function BASIS_entity() {
  // 重要でない部分を省略するために "./utils" の関数を使うことがあります (これらの関数について理解する必要はないです)
  sceneCreateAndSetOnLoad(loaded);

  function loaded(scene: g.Scene) {
    /* ==========【エンティティ】==========
     * 画面に表示するもののことをエンティティと呼びます
     * エンティティには四角形 (四角形) や画像、テキストなどがあります
     * 
     * エンティティを生成するにはそのエンティティを new します
     * どんなエンティティにしたいかを引数で指定します
     * 
     * 例えば次のように指定します
     * ・座標 (X:10,Y:20)     x: 10, y: 20
     * ・赤色の四角形         cssColor: "red"
     * ・「ABCDE」という文字  text: "ABC"
     * といった感じです
     */


    /* ==========【エンティティの生成】==========
     * 一番単純なエンティティとして g.E があります
     * これを作成しても画面には何も表示されません
     * 
     * ※g.E にも役割はあります！
     *   【エンティティの種類】の項目で説明します
     * 
     * エンティティを作成する時に必ず指定する必要のある値があります
     * 必須な値は種類に応じて変わりますが、
     * scene を指定するのは全てのエンティティで共通です
     * 
     * ここで scene を指定する意味は BASIC/scene で説明します
     */

    // ★エンティティの作成
    const entity1 = new g.E({ scene });


    /* ==========【必須でない値】==========
     * エンティティを生成する時に必須ではない値もあります
     * 例えば座標や大きさ、クリック可能かどうかなどです
     * 
     * 必須な値と同様にエンティティの種類に応じて指定可能な値もあります
     */

    // ★座標(X:100,Y:100)、大きさ(縦:100, 幅:200) のエンティティを作成
    const entity2 = new g.E({
      scene,
      x: 100, y: 100,
      width: 100, height: 200,
    });


    /* ==========【矩形エンティティ】==========
     * 色のついた四角形を表示するには矩形エンティティ (g.FilledRect) を使用します
     * 
     * 生成時には g.E で指定可能な値に加えて次の値を指定可能です
     * ・色    - cssColor
     * 
     * そして g.E では任意だった次の値が必須になります
     * ・横幅  - width
     * ・縦幅  - height
     */

    // ★青色、縦:100 横:100 の矩形を作成
    const rect1 = new g.FilledRect({
      scene,
      cssColor: "blue",
      width: 100, height: 100,
    });
    // ※しかしこの rect1 は画面には表示されません


    /* ==========【エンティティを画面に表示する】==========
     * ここまでで entity1, entity2, rect1 を作成しましたが、
     * これらのエンティティは画面に表示されていません
     * 
     * 画面に表示させるにはそのエンティティを画面に追加する必要があります
     * この「画面」は Akashic Engine では「シーン」と呼びます
     * 
     * シーンとは「g.Scene」のことなのですが詳しくは BASIC/sceen で説明します
     * 今は、エンティティを画面に表示するためには「シーン」に追加する必要がある
     * と考えてください
     * 
     * エンティティをシーンに追加するには２つ方法があります
     * ・エンティティの作成時に指定   生成時の引数で parent を指定する
     * ・作成後に追加する             シーンの append 関数に渡す
     */

    // ★青色の矩形エンティティの作成
    const blueRect = new g.FilledRect({
      scene,
      // ★作成時にシーンを指定することで、エンティティを画面に追加します
      parent: scene,

      x: 10, y: 10,
      width: 100, height: 100,
      cssColor: "blue",
    });

    // ★青色の矩形エンティティの作成
    const redRect = new g.FilledRect({
      scene,
      x: 150, y: 10,
      width: 100, height: 100,
      cssColor: "red",
    });
    // ★青色の矩形をシーンに追加
    scene.append(redRect);


    /* ==========【エンティティの親子関係】==========
     * なぜ最初からシーンに追加されないのか疑問に思った人もいると思います
     * その理由は、エンティティを追加することが可能なのはシーンだけではないからです
     * 
     * エンティティはエンティティに追加することが出来ます
     * 例えば E1, E2 というエンティティがある時
     * E1.append(E2)
     * とすることで E2 を E1 に追加することが出来ます
     * 
     * この時 E1, E2 は親子であると表現できます
     * E1 が親で E2 が子供です
     * 
     * エンティティの親は必ず１つですが子供はいくらでも持つことが出来ます
     * また、子供が子供を持つことも可能です
     */

    // ★黒色の矩形を作成。これを親にします
    const blackRect = new g.FilledRect({
      scene, parent: scene,
      cssColor: "black",
      width: 200, height: 200,
      y: 200,
    });
    // ★灰色の矩形を作成。親は「黒色の矩形」です
    const blackRect_gray = new g.FilledRect({
      scene, parent: blackRect,
      cssColor: "gray",
      width: 50, height: 50,
      x: 100, y: 100,
    });
    // ★白色の矩形を作成。親は「黒色の矩形」です
    const blackRect_whie = new g.FilledRect({
      scene, parent: blackRect,
      cssColor: "white",
      width: 100, height: 100,
      x: 10, y: 10,
    });
    // ★赤色の矩形を作成。親は「白色の矩形」です
    const blackRect_white_red = new g.FilledRect({
      scene, parent: blackRect_whie,
      cssColor: "red",
      width: 50, height: 50,
      x: 10, y: 10,
    });


    /* ==========【子供エンティティの位置】==========
     * 子供のは親の座標を基準に表示されます
     * 親が   X:100 Y:100
     * 子供が X:50  Y:50
     * にある場合、子供は画面上の X:150 Y:150 の位置にあります
     * 
     * 
     * 作成した４つの矩形は次のようになっています
     * scene                         エンティティの座標  画面上の座標
     * |- blackRect                  x:0   y:200         x:0   y:200
     *    |- blackRect_gray          x:100 y:100         x:100 y:300
     *    |- blackRect_whie          x:10  y:10          x:10  y:210
     *       |- blackRect_white_red  x:10  y:10          x:10  y:210
     */


    /* ==========【親子の見え方】==========
     * 親子関係になっているエンティティは子供が手前 (上) に表示されます
     * 親子の表示位置が重なっている場合、子供が見えます
     * 
     * １つの親に複数の子供がいる場合はより後に追加された子供が手前に表示されます
     * 
     * blackRect_gray と blackRect_whie は重なっている部分がありますが、
     * より後に追加された blackRect_whie が手前にあります
     */


    /* ==========【エンティティの種類】==========
     * 全てのエンティティは g.E を元に作られています
     * g.E 自体は何も表示しませんが、複数のエンティティを纏める親としてよく使います
     * 
     * 【Akashic Engine が標準で提供するエンティティ】
     * g.E           : このエンティティは何も表示しません
     * g.FilledRect  : 矩形を表示する
     * g.Label       : 文字を表示する
     * g.Sprite      : 画像を表示する
     * g.FrameSprite : アニメーションを表示する (連続した画像を自動で切り替える)
     * g.Pane        : このエンティティの子はこのエンティティの範囲内のみ見える。外側は表示されない
     * g.CacheableE  : g.Label や g.Pane などの「動的に内容が変わるが再描画コストが重い」エンティティが継承しています
     *                 このエンティティを直接使う事はありません
     * 
     * またこれらの他にライブラリとして提供されるエンティティもあります
     * Akashic Label : ドキュメント https://github.com/akashic-games/akashic-label/blob/master/akashic-label.md
     *                 動作サンプル https://akashic-contents.github.io/samples/basic/akashic-label.html
     * 
     * g.E のドキュメントページ        : https://akashic-games.github.io/akashic-engine/v3/classes/E.html
     * Akashic Engine API ドキュメント : https://akashic-games.github.io/akashic-engine/v3/modules.html
     */


    /* ==========【コラム】==========
     * 【不正な色指定】
     * 矩形などエンティティが要する色に間違った値 (存在しない色) を指定してしまうとその色は「不明」になります
     * 実際に表示される色は「不定」です (動作するブラウザによって変わります)
     * 何故か色がおかしい！という場合は大体これが原因です
     * 
     * 【Akashic Engine で使用可能な色】
     * エンティティの色は「CSS」で指定可能な色を使うことが出来ます
     * ※CSSで指定可能な色の詳細  https://developer.mozilla.org/ja/docs/Web/CSS/color
     * 
     * 色の指定にはその色を表す文字 "red" "blue" や
     * 赤緑青での指定 "#FF0000" "rgb(255,0,0)" などを使えます
     *                           ↑
     * 矢印の先にカラーピッカーが表示されて邪魔な場合は「CTRL ,」でVSCodeの設定を開き
     * editor.colorDecorators で検索してチェックを外すと消えます
     * 
     * 
     * 【EntityTreeツールの使い方】
     * ゲームの実行中に現在のシーンのエンティティを確認出来ます
     * 1. ゲームを実行しているタブの右上の「３つの線」をクリック
     * 2. 画面下側に表示された「EntityTree」クリック
     * 3. 「EntityTree」の中にある「Update」クリック
     * 
     * EntityTree の行をクリックすると選択状態になります
     * 「Update」の左にあるボタンをクリックすると画面上のエンティティを直接クリックして選択できます
     * 
     * EntityTree でエンティティを選択中に「Update」の右にある「console.log()」をクリックすると
     * DevTools の Console タブにそのエンティティの情報が表示されます
     * 
     * 
     * その他の akashic serve 開発者ツールの使い方 「akashic serve の便利機能もろもろ」の項目
     * Link - https://qiita.com/xnv/items/6c328de41ce6939d34d0#akashic-serve-の便利機能もろもろ
     * 
     * ※リンク先の補足) akashic-sandbox は古い開発ツールです
     *                   akashic serve の方が便利で新しい開発ツールです
     */




    // // TODO: この下は後で整理するためのやつ
    // return;

    // /* ==========【エンティティの破棄】==========
    //  * エンティティが不要になったら破棄することができます
    //  * 破棄したエンティティは画面上から消え、登録されていたイベントも呼び出されなくなります
    //  * ※イベントについては BASIC/event で説明します
    //  * 
    //  * 破棄したエンティティに子がいた場合は子も破棄されます
    //  */
    // // ★if (true) にすると paretE は破棄され画面から消えます
    // if (false) {
    //   parentE.destroy();
    // }

    // /* ==========【エンティティの状態を変更する】==========
    //  * 生成したエンティティは後から状態を変更することができます
    //  * ※変更不可能な値もあるのでDOCコメントを読んで下さい (DOCコメント = カーソルを合わせるとでるやつ)
    //  * 
    //  * 特に、見た目に関わる値を変更した場合は modified を呼び出す必要があります
    //  * これを忘れると見た目と実際の位置がずれたりしてあれ？ってなります
    //  */

    // // ★rect1 をクリック可能にする
    // rect1.touchable = true;
    // // ★rect1 をクリックしたときのイベントを追加する
    // rect1.onPointDown.add(() => {
    //   rect1.cssColor = "brown";
    //   rect1.modified();
    //   // 【重要】modified はエンティティの「見た目に関わる値」を変更した時に呼ぶ必要があります
    //   // 呼び出す必要があるかはそれぞれのプロパティの説明に書いてあります
    // });

    // // ★rect2 をクリックした際のイベントを追加する
    // rect2.onPointDown.add(() => {
    //   rect2.x += 10;
    //   rect2.y += 10;
    //   if (rect2.x >= 50) {
    //     rect2.cssColor = "#aa00bb";   // 紫色
    //   }
    //   rect2.modified();
    //   // modified 呼び出す必要のあるプロパティを同時に複数変更した場合
    //   // modified() は１回だけ呼び出します
    // });
  }
}
