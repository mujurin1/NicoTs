---
title: "8.audio"
---

音声を扱うには音声アセットを用意し、シーン生成時に `assetIds` として読み込んでおきます。取得した `AudioAsset` の `play()` を呼ぶと `AudioPlayer` が返り、再生・停止や音量調整を行えます。

## 注意点

- BGM と SE では systemId が異なり、BGM はループ再生が前提
- 音量は `g.game.audio.music.volume` などで全体を、`AudioPlayer.changeVolume()` で個別を変更
- `stopAll()` で全て停止、`stop()` で個別停止

BGM の同時再生やフェード処理には `g.AudioPlayContext` を使うと便利です。音声ファイルは `.ogg` と `.m4a` など二種類を用意しましょう。
