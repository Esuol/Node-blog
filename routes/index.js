const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.send('hello, express')
  // next(new Error('haha'))
})

module.exports = router