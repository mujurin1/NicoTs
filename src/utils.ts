
// 
// このファイルには重要でない部分の記述量を減らすために使う関数を置いています
// 

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
