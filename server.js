const { queue } = require('async')
const express=require('express')
const mongoose=require('mongoose')
const admin=require('./admin')
const person = require('./people')
const people=require('./people')
const port=process.env.PORT || 8000;

const app=express()

app.set('view engine','ejs')
app.use(express.urlencoded())
app.use(express.static('public'))
app.use(express.static('assets'))


const dbUrl= process.env.MONGO_URL
mongoose.connect(dbUrl)
.then(result=>{
    app.listen(port)
    console.log('Server has started')
})
.catch(err=>{
    console.log(err)
})

app.get('/',(req,res)=>{
    console.log('request recieved')
    res.render('add')
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
        
        res.redirect('/')
    })
    .catch(err=>{
        console.log(err)
    })
})


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

app.use((req,res)=>{
    res.render('404')
})


