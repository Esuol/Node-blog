/* eslint-disable no-unused-vars */
const express = require('express')

const router = express.Router()

const checkLogin = require('../middlewares/check').checkLogin

// GET /posts 所有用户或者特定用户的文章页
//   eg: GET /posts?author=xxx

router.get('/', (req, res, next) => {
  res.render('posts')
})

// POST /posts/create 发表一篇文章
router.post('/create', checkLogin,  (req, res, next) => {
  res.send('发表文章')
})

// GET /posts/create 发表文章页
router.get('/create', checkLogin,  (req, res, next) => {
  res.render('create')
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