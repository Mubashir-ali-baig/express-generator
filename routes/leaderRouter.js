const express=require('express');
const leaderRouter=express.Router()
const bodyParser=require('body-parser');

const Leaders = require('../models/leaders');


leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get((req,res,next)=>{
    Leaders.find({})
    .then((leader)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json')
        res.json(leader)
    },(err)=>next(err)
    )
    .catch(err=>next(err))  
  })
.post((req,res,next)=>{
    Leaders.create(req.body)
    .then((leader)=>{
        console.log("leader Created",leader)
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leader)
    },(err)=>next(err)
    ).catch(err=>next(err))
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /leader/');
})
.delete((req,res,next)=>{
    Leaders.remove({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json')
        res.json(resp)
    },err=>next(err))
    .catch(err=>next(err))
})
leaderRouter.route('/:leaderId')
.get((req,res,next)=>{
    Leaders.findById(req.params.leaderId)
    .then(leader=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leader)
    },(err)=>next(err)
    ).catch(err=>next(err))
})
.put((req,res,next)=>{
    Leaders.findByIdAndUpdate(req.params.leaderId,{
        $set:req.body
    },{new:true})
    .then((leader)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json')
        res.json(leader)
    },err=>next(err))
    .catch(err=>next(err))
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/:leaderID');  
})
.delete((req,res,next)=>{
    Leaders.findByIdAndRemove(rq.params.leaderId)
    .then((leader)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leader)
    },err=>next(err))
})


module.exports=leaderRouter;