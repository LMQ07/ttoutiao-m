module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // 根节点的rem的大小 默认是37.5 但是具体的根据设计稿
      // rootValue: 37.5,

      // 如果是vant文件 按照37.5转 如果是我们自己写的按照75
      // rootValue(module) {
      //   console.log(module)
      //   if (/vant/i.test(module.file)) {
      //     return 37.5
      //   } else {
      //     return 75
      //   }
      // },
      // 简写
      rootValue: ({ file }) => (/vant/i.test(file) ? 37.5 : 75),
      // 哪些属性需要转换成rem *表示匹配所有
      propList: ['*'],
      exclude: 'github-markdown'
    }
  }
}
