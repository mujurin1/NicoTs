---
title: "10.update"
---

時間の扱いは `onUpdate` や `setTimeout` などのイベントを通じて行います。`onUpdate` は1フレームごとに呼び出され、`setTimeout`/`setInterval` は一定時間後または一定間隔で処理を実行します。

## 例

```ts
scene.onUpdate.add(() => { /* 毎フレーム処理 */ });
const id = scene.setTimeout(() => { /* 1回だけ */ }, 3000);
```

タイマーは `clearTimeout`/`clearInterval` で解除できます。時間管理はエンジンに任せることでマルチプレイやリプレイ再生時も正しく動作します。

### コード例

```ts
export function BASIS_update() {
  const scene = new g.Scene({ game: g.game });
  g.game.pushScene(scene);
  scene.onLoad.add(loaded);

  function loaded(scene: g.Scene) {
    let timeCount = 0;
    scene.onUpdate.add(() => {
      timeCount += 1;
      if (timeCount >= g.game.fps) {
        timeCount = 0;
        console.log("１秒経過");
      }
    });

    const timeoutId = scene.setTimeout(
      () => console.log("３秒経過！！！！！(このログは１回しか出力されません)"),
      3000
    );
    const intervalId = scene.setInterval(
      () => console.log("５秒経過"),
      5000
    );
    if (false) {
      scene.clearTimeout(timeoutId);
      scene.clearInterval(intervalId);
    }
  }
}
```
