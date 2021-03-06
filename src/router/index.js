import error from 'jm-err'
import MS from 'jm-ms-core'
import help from './help'
import order from './workOrder'

let ms = new MS()
let Err = error.Err
export default function (opts = {}) {
  let service = this
  let t = function (doc, lng) {
    if (doc && lng && doc.err && doc.msg) {
      return {
        err: doc.err,
        msg: service.t(doc.msg, lng) || Err.t(doc.msg, lng) || doc.msg
      }
    }
    return doc
  }

  let router = ms.router()
  router
    .use(help(service))
    .use(function (opts, cb, next) {
      if (!service.ready) {
        return cb(null, t(Err.FA_NOTREADY, opts.lng))
      }
      next()
    })

  this.onReady().then(() => {
    router
      .use('/users', service._user_router(opts))
      .use('/orders', order(service, opts))
  })
  return router
};
