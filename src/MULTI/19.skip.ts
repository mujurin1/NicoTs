import { sceneCreateAndSetOnLoad } from "../utils";

/**
 * 追っかけ再生
 */
export function MULTI_skip() {
  sceneCreateAndSetOnLoad(loaded);

  function loaded(scene: g.Scene) {
    // ★ローカルエンティティの作成
    const rect = new g.FilledRect({
      scene, parent: scene,
      cssColor: "blue",
      width: 100, height: 100,
      touchable: true,
      local: true,      // local:true なのでローカルなエンティティです
    });

    /* ==========【追っかけ再生の基本】==========
     * マルチゲームに途中参加した場合は最新の状態までの追っかけ再生が始まります
     * この時は以下の点で通常時と異なります
     * 
     * 【追っかけ再生中の通常時との違い】
     * ・g.game.isSkipping が true になる
     * ・新しい「グローバルイベント」を作れない
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

    // ★ローカルエンティティのクリック操作
    rect.onPointDown.add(() => {
      // rect は local:true なので追っかけ再生中でも受信したクリックイベントを処理します
      console.log("クリック！  追っかけ中?", g.game.isSkipping);
    });

    // ※ニコ生上では追っかけ再生時は画面をクリック出来ないようになっています
  }
}
