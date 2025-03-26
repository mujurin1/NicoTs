import { resolvePlayerInfo } from "@akashic-extension/resolve-player-info";
import { createFont } from "../utils";

/** 名前を取得済みのユーザーの一覧 */
let users = new Map<string, { name: string; isRealName: boolean; }>();
/**
 * 
 * @param id 参加したプレイヤーのID
 * @param name プレイヤー名
 * @param isRealName 生ユーザー名かどうか
 */
function addUser(id: string, name: string, isRealName: boolean) {
  const isNewUser = !users.has(id);
}

/**
 * ユーザー名の取得
 */
export function MULTI_username() {
  const scene = new g.Scene({ game: g.game });
  g.game.pushScene(scene);
  scene.onLoad.add(loaded);

  function loaded(scene: g.Scene) {
    const font = createFont({ size: 20 });

    const label = new g.Label({
      scene, parent: scene,
      font,
      text: "ユーザー名を取得する",
      x: 10, y: 10,

      touchable: true,
      // プレイヤー名の取得は各プレイヤー毎に行いたいので local:true を指定
      local: true,
    });
    scene.append(label);

    label.onPointDown.add(() => {
      // `resolvePlayerInfo` はプレイヤー名を取得する関数です
      // プレイヤー名の取得が 成功/失敗 すると第２引数で渡した関数が実行されます
      resolvePlayerInfo(
        // プレイヤー名を取得する時の設定
        { limitSeconds: 20 },

        // プレイヤー名を取得した時に呼び出される関数
        (err, info) => {
          // このif文は必須です。プレイヤーの状態が壊れるのを防ぐためです
          if (err != null || info == null || info.name == null) return;

          const userId = g.game.selfId;
          const name = info.name;
          /** アカウントのユーザー名かどうか */
          const isRealName = info.userData.accepted;

          label.text = `ID:${userId}  ユーザー名:${name}  (${isRealName ? "生ユーザー名" : "ゲスト名"})`;
          label.invalidate();
        });
    });
  }
}
