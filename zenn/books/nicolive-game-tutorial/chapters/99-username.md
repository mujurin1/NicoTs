---
title: "99.username"
---

プレイヤー名を取得するには `@akashic-extension/resolve-player-info` を利用します。ボタンを押すとダイアログが表示され、許可された場合にユーザー名が取得できます。

取得した情報にはアカウント名かどうかのフラグも含まれるため、ゲストか生ユーザーかを判別可能です。取得結果をラベルに表示して確認してみましょう。

### コード例

```ts
export function MULTI_username() {
  const scene = new g.Scene({ game: g.game });
  g.game.pushScene(scene);
  scene.onLoad.add(loaded);

  function loaded(scene: g.Scene) {
    const font = createFont({ size: 20 });

    const label = new g.Label({
      scene, parent: scene,
      font,
      text: "ユーザー名を取得する",
      x: 10, y: 10,

      touchable: true,
      local: true,
    });
    scene.append(label);

    label.onPointDown.add(() => {
      resolvePlayerInfo(
        { limitSeconds: 20 },
        (err, info) => {
          if (err != null || info == null || info.name == null) return;

          const userId = g.game.selfId;
          const name = info.name;
          const isRealName = info.userData.accepted;

          label.text = `ID:${userId}  ユーザー名:${name}  (${isRealName ? "生ユーザー名" : "ゲスト名"})`;
          label.invalidate();
        });
    });
  }
}
```
