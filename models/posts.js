const marked = require('marked')
const Post = require('../lib/mongo').Post

// 将 post 的 content 从 markdown 转换成 html
Post.plugin('contentToHtml', {
  afterFind(posts) {
    return posts.map(post => {
      post.content = marked(post.content)
      return post
    })
  },
  afterFindOne: function (post) {
    if (post) {
      post.content = marked(post.content)
    }
    return post
  }
})

module.exports = {
  // 创建一篇文章
  create (post) {
    return Post.create(post).exec()
  }
}