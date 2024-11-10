import "reflect-metadata";
import express from "express";
import router from "./routes";
import OnInit from "./on-init.script";
import { myContainer } from "./inversify.config";

const start = async () => {

    const app = express();
    const PORT = process.env.PORT || 3000;

    app.use(express.json())
    app.use('/api', router)

    await OnInit.execute();

    app.listen(PORT, () => console.log(`Server started at port ${PORT}`))
}

start();