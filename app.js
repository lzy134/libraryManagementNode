const express = require('express')
const app = express()

// 导入登录路由
const loginRouter = require('./router/login')
// 导入借阅路由
const borrowRouter = require('./router/borrow')
// 导入图书分类路由
const classifyRouter = require('./router/classify')
// 导入图书列表路由
const booksRouter = require('./router/books')
// 导入用户列表路由
const usersRouter = require('./router/users')


const joi = require('joi')
const config = require('./config')
// 安装cors中间件，解决跨域
const cors = require('cors')
// 使用cors
app.use(cors())
// 配置解析 application/x-www-urlencoded 表单数据
app.use(express.urlencoded({extended: false}))
app.use((req, res, next) => {
  // code默认为1，表示失败的情况
  // err 可能是一个错误对象，也可能是一个表示错误的字符串
  res.cc = function(err, code = 1) {
      res.send({
          code,
          msg: err instanceof Error ? err.message : err
      })
  }
  next()
})
// 导入解析用户信息的中间件
// const expressJWT = require('express-jwt')
// // 全局注册解析中间件
// app.use(expressJWT({secret: config.jwtSecretKey}).unless({path: [/^\/api\//]}))
app.use('/api', loginRouter)
app.use('/api', borrowRouter)
app.use('/api', classifyRouter)
app.use('/api', booksRouter)
app.use('/api', usersRouter)

app.use((err, req, res, next) => {
  // 数据验证失败
  if(err instanceof joi.ValidationError) return res.cc(err)
  // 捕获认证token失败的错误
  if(err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
  // 未知错误
  res.cc(err)
})




app.listen(3007, () => {
  console.log('serve at http://127.0.0.1:3007');
})