---
title: "5.label"
---

文字を表示するには `g.Label` エンティティを使用します。表示にはフォントが必要で、このチュートリアルでは `g.DynamicFont` を利用します。

## 基本手順

1. `g.DynamicFont` を生成してフォントを準備
2. ラベル作成時に `text` と `font` を指定
3. `scene.append()` で画面へ追加

フォント生成は少し煩雑なため、共通処理を `createFont()` として util 化すると便利です。複数行表示やルビが必要な場合は公式の `akashic-label` ライブラリも検討してください。
