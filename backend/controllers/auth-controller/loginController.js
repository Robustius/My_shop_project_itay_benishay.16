
import express from 'express';
import { isRegistered } from '../../buisness-logic/auth-logic.js';


export const router = express.Router();

router.post('/', async (req, res) => {
    try{
    const user= await isRegistered(req.body);
    return res.status(200).send(user);
}
    
    catch(error){
        console.log(error); 
    }
})