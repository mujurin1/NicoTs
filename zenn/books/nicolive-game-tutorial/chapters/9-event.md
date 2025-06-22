---
title: "9.event"
---

ゲーム内の処理は多くの場合イベントによって開始されます。クリックや時間経過、プレイヤー参加などのイベントに対し、`on***.add()` でハンドラを登録していきます。

## よく使うイベント

| 対象 | イベント | 内容 |
| --- | --- | --- |
| `g.E` | `onPointDown/Move/Up` | クリック操作を検知 |
| `g.Scene` | `onPointDownCapture` など | 画面全体のクリック |
| `g.Game` | `onJoin` | 生主が参加した時 |
| `g.Scene` | `onMessage` | カスタムイベント受信 |

イベントは `addOnce` で一度だけ実行する登録や、`remove` で解除することも可能です。クリック可能なエンティティには `touchable: true` を指定しましょう。

### コード例

```ts
  function loaded(scene: g.Scene) {
    /* ==========【イベントの基本】==========
     * ニコ生ゲームに限らずあらゆるプログラムはイベントによってその処理が始まります
     */

    const whiteRect = new g.FilledRect({
      scene, parent: scene,
      cssColor: "white",
      width: 100, height: 100,
      touchable: true,
    });
    whiteRect.onPointDown.add(showLog);

    function showLog(e: g.PointDownEvent) {
      console.log(`クリック: X:${e.point.x}  Y:${e.point.y}`);
    }

    if (false) {
      whiteRect.onPointDown.remove(showLog);
    }

    whiteRect.onPointDown.addOnce(() => {
      console.log("クリック！！！！！ (このログは１回しか出力されません)");
    });

    const blueRect = new g.FilledRect({
      scene, parent: scene,
      width: 100, height: 100,
      x: 210, y: 100,
      cssColor: "blue",
      touchable: true,
    });

    blueRect.onPointDown.add(downBlueButton);
    blueRect.onPointMove.add(moveBlueButton);
    blueRect.onPointUp.add(upBlueButton);

    function downBlueButton(e: g.PointDownEvent) {
      console.log("======== 四角形:クリック ========");
      console.log(`プレイヤーID: ${e.player?.id}   x:${e.point.x} y:${e.point.y}`);
      blueRect.cssColor = "red";
      blueRect.modified();
    }

    function moveBlueButton(e: g.PointMoveEvent) {
      console.log("======== 四角形:クリック → 移動 ========");
      blueRect.moveBy(e.prevDelta.x, e.prevDelta.y);
      blueRect.modified();
    }

    function upBlueButton(e: g.PointUpEvent) {
      console.log("======== 四角形:クリック → 離す ========");
      blueRect.cssColor = "blue";
      blueRect.modified();
    }

    const logClearText = new g.Label({
      scene, parent: scene,
      text: "ログを消す (ブラウザの Devtools Console のログを全て削除します)",
      font: createFont({ size: 20 }),
      touchable: true,
      x: 30, y: 230,
    });
    logClearText.onPointDown.add(() => console.clear());

    if (true) {
      scene.onPointDownCapture.add(e => {
        console.log("======== シーン:クリック ========");
        console.log(`クリックしたエンティティの座標 X:${e.target?.x}  Y:${e.target?.y}`);
      });
      scene.onPointMoveCapture.add(e => {
        console.log("======== シーン:クリック → マウス移動 ========");
      });
      scene.onPointUpCapture.add(e => {
        console.log("======== シーン:クリック → 離す ========");
      });
    }
  }
```
