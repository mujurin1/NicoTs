---
title: "19.skip"
---
\n\n```ts
/**
 * 追っかけ再生
 */
export function MULTI_skip() {
  const scene = new g.Scene({ game: g.game });
  g.game.pushScene(scene);
  scene.onLoad.add(loaded);

  function loaded(scene: g.Scene) {
    // ★グローバルエンティティ
    const rect = new g.FilledRect({
      scene, parent: scene,
      cssColor: "blue",
      width: 100, height: 100,
      touchable: true,
    });

    /* ==========【追っかけ再生】==========
     * マルチゲームに途中参加した場合は最新の状態までの追っかけ再生が始まります
     * この時は以下の点で通常時と異なります
     * 
     * ・g.game.isSkipping が true になる
     * ・グローバルイベントを共有できない
     * 
     * 追っかけ再生中に画面をクリックしたり
     * その他グローバルイベントを共有するプログラムが動いても
     * 実際には何も共有されません
     * 
     * 追っかけ再生中でない時のみグローバルイベントの共有が可能です
     * 
     * 
     * ただしローカルイベントは発生します
     * 
     * ニコ生ゲームでは追っかけ再生中はゲーム画面をクリック出来ないようになっていますが
     * Akashic Engine 的には追っかけ再生中のローカルエンティティのクリック操作は有効です
     */

    // ★追っかけ再生状態の変化を監視
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
