import { Label } from "@akashic-extension/akashic-label";
import { createFont } from "../utils";

/**
 * 音声アセット
 */
export function BASIS_audio() {
  // ★使用するアセットのID
  const BGM_ASSET_ID = "MusMus-BGM-103";
  const SE_ASSET_ID = "nc289355";

  const scene = new g.Scene({
    game: g.game,
    assetIds: [BGM_ASSET_ID, SE_ASSET_ID]
  });
  g.game.pushScene(scene);
  scene.onLoad.add(loaded);

  function loaded(scene: g.Scene) {
    /* ==========【音声アセットの基本】==========
     * 音を再生するには音声アセットを使用します
     * 音声アセットを扱う際には注意することが２つあります
     * 1. BGM と SE の違い
     * 2. 必要なファイルは２種類
     * 
     * 【BGM と SE の違い】
     * BGM と SE はどちらも音声ですが次の違いがあります
     * 
     * |            | BGM                         | SE         |
     * | ---------- | --------------------------- | ---------- |
     * | ループ再生 | 必ずループ再生になる        | 不可能     |
     * | 同時再生   | 同時に１つまで (回避策あり) | いくつでも |
     * | systemId   | "music"                     | "sound"    |
     * 
     * game.json に記述される systemId によって BGM/SE のどちらかが決まります
     * `akashic scan asset` を実行すると systemId:"sound" として登録されます
     * BGM として 利用したい場合は "music" に手動で変更する必要があります
     * 
     * 
     * 【必要なファイルは２種類】
     * 音声ファイルは２種類用意する必要があります
     * その２つの組み合わせは次のどちらかです
     * > .ogg と .m4a
     * > .ogg と .aac
     * 
     * ※拡張子を除くファイル名はどちらも同じ名前にする必要があります
     * 
     * ２つのファイルを用意するために便利なコンバーターが Akashic Engine 公式で提供されています
     * 最後のコラムで解説します
     */

    // ★音声アセットの取得
    const bgm = scene.asset.getAudioById(BGM_ASSET_ID);
    const se = scene.asset.getAudioById(SE_ASSET_ID);


    /* ==========【音量の再生】==========
     * BGM/SE どちらも取得したアセットの play 関数を呼ぶことで音声を再生できます
     * 
     * play 関数を呼ぶと再生中の音声の操作を行う AudioPlayer が手に入ります
     */

    // ★音声の再生
    let bgmPlay = bgm.play();
    let sePlay = se.play();


    /* ==========【音量の調整方法】==========
     * BGM/SE の音量を変更する方法は２つあります
     * 1. 全体音量を変える
     * 2. 再生中の音声ごとに個別で設定する
     * 
     * 最終的な音量は「全体で設定された音量」掛ける「個別の音量」になります
     * 
     * 音量の変更は再生中の音声アセットにも適用されます
     * 
     * 全体の音量はそれぞれ次の値を変更します
     * BGM - g.game.audio.music.volume
     * SE  - g.game.audio.sound.volume
     * 
     * 個別の音量は play 関数を実行して手に入る AudioPlayer の
     * AudioPlayer.changeVolume 関数を使用します
     */

    // ★全体音量の変更
    g.game.audio.music.volume = 0.5; // 全ての BGM に反映  0~1 の範囲内
    g.game.audio.sound.volume = 0.5; // 全ての SE  に反映  0~1 の範囲内

    // ★個別音量の変更
    bgmPlay.changeVolume(0.2);
    // sePlay.changeVolume(0.2);       // 音量が小さすぎて聞こえないのでコメントアウト

    // 全体の音量: 0.5
    // 個別の音量: 0.2
    // なので最終的な音量は 0.5 * 0.2 = 0.1 になります


    /* ==========【音声を止める】==========
     * 音声を止める方法も全体/個別の２つあります
     * 
     * 全体の停止はそれぞれ次の関数を使います
     * BGM - g.game.audio.music.stopAll
     * SE  - g.game.audio.sound.stopAll
     * 
     * 個別の停止は play 関数を実行して手に入る AudioPlayer の
     * AudioPlayer.stop 関数を使用します
     */


    // ★停止ボタンの作成
    const stop = new g.Label({
      scene, parent: scene,
      text: "BSM/SE を停止する",
      font: createFont({ size: 40 }),
      touchable: true
    });
    stop.onPointDown.add(() => {
      // ★全体で停止する
      g.game.audio.music.stopAll();   // 再生中の全ての BGM を停止
      g.game.audio.sound.stopAll();   // 再生中の全ての SE  を停止

      // // ★個別で停止
      // bgmPlay.stop();
      // sePlay.stop();
    });

    /* ==========【音声の再開】==========
     * 停止した AudioPlayer を再度 play してはいけません
     * AudioPlayer の再利用は不可能
     * 
     * 同じ音声を再生する場合は最初と同様に AudioAsset を play する必要があります
     */


    // ★再生ボタンの作成
    const play = new g.Label({
      scene, parent: scene,
      text: "BSM/SE を再生する",
      font: createFont({ size: 40 }),
      y: 40,
      touchable: true
    });
    play.onPointDown.add(() => {
      // ★まだ音声が止まっていない場合に二重再生されないようにする
      bgmPlay.stop();
      sePlay.stop();

      // ★新しく AudioPlayer を生成する。再利用は禁止
      bgmPlay = bgm.play();
      sePlay = se.play();
    });


    // ★クレジット表示
    // ※Label は g.Label とは違うものです。公式の akashic-label ライブラリで提供されているエンティティです
    //   https://akashic-games.github.io/reverse-reference/v3/text/multiline.html
    const credit = new Label({
      scene, parent: scene,
      text: `
BGM: 電脳漂流記    https://musmus.main.jp/music_movie.html
(フリーBGM・音楽素材MusMus https://musmus.main.jp)

SE: 【効果音】学校のチャイム2    https://commons.nicovideo.jp/works/agreement/nc289355
(ニコニ・コモンズ nc289355)
`.trim(),
      font: createFont({ size: 20 }),
      width: scene.game.width,
      widthAutoAdjust: true,
      x: 5,
    });
    credit.y = scene.game.height - credit.height - 5;


    /* ==========【コラム】音声操作の補足==========
     * 【出来そうな気がするけど、多分不可能な機能】
     * ・その音声が再生中かを知る
     * ・音声を一時停止してそこから再開する
     * ・指定した位置から再生を開始する (SE のみ部分的に可能 https://akashic-games.github.io/recent-changes/2024/202405.html#partial-audio)
     * ・再生速度/ピッチ/位相などの音声操作
     * 
     * ※上記のリンクは Akashic Engine の更新情報のページですが最新の更新情報は乗っていません
     *   最新の情報は Akashic Engine のリポジトリの Releases を見てください
     *   Link - https://github.com/akashic-games/akashic-engine/releases
     * 
     * 
     * 【BGM を同時に２つ以上再生する方法】
     * Akashic Engine バージョン3.9.0 から `g.AudioPlayContext` が追加されました
     * (この文章を書いている時点の Akashic Engine 最新版は 3.20.2 です)
     * 
     * これを使うと次のことが出来ます
     * ・BGM の同時再生
     * ・BGM のフェードイン/フェードアウト (徐々に音量が上がる/下がるやつ)
     * ・BGM のクロスフェード (２つの BGM を徐々に音量を変えて良い感じ切り替えるやつ)
     * 
     * `g.AudioPlayContext` はまだ使ったことがないので解説出来ません‥ (◞‸◟)
     * 使用する場合は以下のリンクを読んでください
     * ・`g.AudioPlayContext` について  https://akashic-games.github.io/reverse-reference/v3/sound/audio-play-context.html
     * ・フェードイン/フェードアウト    https://akashic-games.github.io/reverse-reference/v3/sound/fade-in-fade-out.html
     * ・クロスフェードで切り替える     https://akashic-games.github.io/reverse-reference/v3/sound/cross-fade.html
     * 
     * 
     * 【complete-audio の使い方】
     * complete-audio という公式が提供する音声ファイルを作成するツールがあります
     * Link - https://github.com/akashic-games/complete-audio
     * 
     * ※このチュートリアルの説明は古くなっている可能性がります
     *   必ずリンク先の説明をご覧ください
     * 
     * complete-audio を使うには ffmpeg が必要です
     * インストールしていない方は先に１つ下の「ffmpeg のインストール方法」を読んでください
     * 
     * 1. `npm i -g @akashic/complete-audio` を実行してインストール (初回のみ)
     * 2. `complete-audio [ファイル名]` を実行
     * 
     * 例) `complete-audio audio.mp3`
     * 
     * complete-audio を使って変換可能な形式は次の通りです
     * .wav .mp3 .ogg .aac .m4a .mp4
     * 
     * 
     * 【ffmpeg のインストール方法】
     * complete-audio は ffmpeg が必要になります
     * 下記の方法またはググる/AIに聞くなどで調べてインストールしてください
     * 
     * 管理者権限のあるターミナルで `winget install ffmpeg` を実行 (自動でパスまで通るらしい)
     * 管理者権限のあるターミナルを開くには
     *   1. 「Windowsキー R」を同時押し
     *   2. powershell を入力 (cmd でも良い)
     *   3. 「CTRL SHIFT ENTER」を同時押しで起動
     */
  }
}
