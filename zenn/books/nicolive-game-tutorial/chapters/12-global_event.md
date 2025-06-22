---
title: "12.global_event"
---

マルチプレイではプレイヤーの操作が他の参加者にも共有されます。共有されるイベントを「グローバルイベント」、自分だけに届くものを「ローカルイベント」と呼びます。

## 共有と非共有

- エンティティ生成時に `local: true` を指定すると、そのクリックなどはローカルイベントとなり他プレイヤーには届きません。
- `g.game.raiseEvent()` を利用すると任意のデータをグローバルイベントとして送信できます。
- `scene.onMessage` で受信したイベントを処理し、送信元プレイヤーIDなどを参照可能です。

グローバルイベントは途中参加やリプレイでも同じ順序で再生されるため、ゲームの状態を全員で共有する際の基本となります。

### コード例

```ts
export function MULTI_global_event() {
  const scene = new g.Scene({ game: g.game });
  g.game.pushScene(scene);
  scene.onLoad.add(loaded);

  function loaded(scene: g.Scene) {
    const showClickerLabel = new g.Label({
      scene, parent: scene,
      font: createFont({ size: 40 }),
      text: "まだクリックされていません",
      touchable: true,
    });
    showClickerLabel.onPointDown.add(e => {
      showClickerLabel.text = `クリックしたプレイヤー: ${e.player?.id}`;
      showClickerLabel.invalidate();
    });

    let count = 1;
    const incrementLabel = new g.Label({
      scene, parent: scene,
      font: createFont({ size: 40 }),
      text: `あなたの値: ${count}`,
      y: 200,
      touchable: true,
      local: true,
    });
    incrementLabel.onPointDown.add(e => {
      count += 1;
      incrementLabel.text = `あなたの値: ${count}`;
      incrementLabel.invalidate();
    });

    const shareCountLabel = new g.Label({
      scene, parent: scene,
      font: createFont({ size: 40 }),
      text: "まだ共有されていません",
      y: 300,
      touchable: true,
      local: true,
    });
    shareCountLabel.onPointDown.add(e => {
      const customEvent = new g.MessageEvent({ count });
      g.game.raiseEvent(customEvent);
    });

    scene.onMessage.add(e => {
      const sharePlayer = e.player;
      if (sharePlayer == null) return;
      const shareCount = e.data.count;
      if (shareCount == null) return;

      shareCountLabel.text = `共有したプレイヤー: ${sharePlayer.id}  値:${shareCount}`;
      shareCountLabel.invalidate();
    });
  }
}
```
