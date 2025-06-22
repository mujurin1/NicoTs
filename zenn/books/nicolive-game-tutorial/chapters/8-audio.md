---
title: "8.audio"
---

音声を扱うには音声アセットを用意し、シーン生成時に `assetIds` として読み込んでおきます。取得した `AudioAsset` の `play()` を呼ぶと `AudioPlayer` が返り、再生・停止や音量調整を行えます。

## 注意点

- BGM と SE では systemId が異なり、BGM はループ再生が前提
- 音量は `g.game.audio.music.volume` などで全体を、`AudioPlayer.changeVolume()` で個別を変更
- `stopAll()` で全て停止、`stop()` で個別停止

BGM の同時再生やフェード処理には `g.AudioPlayContext` を使うと便利です。音声ファイルは `.ogg` と `.m4a` など二種類を用意しましょう。

### コード例

```ts
  const SE_ASSET_ID = "nc289355";

  const scene = new g.Scene({
    game: g.game,
    assetIds: [BGM_ASSET_ID, SE_ASSET_ID]
  });
  g.game.pushScene(scene);
  scene.onLoad.add(loaded);

  function loaded(scene: g.Scene) {
    const bgm = scene.asset.getAudioById(BGM_ASSET_ID);
    const se = scene.asset.getAudioById(SE_ASSET_ID);

    let bgmPlay = bgm.play();
    let sePlay = se.play();

    g.game.audio.music.volume = 0.5;
    g.game.audio.sound.volume = 0.5;

    bgmPlay.changeVolume(0.2);

    const stop = new g.Label({
      scene, parent: scene,
      text: "BSM/SE を停止する",
      font: createFont({ size: 40 }),
      touchable: true
    });
    stop.onPointDown.add(() => {
      g.game.audio.music.stopAll();
      g.game.audio.sound.stopAll();
    });

    const play = new g.Label({
      scene, parent: scene,
      text: "BSM/SE を再生する",
      font: createFont({ size: 40 }),
      y: 40,
      touchable: true
    });
    play.onPointDown.add(() => {
      bgmPlay.stop();
      sePlay.stop();
      bgmPlay = bgm.play();
      sePlay = se.play();
    });
  }
```
