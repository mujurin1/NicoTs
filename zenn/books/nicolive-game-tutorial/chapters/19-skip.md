---
title: "19.skip"
---

マルチプレイゲームでは途中参加者向けに過去の操作を早送りで再生する「追っかけ再生」が行われます。追っかけ再生中は `g.game.isSkipping` が `true` となり、グローバルイベントの送信は無効になります。

`onUpdate` で `isSkipping` を監視しておけば再生開始・終了を検知できます。ローカルイベントは有効なので、追っかけ再生中にだけ実行したい処理があればここで制御しましょう。

### コード例

```ts
export function MULTI_skip() {
  const scene = new g.Scene({ game: g.game });
  g.game.pushScene(scene);
  scene.onLoad.add(loaded);

  function loaded(scene: g.Scene) {
    const rect = new g.FilledRect({
      scene, parent: scene,
      cssColor: "blue",
      width: 100, height: 100,
      touchable: true,
    });

    let beforeIsSkipping = false;
    g.game.onUpdate.add(() => {
      if (beforeIsSkipping === g.game.isSkipping) return;
      beforeIsSkipping = g.game.isSkipping;

      if (g.game.isSkipping) {
        console.log("追っかけ再生が始まりました");
        rect.cssColor = "red";
      }
      else {
        console.log("追っかけ再生が終了しました");
        rect.cssColor = "blue";
      }
      rect.modified();
    });
  }
}
```
