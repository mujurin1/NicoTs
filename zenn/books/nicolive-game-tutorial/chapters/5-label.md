---
title: "5.label"
---

文字を表示するには `g.Label` エンティティを使用します。表示にはフォントが必要で、このチュートリアルでは `g.DynamicFont` を利用します。

## 基本手順

1. `g.DynamicFont` を生成してフォントを準備
2. ラベル作成時に `text` と `font` を指定
3. `scene.append()` で画面へ追加

フォント生成は少し煩雑なため、共通処理を `createFont()` として util 化すると便利です。複数行表示やルビが必要な場合は公式の `akashic-label` ライブラリも検討してください。

### コード例

```ts
  scene.onLoad.add(loaded);

  function loaded(scene: g.Scene) {
    /* ==========【ラベル】==========
     * Akashic Engine では文字を表示することも出来ます
     * 文字を表示するエンティティは g.Label です
     * これを特にラベルと呼びます
     *
     * ラベルでは scene の他に次の値が必須です
     * ・text      - 文字
     * ・font      - フォント
     */

    // ★まずは g.DynamicFont を作成します
    const font = new g.DynamicFont({
      game: g.game,
      fontFamily: "sans-serif",
      size: 40,
    });

    // ★作成したフォントを使ってラベルを作ります
    const label = new g.Label({
      scene, parent: scene,
      font,
      text: "文字を表示します",
      x: 200,
    });

    const x = new g.Label({
      scene, parent: scene,
      font: createFont({ size: 20 }),
      text: "createFont でフォントを作りました",
      x: 200, y: 500,
    });
  }
```
