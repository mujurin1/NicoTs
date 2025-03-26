
# ニコ生ゲーム入門

このチュートリアルの対象読者
* JavaScript が少し分かる
* Windowsユーザー

※ 将来はJavaScriptの説明も書きたいですがまだないです

このチュートリアルの目標
* 正しく理解しながらニコ生ゲームを作れるようになる
* 特にマルチプレイ

もくじ
* [必要な知識](#必要な知識)
* [チュートリアルの始め方](#チュートリアルの始め方)


## 必要な知識
このチュートリアルを始める前に必要な知識があります  
これらについて調べてから (調べながら) チュートリアルを進めてください  
URLはその知識について書かれているサイトです

* ブラウザの開発者ツール (DevTools) の使い方
  * コンソールタブの開き方            https://support.gusuku.io/ja-JP/support/solutions/articles/36000136558
    * ショートカットキー：`F12` `CTRL SHIFT I`
  * コンソールタブの最低限の使い方    https://qiita.com/aqril_1132/items/a0f7e81a772006847ec3
    * コンソールタブで実行したプログラムによる影響はタブをリロードするまで残ります  
      何かおかしいと思ったらタブのリロードをしましょう
* JavaScript の簡単な知識             https://zenn.dev/peter_norio/articles/d60854ef8692de
  * プログラムは上から順番に実行される
  * 基本的な構文の書き方 `if/for` `function` など
  * 変数・定数 `let` `const` (`var` はこのチュートリアルでは禁止しています)
  * 配列・オブジェクト `[]` `{}` の書き方   https://zenn.dev/ojk/books/intro-to-javascript/viewer/js-array
    * このページの２～７章を読めば完璧
    * HTMLや `document` 、エレメント (`<div>` みたいな`<>`で囲われたやつ) は読み飛ばしてOK
      * ↑ニコ生ゲームでは使わない知識
* 開発環境の構築
  * 公式のチュートリアル動画Part1     https://www.nicovideo.jp/watch/sm44622140
  * VSCodeやnodejsの準備


## チュートリアルの始め方
まずはこのチュートリアル用プロジェクトの環境を整えます  
環境を整えながら
[VSCode の使い方](src/!DOC/1.VSCode.ts)、[TypeScript の説明](src/!DOC/2.TypeScript.ts)
を VSCode で読んでください  
この２つはただの読み物なので環境が整う前から読み始められます

※上記２つ、特にTypeScriptの説明は読みづらいです。ゴメンナサイ

環境構築の手順の４と５が時間が掛かるポイントです

### 環境構築の手順
> この手順で詰まった方は [こまたと](#こまたと) を見てください

このリポジトリでは下記の npm ライブラリを使うため先に下記のコマンドを実行してください
> `npm i -g concurrently`

1. ZIP ファイルのダウンロード & 展開
   * [このリンクからダウンロード](https://github.com/mujurin1/nicolive-comeview-extension/archive/refs/heads/main.zip)
     またはページ上部の「緑色のCode > Download ZIP」
2. VSCode でフォルダを開く
   * (VSCode左側ファイルアイコンから) エクスプローラー欄にファイルが沢山並んでいる状態
3. `CTRL @` でターミナルを開く
4. ターミナルで `npm i` コマンドの実行 (それなりに時間が掛かります)
5. ターミナルで `npm run dev` コマンドの実行 (少しだけ時間が掛かります)
6. ターミナルに表示された緑の `http://localhost:3300` にマウスを合わせて `リンクにアクセス` をクリック

環境構築が完了したら VSCode で実行しながら `/src/main.ts` 内容を読み進めてください

何か分からないことがあったらAIに聞いてみてください  
最近のAIはアカウントも不要で使えます
* ChatGPT    : https://chatgpt.com
* Perplexity : https://www.perplexity.ai
* Claude     : https://claude.ai (賢いけどアカウントが必要)

### こまたと
* ターミナルの使い方が分からない            https://www.javadrive.jp/vscode/terminal/index1.html
* ターミナルで実行するとエラーが出る
  * 使用するターミナルを変更してみる        https://zenn.dev/unsoluble_sugar/articles/362a17a7f57020
  * PowerShell を使いたい方はこちらを参照   https://qiita.com/Targityen/items/3d2e0b5b0b7b04963750
