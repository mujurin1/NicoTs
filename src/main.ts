import { BASIS_minimal } from "./BASIS/1.minimal";
import { BASIS_update } from "./BASIS/10.update";
import { BASIS_game } from "./BASIS/2.game";
import { BASIS_entity } from "./BASIS/3.entity";
import { BASIS_label } from "./BASIS/4.label";
import { BASIS_scene } from "./BASIS/5.scene";
import { BASIS_asset } from "./BASIS/6.asset";
import { BASIS_sprite } from "./BASIS/7.sprite";
import { BASIS_audio } from "./BASIS/8.audio";
import { BASIS_event } from "./BASIS/9.event";
import { MULTI_onJoin } from "./MULTI/11.onJoin";
import { MULTI_global_event } from "./MULTI/12.global_event";
import { MULTI_local } from "./MULTI/13.local";
import { MULTI_custom_event } from "./MULTI/14.custom_event";
import { MULTI_skip } from "./MULTI/19.skip";
import { MULTI_username } from "./MULTI/99.username";

export = (gameMainParam: g.GameMainParameterObject) => {
  /* ==========【チュートリアルの進め方】==========
   * 1. 読みたいチュートリアルの関数の左の false を true に変更
   * 2. 保存 & 再実行 (保存のショートカットキー「CTRL S」)
   * 3. 関数の定義へジャンプ (CTRL クリック) して内容を読んでください
   * ※2つ以上同時に true にしないでください
   * 
   * `npm run serve:watch` で実行している場合は保存「CTRL S」するたびに再実行されます
   * ※極稀にタブの状態が壊れます. その場合はブラウザのタブリロードを行ってください
   *   リロードで解決しない場合は `npm run serve:watch` を再実行してください
   * 
   * 説明の最後に【コラム】がある場合があります
   * これは最初は読まなくても問題ない内容ですが、よくある落とし穴だったり
   * より開発を楽にする方法・ツールなどを紹介しています
   */

  // 【基本編】
  if (false) BASIS_minimal();       // 1. マルチプレイの小さいサンプル
  if (false) BASIS_game();          // 2. g.game について
  if (false) BASIS_entity();        // 3. エンティティとは
  if (false) BASIS_label();         // 4. 文字を表示する (ラベルとフォント)
  if (false) BASIS_scene();         // 5. シーン (g.Scene)
  if (false) BASIS_asset();         // 6. アセットの使い方
  if (false) BASIS_sprite();        // 7. 画像アセット
  if (false) BASIS_audio();         // 8. 音声アセット
  if (false) BASIS_event();         // 9. イベントという仕組み
  if (false) BASIS_update();        // 10. 時間/時間経過イベント

  // 【マルチプレイ編】
  if (false) MULTI_onJoin();        // 11. 生主の参加イベント
  if (true) MULTI_global_event();  // 12. プレイヤー間での操作の共有
  if (false) MULTI_local();         // 13. プレイヤー間で共有したくない操作
  if (false) MULTI_custom_event();  // 14. 好きなデータを共有する

  if (false) MULTI_skip();          // 19. 追っかけ再生
  if (false) MULTI_username();      // 99. ユーザー名の取得
};
