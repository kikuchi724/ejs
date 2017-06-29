# HTML 設計

## 前提
- yarnがインストール済みであること。
- gulpがグローバルにインストール済みであること。

# 依存ライブラリのインストール
作業フォルダで以下コマンドを実行する。
```
yarn install
```

## ディレクトリ構成
```
html
├── htdocs
│   ├── css
│   │   ├── lib
│   │   │    └─vendor      // cssライブラリ
│   │   └── style.css
│   ├── index.html
│   └── js
│       └── lib
│   │       └─vendor      // JSライブラリ
├── node_modules
└── src                   // 開発資源
    ├── html
    │   ├── index.ejs     // 実際のindex.htmlに当たるもの。ビルド後 htdocs に格納される
    │   ├── index.html    // 開発用目次
    │   └── templates     // headerなどの共通パーツを格納
    └── scss              // ビルド後、 htdocs/css 内に格納される
```
      
## インデント（HTML/JS/CSS共通）
スペース2個


## JS

### 使用ライブラリ
- jQuery3.2.1


## CSS

### 使用ライブラリ
- sanitize.css

### ベンダープレフィックス
auto-prefixerを使用

## CSS クラス命名規則
BEMベースのオリジナル

### モジュール
例
> .block

###  モジュール内のエレメント
例
> .block_element

###  エレメントの状態変化
エレメントにis_を接頭辞とした状態を表すクラスを付与
例
> .is_modifier

###  各命名箇所が複数の単語となる場合、キャメルで表記
例
> .blockDummy_elementDummy

### HTML例

```html:_header.ejs
  <nav class="nav">
    <ul class="nav_subnav">
      <li class="nav_subnav_item is_current"><a href="#">ザクマガ</a></li>
      <li class="nav_subnav_item"><a href="#">会社概要</a></li>
      <li class="nav_subnav_item"><a href="#">採用情報</a></li>
    </ul>
  </nav>
```


## 画像 命名規則
小文字を使用
CSSのモジュール名ベースに適宜命名行う
例
> block_element.png


## gulp タスク管理ツール
### 主に使用しているプラグイン
- Sass -> CSSメタ言語
- EJS -> テンプレート制御
- browser-sync -> ファイルの変更を察知しブラウザをリロード


### デフォルトタスク
```
glup
```

デフォルトタスクでscss・html・ejsを監視する。
変更があればscss・ejsをビルドし直す。
また、browser-syncで目次ページが起動するようになっている

### 