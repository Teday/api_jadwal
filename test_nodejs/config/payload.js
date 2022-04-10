'use strict'
exports.payload = function (data, res) {
  const datas = {
    statusCode: res.statusCode,
    data
  }
  res.json(datas)
  res.end()
}

exports.errAuthorize = function (values, res) {
  var data = {
    error: { 
      statusCode: res.statusCode,
      message: values }
  }
  res.json(data)
  res.end()
}
