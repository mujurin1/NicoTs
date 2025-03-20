import { sceneCreateAndSetOnLoad } from "../utils";

/**
 * 時間/時間経過イベント
 */
export function BASIS_update() {
  sceneCreateAndSetOnLoad(loaded);

  function loaded(scene: g.Scene) {
    /* ==========【時間/時間経過イベントの基本】==========
     * 時間/時間経過はゲームを作るための重要な要素です
     * 
     * 時間は Akashic Engine が管理しているため必ず
     * Akashic Engine の提供する方法を使用する必要があります
     * それ以外の時間/時間経過イベントを使用するとゲームが壊れる可能性があります
     * 
     * これはランキングゲームではあまり気にしなくても問題にはなりませんが
     * マルチプレイゲームでは特に重要になります
     * ※なぜ重要なのかの説明はコラムにあります
     * 
     * 【時間/時間経過イベントの扱い方】
     * 時間は g.game.getCurrentTime 関数を
     * 時間経過イベントは onUpdate, setTimeout, setInterval を使用します
     * 
     * onUpdateは「１フレーム」経過毎に呼び出されます
     * 
     * ※１フレームの時間は game.json の "fps" で指定された値で決まります
     * Link - https://akashic-games.github.io/reverse-reference/v3/setting/fps.html
     * 
     * onUpdate は g.Game g.Scene g.E の全てが持っています
     */
    // ★１秒経過時にログを出力する (onUpdate 版)
    let timeCount = 0;
    scene.onUpdate.add(() => {
      // onUpdate は引数に何も受け取りません (受け取っても中身は何もない)
      timeCount += 1;
      if (timeCount >= g.game.fps) {
        timeCount = 0;
        console.log("１秒経過");
      }
    });

    /* ==========【便利な関数】==========
     * 時間経過イベントを扱うための便利な関数があります
     * 一定時間後に処理を実行する   - setTimeout
     * 一定時間ごとに処理を実行する - setInterval
     * 
     * これらのイベントを解除するためには clearTimeout, clearInterval を使用します
     * また、これは今までのイベントとは違う書き方で使用します
     */
    // ★３秒後に１回だけログを出力する
    const timeoutId = scene.setTimeout(
      // 第１引数に実行する関数を指定
      () => console.log("３秒経過！！！！！(このログは１回しか出力されません)"),
      // 第２引数に何秒後に実行するかをミリ秒で指定 (1秒 = 1000ミリ秒. ミリ秒は1000分の1秒です)
      3000
    );
    // ★５秒ごとにログを出力する
    const intervalId = scene.setInterval(
      () => console.log("５秒経過"),
      5000
    );
    // ★if (true) にすると setTimeout, setInterval が解除されます
    if (false) {
      scene.clearTimeout(timeoutId);
      scene.clearInterval(intervalId);
    }


    /* ==========【コラム】時間経過の補足==========
     * 時間は Akashic Engine が管理しています
     * なのでの時間関係の情報・イベントは Akashic Engine の提供するものを使用し
     * それ以外の情報は使用してはいけません
     * 
     * ニコ生上でゲームを遊んだことのある人は次のことを既に知っていると思います
     * ・ニコ生ゲームを遊んでいる放送を途中から開くと最新の時刻までの高速でリプレイが始まる
     *   最新の時刻まで到達すると操作が可能になる
     * ・タイムシフトで「マルチプレイの」ニコ生ゲームを見るとその時のリプレイが再生される
     *   ランキングゲームの場合はタイムシフトで遊ぶことができます
     * 
     * Akashic Engine の提供する機能のみを使えばこれらの場合に正しくゲームが実行されますが
     * DOM API の提供する setInterval, setTimer や
     * 現在の時間 Date.now などを使用するとゲームが正しく再生されなくなります
     */
  }
}
