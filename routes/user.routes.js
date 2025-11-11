import {Router} from "express";

const userRouter=Router();

userRouter.get('/', (req, res)=>(
  res.send({title:'Get all users'})
))
userRouter.get('/:id', (req, res)=>res.send({title:'Get user details'}))

userRouter.post('/', (req, res)=>res.send({title:'Create a user'}))
userRouter.put('/:id', (req, res)=>res.send({title:'Edit the user'}))
userRouter.delete('/:id', (req, res)=>res.send({title:'Delete the user'}))

export default userRouter