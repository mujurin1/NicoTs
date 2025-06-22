---
title: "11.onJoin"
---
\n\n```ts
/**
 * 生主の参加
 */
export function MULTI_onJoin() {
  /* ==========【生主参加イベントの基本】==========
   * Akashic Engine には Join/Leave といったイベントが用意されています
   * が、このイベントの役割は何かややこしいです
   * 
   * 特にニコ生ゲームを作る場合は次のように考えてください
   * 
   * Join  - 生主が参加した時に１度だけ実行される
   * Leave - ニコ生ゲームでは発生する事はありえない。知らなくていい
   * 
   * ということで、生主が参加したことを特別に知るためには
   * Join イベントを使用します
   */

  // ★生主参加時のイベントを登録
  g.game.onJoin.add(e => {
    const hostId = e.player.id;
    const hostName = e.player.name; // 生主の名前はこれで取れるらしい？

    console.log("生主が参加したよ");
    console.log("生主のID", hostId);
    console.log("生主の名前", hostName);
  });

  // ★シーンの作成と表示
  const scene = new g.Scene({ game: g.game });
  g.game.pushScene(scene);
  scene.onLoad.add(loaded);

  function loaded() {
    console.log("シーンが読み込まれたよ！");
  }


  /* ==========【重要】Join イベントの発生タイミング==========
   * Join イベントが発生する正確なタイミングは次の時です
   * 「生主がゲームを起動して最初のシーンの準備が完了した時」
   * 
   * なのでまずシーンの準備が完了しないと Join イベントは発生しません
   * 生主が参加してから最初のシーンを用意するプログラムは永久に始まらないので注意してください
   */
}
```
