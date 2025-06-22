---
title: "11.onJoin"
---

`g.game.onJoin` は生主がゲームに参加した瞬間に一度だけ発生するイベントです。通常のプレイヤー参加通知とは用途が異なり、ニコ生ゲームでは生主の参加を検知するために利用します。

シーンの準備 (`scene.onLoad`) が完了してからでないと `onJoin` は呼び出されないため、最初のシーンを表示する際に登録しておきましょう。

### コード例

```ts
export function MULTI_onJoin() {
  g.game.onJoin.add(e => {
    const hostId = e.player.id;
    const hostName = e.player.name;

    console.log("生主が参加したよ");
    console.log("生主のID", hostId);
    console.log("生主の名前", hostName);
  });

  const scene = new g.Scene({ game: g.game });
  g.game.pushScene(scene);
  scene.onLoad.add(loaded);

  function loaded() {
    console.log("シーンが読み込まれたよ！");
  }
}
```
