import express, { response } from 'express'
import { register, verify } from '../../buisness-logic/auth-logic.js'

export const router = express.Router();


router.post('/verify', async (req, res) => {
    try {

        const idTaken = await verify(req.body)

        if (idTaken.length >= 1) {
            
            return res.status(406).send(idTaken);

        } else {
         
            return res.status(200).json(`GOOD`);
        }
    } catch (error) {
        res.status(405).send(error)
    } 
});

router.post('/', async (req, res) => {
    try {
        const newUser = await register(req.body)
        return res.status(200).json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})