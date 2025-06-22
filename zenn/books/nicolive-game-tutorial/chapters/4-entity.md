---
title: "4.entity"
---

エンティティはシーンに表示する要素の総称です。四角形やテキスト、画像など様々な種類があり、作成しただけでは表示されません。`scene.append()` でシーンへ追加することで画面に現れます。

## 親子関係

- エンティティ同士は親子関係を持てます。子は親の位置を基準に表示され、親より手前に描画されます。
- 親は複数の子を持つことができ、子もさらに子を持つことができます。
- `parent.append(child)` で子を追加し、`child.parent` から親を参照可能です。

### コード例

```ts
/**
 * エンティティ (g.E)
 */
export function BASIS_entity() {
  const scene = new g.Scene({ game: g.game });
  g.game.pushScene(scene);
  scene.onLoad.add(loaded);

  function loaded(scene: g.Scene) {
    /* ==========【エンティティ】==========
     * シーンができたら今度はそのシーンに表示するものが必要です
     * シーンに表示するものは「エンティティ」と呼びます
     *
     * エンティティには四角形やテキスト、画像などの種類があります
     * まずは２番目に単純な「四角形」エンティティを作ります
     */

    // ★紫色の四角形エンティティの作成
    const parent = new g.FilledRect({
      scene,
      cssColor: "Purple",
      width: 1000, height: 500,
      x: 100, y: 100,
    });


    /* ==========【エンティティの作成】==========
     * エンティティを作成するには次のように書く必要があります
     *
     * new エンティティの種類 (エンティティの情報)
     *
     * 上の例では、エンティティの種類が g.FilledRect
     * エンティティの情報が { ... } です
     *
     * 今回エンティティの情報として指定した内容は次の通りです
     * ・scene        - エンティティが「所属する」シーン
     * ・cssColor     - 四角形の色
     * ・width/height - 四角形の大きさ
     * ・x/y          - 四角形の座標
     */


    /* ==========【エンティティの表示】==========
     * エンティティは作成するだけでは画面に表示されません
     * そのエンティティをシーンに追加する必要があります
     */

    // ★シーンに四角形エンティティを追加
    scene.append(parent);


    /* 新しいエンティティを作成して parent に追加してみます */

    // ★赤色の四角形エンティティの作成
    const child1 = new g.FilledRect({
      scene,
      cssColor: "red",
      width: 300, height: 300,
    });

    // ★紫色の四角形に、赤色の四角形を追加
    parent.append(child1);


    /* ==========【エンティティの親子関係】==========
     * 親子関係にあるエンティティは次の特徴を持ちます
     * ・子は親の位置を基準に表示される
     * ・子は親よりも手前に表示される
     * ・子は親の様々な影響を受ける
     */

    // ★青色の四角形エンティティの作成
    const child2 = new g.FilledRect({
      scene,
      width: 500, height: 500,
      x: 100, y: 100,
      // ★parent を指定すると parent.append(child2); を書くのと同じ意味になります
      parent: parent,
    });


    // ★親子の情報は parent/children を見ると分かります
    console.log("親エンティティ  子の数", parent.children?.length);
    console.log("子エンティティ  親がいるか", child2.parent != null);
  }
}
```
