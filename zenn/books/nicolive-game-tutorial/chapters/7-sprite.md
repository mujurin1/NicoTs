---
title: "7.sprite"
---

画像を表示するには `g.Sprite` を利用します。スプライトは画像アセットを `src` に指定して生成し、シーンへ追加すると画面に描画されます。

## 主な機能

- `srcX/srcY` と `width/height` で画像の一部を切り抜いて表示可能
- `srcWidth/srcHeight` を使うとスプライトのサイズを変えずに表示範囲だけを指定できる
- `scaleX/scaleY` による拡大縮小も利用でき、クリック判定も見た目に合わせて行われます

画像をまとめて管理したい場合は pack-image などのツールでアトラス化する方法もあります。

### コード例

```ts
  const scene = new g.Scene({
    game: g.game,
    assetIds: ["500x500", "player"]
  });
  g.game.pushScene(scene);
  scene.onLoad.add(loaded);

  function loaded(scene: g.Scene) {
    const spriteAsset = scene.asset.getImageById("500x500");
    const playerAsset = scene.asset.getImageById("player");

    const sprite = new g.Sprite({
      scene, parent: scene,
      src: spriteAsset,
    });

    const cutSprite = new g.Sprite({
      scene, parent: scene,
      src: spriteAsset,
      y: 550,
      srcX: 100 * 0,
      srcY: 100 * 1,
      width: 100, height: 100,
    });

    const player100x100Px = new g.Sprite({
      scene, parent: scene,
      src: playerAsset,
      x: 600, y: 100,
      touchable: true,
      width: 100, height: 100,
      srcWidth: playerAsset.width,
      srcHeight: playerAsset.height,
    });

    const player100x100Scale = new g.Sprite({
      scene, parent: scene,
      src: playerAsset,
      x: 600, y: 300,
      touchable: true,
      scaleX: 100 / playerAsset.width,
      scaleY: 100 / playerAsset.height,
    });

    player100x100Px.onPointDown.add(() => {
      player100x100Px.x += 1;
      player100x100Px.modified();
    });
    player100x100Scale.onPointDown.add(() => {
      player100x100Scale.x += 1;
      player100x100Scale.modified();
    });
  }
```
