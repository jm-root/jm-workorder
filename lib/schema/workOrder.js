'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (schema) {
  schema = schema || new Schema();
  schema.add(schemaDefine);
  return schema;
};

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

// 工单历史记录
var historySchema = new Schema({
  operator: { type: Schema.Types.ObjectId, ref: 'user' }, // 操作员
  status: { type: Number }, // 操作后状态
  crtime: { type: Date, default: Date.now }, // 创建时间
  memo: { type: String // 备注信息
  } });

// 工单
var schemaDefine = {
  user: { type: Schema.Types.ObjectId, ref: 'user' }, // 用户id
  type: { type: String, index: true }, // 类型
  crtime: { type: Date, default: Date.now }, // 创建时间
  moditime: { type: Date, default: Date.now }, // 修改时间
  status: { type: Number, default: 1 }, // 状态 （1未处理 2处理中 3已完成 4已取消）
  tags: [String],
  ext: Schema.Types.Mixed, // 其他，保留字段
  content: { type: String }, // 工单内容
  memo: { type: String }, // 备注信息
  history: [historySchema] // 操作历史记录
};

module.exports = exports['default'];