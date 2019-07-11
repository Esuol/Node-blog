/* eslint-disable no-unused-vars */
const express = require('express')

const router = express.Router()

const PostModel = require('../models/posts')
const checkLogin = require('../middlewares/check').checkLogin

// GET /posts 所有用户或者特定用户的文章页
//   eg: GET /posts?author=xxx

router.get('/', (req, res, next) => {
  res.render('posts')
})

// GET /posts/create 发表文章页
router.get('/create', checkLogin,  (req, res, next) => {
  res.render('create')
})

// POST /posts/create 发表一篇文章
router.post('/create', checkLogin,  (req, res, next) => {
// 获取参数
 const author = req.session.user._id
 const title = req.fields.title
 const content = req.fields.content

 //校验参数
 try {
  if(!title.length) {
    throw new Error('请填写标题')
  }
  if(!content.length) {
    throw new Error('请填写内容')
  }
 } catch (e) {
   req.flash('error', e.message)
   return res.redirect('back')
 }

 let post = {
   author,
   title,
   content
 }

 PostModel.create(post)
  .then(result => {
    // 此 post 是插入 mongodb 后的值，包含 _id
    post = result.ops[0]
    req.flash('success', '插入成功')
    // 发表成功后跳转到文章列表页
    res.redirect(`/posts/${post._id}`)
  })
  .catch(next)

})

// GET /posts/:postId 单独一篇的文章页
router.get('/:postId',  (req, res, next) => {
  res.send('文章详情页')
})

// GET /posts/:postId/edit 更新文章页
router.get('/:postId/edit', checkLogin,  (req, res, next) => {
  res.send('更新文章页')
})

// POST /posts/:postId/edit 更新一篇文章
router.post('/:postId/edit', checkLogin,  (req, res, next) => {
  res.send('更新文章')
})

// GET /posts/:postId/remove 删除一篇文章
router.get('/:postId/remove', checkLogin,  (req, res, next) => {
  res.send('删除文章')
})

module.exports = router