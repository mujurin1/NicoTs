---
title: "2.game"
---

`g.game` はゲーム全体の情報やユーティリティを提供するオブジェクトです。シーンの作成には必須で、プレイヤー情報や乱数生成などにも利用します。

## 主な機能

- `g.game.selfId` で現在のプレイヤーIDを取得
- `g.game.width`, `g.game.height`, `g.game.fps` でゲーム設定を参照
- マルチプレイ時にはカスタムイベントの送受信やスキップ状態の確認も可能

詳しいAPIは公式ドキュメントを参照してください。

### コード例

```ts
/**
 * g.game について
 */
export function BASIS_game() {
  // ★シーンを作成するには g.game が必要です
  const scene = new g.Scene({ game: g.game });
  g.game.pushScene(scene);
  scene.onLoad.add(loaded);


  function loaded(scene: g.Scene) {
    /* ==========【g.game】==========
     * Akashic Engien でたまに使う g.game というものがあります
     * これはゲームの全体的な情報を取ったり色々する時に使います
     *
     * g.game はゲームの全体的な情報の確認や、
     * 色んな場面で使います
     *
     * g.game の存在だけ知っておいてください
     *
     * g.game で出来ること
     * ・プレイヤーの情報を取得する
     * ・ゲームの情報を取得する
     * ・乱数を発生させる
     * ・グローバルアセットを取得する
     * ・カスタムイベントを発生させる (マルチプレイのみ)
     * ・ゲームがスキップ中か調べる (マルチプレイのみ)
     * ・スナップショットを保存する (マルチプレイのみ) (高度な機能)
     *
     *
     * 詳しくは公式のAPIドキュメント参照
     * Link - https://akashic-games.github.io/akashic-engine/v3/classes/Game.html
     */
    console.log(`プレイヤーID:${g.game.selfId}`);
    console.log(`width:${g.game.width}  height:${g.game.height}  fps:${g.game.fps}`);
    console.log(`スキップ中？ ${g.game.isSkipping}`);
  }
}
```
