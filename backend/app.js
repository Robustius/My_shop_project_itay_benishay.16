import express from "express";
import cors from 'cors';
import { router as loginRouter } from "./controllers/auth-controller/loginController.js";
import {router as registration } from "./controllers/auth-controller/registrationController.js"; 

const server = express();
server.use(cors());
server.use(express.json());

server.use("/login", loginRouter)
server.use('/register',registration)


server.listen(4000, () => {
    console.log("Listening on 4000");
}).on("error", (err) => {
    if (err.code === "EADDRINUSE")
        console.log("Error: Address in use");
    else 
        console.log("Error: Unknown error"); 
});

