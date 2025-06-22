---
title: "6.asset"
---

画像や音声などのリソースは「アセット」として `game.json` に登録します。追加・削除・更新した際は `akashic scan asset` を実行して一覧を更新しましょう。

## アセットの利用手順

1. シーン生成時の `assetIds` で使用するアセットIDを列挙
2. `scene.onLoad` でアセットの読み込み完了を待つ
3. `scene.asset.getImageById()` や `getAudioById()` で取得して利用

アセット取得後はスプライトや音声再生に利用できます。詳細な使い方は各章（sprite/audio）で解説します。

### コード例

```ts
export function BASIS_asset() {
  /* ==========【アセットの基本】==========
   * Akashic Engine では画像や音声などをアセットとして扱います
   * アセットは以下の種類があります
   * | image  | png jpeg 形式の画像 |
   * | audio  | ogg と m4a 形式 (または aac) の音声 |
   */

  // ★シーンの作成とアセット指定
  const scene = new g.Scene({
    game: g.game,
    assetIds: ["player", "shot", "se"],
  });
  g.game.pushScene(scene);
  scene.onLoad.add(loaded);

  function loaded() {
    // ★アセットの取得
    const playerAsset = scene.asset.getImageById("player");
    const shotAsset = scene.asset.getImageById("shot");
    const shotSeAsset = scene.asset.getAudioById("se");

    // ★画像アセットを使う
    const player = new g.Sprite({
      scene, parent: scene,
      src: playerAsset,
      x: 100, y: 100,
    });

    // ★画面クリック時のショット発射とサウンド再生
    scene.onPointDownCapture.add(() => {
      const shot = new g.Sprite({
        scene, parent: scene,
        src: shotAsset,
        x: player.x + player.width,
        y: player.y + player.height / 2 - shotAsset.height / 2,
      });
      shot.onUpdate.add(() => {
        shot.x += 10;
        shot.modified();
        if (shot.x >= g.game.width) shot.destroy();
      });

      const se = shotSeAsset.play();
      se.changeVolume(0.1);
    });
  }
}
```
