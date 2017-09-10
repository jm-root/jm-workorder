import user from 'jm-user'
import router from '../router'
import t from '../locale'

/**
 * workorder service
 * @param {Object} opts
 * @example
 * opts参数:{
 *  db: 数据库
 *  tableNamePrefix: (可选, 表名前缀, 默认为'')
 * }
 * @return {Object} service
 */
export default function (opts = {}) {
  let o = user(opts)
  o._user_router = o.router
  o.router = router

  o.onReady()
    .then(function () {
      o.workOrder = require('./workOrder')(o, opts)
    })

  return o
};
