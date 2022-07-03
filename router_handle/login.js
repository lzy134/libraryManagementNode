// 导入数据库操作模块
const db = require('../db/index')
// 导入对密码进行加密的bcryptjs
// const bcryptjs = require('bcryptjs')
// 导入生成token字符串的包
const jwt = require('jsonwebtoken')
const svgCaptcha = require('svg-captcha');
const config = require('../config')
let randomCode = ''
// 用户登录
exports.login = (req, res) => {
  const adminInfo = req.body
  console.log(adminInfo);
  const sql = 'select * from ev_users where account = ?'
  db.query(sql, adminInfo.name, (err, results) => {
    if(err) return res.cc(err)
    if(randomCode !== adminInfo.code) return res.cc('验证码输入错误！')
    if(results.length !== 1) return res.cc('登录失败！')
    // 判断密码是否一致
    if(results[0].password !== adminInfo.password) return res.cc('密码输入错误！')
    const admin = {...results[0]}
    const tokenStr = jwt.sign(admin, config.jwtSecretKey, {expiresIn: config.expiresIn})
    res.send({
      code: 0,
      msg: '登录成功！',
      token: 'Bearer ' + tokenStr
    })
  })
}
// 获取验证码
exports.captcha = (req,res) => {
  const captcha = svgCaptcha.create({
    height: 40
  }); // 存session用于登录验证
  res.type('svg');//使用ejs等模板时如果报错
  // res.type('html');
  res.status(200).send(captcha.data);
  randomCode = captcha.text.toLowerCase();
}