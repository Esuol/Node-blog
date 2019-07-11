// moment
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')

const config = require('config-lite')(__dirname)
const Mongolass = require('mongolass')
const mongolass = new Mongolass()
mongolass.connect(config.mongodb)

exports.User = mongolass.model('User', {
  name: { type: 'string', required: true },
  password: { type: 'string', required: true },
  avatar: { type: 'string', required: true },
  gender: { type: 'string', enum: ['m', 'f', 'x'], default: 'x' },
  bio: { type: 'string', required: true }
})

exports.User.index({ name: 1 }, { unique: true }).exec()// 根据用户名找到用户，用户名全局唯一

// 根据 id 生成创建时间 created_at
mongolass.plugin('addCreatedAt', {
  afterFind(results) {
    results.forEach(function (item) {
      item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
    })
    return results
  },
  afterFindOne(result) {
    if (result) {
      result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm')
    }
    return result
  }
})



/**
 * required: true 表示该字段是必需的，default: xxx 用于创建文档时设置默认值。
 * Mongolass 中的 model 你可以认为相当于 mongodb 中的 collection，只不过添加了插件的功能。
 *
 */