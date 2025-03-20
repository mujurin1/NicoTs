import { createFont, sceneCreateAndSetOnLoad } from "../utils";

/**
 * プレイヤー間で共有したくない操作
 */
export function MULTI_local() {
  sceneCreateAndSetOnLoad(loaded);

  function loaded(scene: g.Scene) {
    /* ==========【ローカルエンティティの基本】==========
     * local:true にするとそのエンティティの操作は共有されません
     */
    let clickCount = 0;
    // ★ローカルエンティティを作成する
    const localEntity = new g.Label({
      scene, parent: scene,
      font: createFont({ size: 40 }),
      text: "まだクリックされていません",
      touchable: true,

      // ローカルエンティティを作成する場合は必ず local:true の指定が必要です
      local: true,
    });

    // ★ローカルエンティティのクリック操作を登録する
    localEntity.onPointDown.add(() => {
      clickCount += 1;
      localEntity.text = `クリック回数: ${clickCount}回`;
      localEntity.invalidate();
    });

    scene.onPointDownCapture.add(() => console.log("MSG"));

    /* ==========【エンティティのローカル/グローバルに関する注意点】==========
     * 
     * エンティティのローカル/グローバルを気にする必要があるエンティティは
     * touchable:true になる可能性のあるエンティティのみです
     * 
     * 【重要なポイント】
     * ・生成されてからゲームが終わるまでずっと touchable:false なエンティティはどっちでも良い
     * ・クリック操作以外にエンティティの状態がイベントに関与することはない
     * 
     * 【グローバルエンティティの注意点】
     * local:false かつ touchable:true なエンティティの
     * クリック判定に関わる値は全てのプレイヤーで同じにする必要があります
     * 例) touchable, x, y, width, height など
     * 
     * グローバルエンティティでこれらの値がプレイヤーによって違うと
     * 共有されたクリックイベントにより発生するクリックイベントが
     * プレイヤーによって変わってしまうためです
     */
  }
}
