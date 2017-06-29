module.exports = {
  sass: {
    src: [  // もし外部のcssフレームワーク使うなら配列の先頭で読み込むと良い
      './htdocs/scss/!(_)*'  // ファイル名の先頭がアンスコはビルド対象外にする
    ],
    dest: './htdocs/css/',
    output: 'style.css',  // 出力ファイル名
    autoprefixer: {
      browsers: ['last 2 versions']
    },
    minify: false
  }
};
