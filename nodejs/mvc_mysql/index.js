const express = require('express')
const app = express()
const port = 8000
const mysql = require('mysql')


app.set('view engine','ejs')
app.set('views','./views')
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//mysql 연결
const conn = mysql.createConnection({
    host:'localhost',
    user: 'news',
    password: '1234',
    database: 'kdt9',
    // port:3306
})
conn.connect((err)=>{
    if(err){
        console.log('error')
        return
    }
    console.log('connect')
})

// const indexRouter = require('./routes')//"./routes <-라고 써도 됨"
// app.use('/',indexRouter)
//ex)
//const userRouter = require('./rotes/user)
//app.use('/user',userRouter)
app.get('/',(req,res)=>{
    res.render('index')
})

//GET /visitor: 방명록 전체 보이기
app.get('/visitor',(req,res)=>{
    const query = 'SELECT*FROM visitor'
    conn.query(query,(err,rows)=>{
        console.log(rows)
        res.render('visitor',{data:rows})
    })   
})

//GET / visitor/get : 방명록 하나 조회
app.get('/visitor/get',(req,res)=>{
    res.send('방명록 하나 조회')
})

//POST / visitor/write: 방명록 하나 추가
app.post('/visitor/write',(req,res)=>{
    const query = `insert into visitor(name,comment) values ("${req.body.name}","${req.body.comment}")`
    conn.query(query,(err,rows)=>{
        console.log('rows',rows)
        res.send({id: rows.insertId ,name:req.body.name, comment: req.body.comment})
    })
    

})

//PATCH/visitor/ edit : 방명록 수정
app.patch('/visitor/edit',(req,res)=>{
    res.send('방명록 하나 수정')
})

//DELETE/visitor/delete
app.delete('/visitor/delete',(req,res)=>{
    res.send('방명록 하나 삭제')
})

//마지막 선언
app.use('*',(req,res)=>{
    res.render('404')
})

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})