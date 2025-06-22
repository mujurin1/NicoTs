---
title: "6.asset"
---

画像や音声などのリソースは「アセット」として `game.json` に登録します。追加・削除・更新した際は `akashic scan asset` を実行して一覧を更新しましょう。

## アセットの利用手順

1. シーン生成時の `assetIds` で使用するアセットIDを列挙
2. `scene.onLoad` でアセットの読み込み完了を待つ
3. `scene.asset.getImageById()` や `getAudioById()` で取得して利用

アセット取得後はスプライトや音声再生に利用できます。詳細な使い方は各章（sprite/audio）で解説します。
