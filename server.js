const { queue } = require('async')
const express=require('express')
const mongoose=require('mongoose')
const admin=require('./admin')
const person = require('./people')
const people=require('./people')

const app=express()

app.set('view engine','ejs')
app.use(express.urlencoded())

const dbUrl='mongodb+srv://Nikhil2218:Nikhil2218@cluster0.fwk2q.mongodb.net/Barber?retryWrites=true&w=majority'
mongoose.connect(dbUrl)
.then(result=>{
    app.listen(3000)
    console.log('Server has started')
})
.catch(err=>{
    console.log(err)
})

app.get('/',(req,res)=>{
    console.log('request recieved')
    res.render('index')
})

app.get('/add',(req,res)=>{
    res.render('add')
})

app.get('/show-current-queue',(req,res)=>{
    people.find()
    .then(queue=>{

        res.render('showqueue',{queue})
    })
})

app.get('/admin',(req,res)=>{
    admin.find()
    .then(result=>{
        if(result=='')
        res.render('new-admin')
        else
        res.render('admin')
    })
    .catch(err=>{
        console.log(err)
    })
})

app.delete('/show-to-admin/:id',(req,res)=>{
    const id=req.params.id
    person.findByIdAndDelete(id)
    .then(result=>{
        res.json({
            redirect:'/'
        })
    })
    .catch(err=>{
        console.log(err)
    })
})

app.post('/add-new',(req,res)=>{
    let newPerson={
        name:req.body.name,
        address:req.body.address,
        phone:req.body.phone,
        service:req.body.service
    }
    const person=new people(newPerson)

    person.save()
    .then(result=>{
        res.json({
            msg:'You have been line up in queue'
        })
        res.redirect('/')
    })
    .catch(err=>{
        console.log(err)
    })
})
// app.get('/show-to-admin',(req,res)=>{
//     people.find()
//     .then(queue=>{
//         res.render('showtoadmin',{queue})
//    })
//     .catch(err=>{
//         console.log(err)
//     })
// })

app.post('/register-admin',(req,res)=>{
    const Admin=new admin(req.body)
    Admin.save()
    .then(result=>{
        res.redirect('/')
    })
    .catch(err=>{
        console.log(err)
    })
})

app.post('/adminto',(req,res)=>{
    admin.find()
    .then(result=>{
        result.forEach(adm=>{
            if(adm.username==req.body.username)
            {
                if(adm.password==req.body.password)
                {
                   people.find()
                    .then(queue=>{
                         res.render('showtoadmin',{queue})
                    })
                }
                else{
                    res.render('nouser')
                }
            }
            else{
                res.render('nouser')
            }
            
        })
    })
    
})


