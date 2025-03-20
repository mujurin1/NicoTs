
// 
// このファイルには重要でない部分の記述量を減らすために使う関数を置いています
// 


/**
 * シーンを作成・遷移し、準備完了時のイベントを登録します
 * * シーンを生成
 * * ゲームのシーンを変更
 * * シーン準備完了時のイベントを登録
 * @param loaded シーンの準備が完了した時に実行する関数
 * @param sceneParam 生成するシーンの引数. `game`は自動で設定されます
 * @returns 生成したシーン
 */
export function sceneCreateAndSetOnLoad(
  loaded: (scene: g.Scene) => void,
  sceneParam?: Omit<g.SceneParameterObject, "game">,
): g.Scene {
  const scene = new g.Scene({ game: g.game, ...sceneParam });
  g.game.pushScene(scene);
  scene.onLoad.add(loaded);
  return scene;
}

type DynamicFontParameterObjectSlim = Partial<Omit<g.DynamicFontParameterObject, "game">> & {
  size: number;
};
/**
 * 簡単にフォントを作成するための関数  
 * `fontFamily`未指定時は`"sans-serif"`を使用します
 */
export function createFont(param: DynamicFontParameterObjectSlim): g.DynamicFont {
  return new g.DynamicFont({
    game: g.game,
    fontFamily: param.fontFamily ?? "sans-serif",
    ...param,
  });
}
