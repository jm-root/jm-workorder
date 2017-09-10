import chai from 'chai'

let expect = chai.expect
import config from '../config'
import $ from '../src'

let service = $(config)
let router = service.router()

let workorder = {
  content: '申请创业',
  user: '59648c53e366560a94e80bce',
  ext: {
    teamType: '599c0a8b1b7e13302022613b'
  }
}

let log = (err, doc) => {
  err && console.error(err.stack)
}

let init = function () {
  return new Promise(function (resolve, reject) {
    service.onReady().then(() => {
      resolve()
    })
  })
}

describe('service', function () {
  it('create workOrder', function (done) {
    init()
      .then(function () {
        service.workOrder.create({
          type: 'jointeam',
          content: '申请创业',
          user: '59648c53e366560a94e80bce',
          ext: {
            teamType: '599c0a8b1b7e13302022613b'
          }
        }, function (err, doc) {
          log(err, doc)
          expect(err === null).to.be.ok
          done()
        })
      })
  })
})
