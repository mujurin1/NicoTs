import { createFont, sceneCreateAndSetOnLoad } from "../utils";

/**
 * 好きなデータを共有する
 */
export function MULTI_custom_event() {
  sceneCreateAndSetOnLoad(loaded);

  function loaded(scene: g.Scene) {
    /* ==========【カスタムイベントの基本】==========
     * 
     * クリック操作を共有する方法は知りましたが、任意のデータを共有するにはどうすれば良いでしょうか
     * 
     * 今回のサンプルは次の事を行っています
     * ・各プレイヤーごとにカウントを持つ
     * ・プレイヤーは自分のカウントを共有できる
     * ・全プレイヤーは共有されたカウント値、共有したプレイヤーIDを表示する
     */
    let count = 0;

    // ★カウントアップボタンの作成
    const countUp = new g.Label({
      scene, parent: scene,
      font: createFont({ size: 100 }),
      text: "＋１",
      x: 30, y: 10,
      touchable: true,
      local: true,      // ローカルエンティティです
    });

    // ★カウントダウンボタンの作成
    const countDown = new g.Label({
      scene, parent: scene,
      font: createFont({ size: 100 }),
      text: "－１",
      x: 30, y: 140,
      touchable: true,
      local: true,      // ローカルエンティティです
    });

    // ★ボタンの操作を設定
    countUp.onPointDown.add(() => setCount(count + 1));
    countDown.onPointDown.add(() => setCount(count - 1));

    // ★自分のカウント表示
    const myCount = new g.Label({
      scene, parent: scene,
      font: createFont({ size: 70 }),
      text: "自分の値: 0",
      x: 300, y: 10,
      local: true,      // ローカルエンティティです
    });

    // ★共有ボタンの作成
    const shareCount = new g.Label({
      scene, parent: scene,
      font: createFont({ size: 70 }),
      text: "クリックして自分の値を共有",
      x: 300, y: 140,
      touchable: true,
      local: true,      // ローカルエンティティです
    });

    // ★共有ボタンのクリック操作
    shareCount.onPointDown.add(() => {
      // 自分の count を共有するグローバルイベントを作成
      const shareCountEvent = new g.MessageEvent({ count });
      // 作成したグローバルイベントを送信
      g.game.raiseEvent(shareCountEvent);
    });

    // ★共有されたイベントを受信する処理
    scene.onMessage.add(e => {
      const sharedValue = e.data.count;
      if (sharedValue == null) return;

      shareCount.text = `共有された値: ${sharedValue}  by: ${e.player?.id}`;
      shareCount.invalidate();
    });

    // ★カウント値を設定する関数
    function setCount(value: number): void {
      count = value;
      myCount.text = `自分の値: ${count}`;
      myCount.invalidate();
    }

    /* ==========【カスタムイベントの作成と共有】==========
     * 
     * このサンプルの重要な部分を説明します
     * 
     * 【カウントとそれを変更するためのエンティティ】
     * > let count = 0;
     * > const countUp = new g.Label(...);
     * > const countDown = new g.Label(...);
     * 
     * これらのエンティティはローカルエンティティです
     * 「各プレイヤーごとに固有な値」つまりローカルな値を操作するエンティティだからです
     * 
     * 
     * 【自分の値を共有する】
     * > const shareCount = new g.Label(...);
     * > 
     * > // shareCount.onPointDown.add に渡した関数の中
     * > const shareCountEvent = new g.MessageEvent({ count });
     * > g.game.raiseEvent(shareCountEvent);
     * 
     * shareCount はローカルです
     * shareCount をクリックすると現在の自分の値を共有します
     * 
     * g.MessageEvent はゲーム開発者が任意のデータを共有するために使用します
     * 作成した g.MessageEvent を g.game.raiseEvent に渡すことでそのイベントを共有することができます
     * 
     * 
     * 【共有されたイベントを処理する】
     * > scene.onMessage.add(e => { ... });
     * 
     * g.game.raiseEvent で共有されたイベントは scene.onMessage.add で登録した関数が処理します
     * これはクリックイベントの entity.onPointDown.add のカスタムイベント版です
     * 
     * 受信したイベントは次の値を持っています
     * ・player   そのイベントを送信したプレイヤー
     * ・data     そのイベントで共有されたデータ
     * 
     * 特に data は new g.MessageEvent に渡した値がそのまま入っています
     */

    /* ==========【カスタムイベント使用時の注意点】==========
     * 
     * 【重要】g.game.raiseEvent を使う時は必ず
     * ローカルな処理 (ローカルエンティティのクリック操作など) 
     * から呼び出す必要があります
     * 
     * グローバル処理 (グローバルエンティティのクリック処理など)
     * から呼び出してはダメです
     * 
     * 理由：グローバルイベントは全プレイヤーが同様に処理するため
     *     全く同じグローバルイベントを参加中のプレイヤー数分共有するのは無駄 (意味がない)
     * 
     * ただしグローバルイベントの中でそのプレイヤー固有の状態で分岐した場合はこの限りではないです
     * 「そのイベントを処理するプレイヤー」に依存するものがローカルな処理です
     * 「そのイベントを共有したプレイヤー」ではありません
     */

    /* ==========【共有可能なデータの種類】==========
     * 
     * 共有可能な値は「基本的に」次のとおりです
     * ・Symbol を除く JavaScript のプリミティブ値 (string, number, boolean, null など)
     * ・上記の値からなるオブジェクト・配列
     * 
     * Akashic Engine 的には上記以外は全て「未定義」です
     * 実際に何が共有できるかはゲームをホストするサービス (例: ニコ生) によって決まります
     * 
     * 複雑なデータ構造を共有する場合は、できるだけシンプルな形に変換して
     * 共有することをおすすめします
     */
  }
}
