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
