// 导入数据库操作模块
const db = require('../db/index')
// const moment = require('moment')

// 获取图书分类
exports.getClassify = (req, res) => {
  const sql = 'select * from ev_classify order by id DESC'
  db.query(sql, (err, results) => {
    if(err) return res.cc(err)
    console.log(results);
    // if(results.length !== 1) return res.cc('获取失败！')
    res.send({
      code: 0,
      msg: '获取图书分类成功！',
      data: results
    })
  })
}

// 添加图书分类
exports.addClassify = (req, res) => {
  const body = req.body
  console.log(body);
  const sql = 'insert into ev_classify set ?'
  db.query(sql, body, (err, results) => {
    if(err) return res.cc(err)
    res.send({
      code: 0,
      msg: '添加成功！'
    })
  })
}

// 查询图书分类
exports.search = (req, res) => {
  const query = req.query
  console.log(query);
  let sql = `select * from ev_classify where className like "%${query.className}%"`
  
  db.query(sql, (err, results) => {
    if(err) return res.cc(err)
    res.send({
      code: 0,
      msg: '查询成功！',
      data: results
    })
  })
}

// 编辑图书分类
exports.edit = (req, res) => {
  const body = req.body
  console.log(body);
  let sql = 'update ev_classify set className = ?, note = ?, updateTime = ? where id = ?'
  db.query(sql, [body.className,body.note,body.updateTime,body.id], (err, results) => {
    if(err) return res.cc(err)
    res.send({
      code: 0,
      msg: '编辑成功！'
    })
  })
}


// 删除图书分类
exports.delete = (req, res) => {
  const body = req.body
  let sql = 'delete from ev_classify where id = ?'
  db.query(sql, body.id, (err, results) => {
    if(err) return res.cc(err)
    res.send({
      code: 0,
      msg: '删除成功！'
    })
  })
}

