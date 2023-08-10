const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv")

const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const { noteRouter } = require("./routes/note.routes");


require("dotenv").config()
const port = process.env.PORT
const app = express()
app.use (cors())
app.use(express.json())

app.use("/user",userRouter)
app.use("/note",noteRouter)


app.listen(port, async () => {


    try {
        await connection
        console.log("database connect");
    } catch (error) {
        console.log(error)
    }
    console.log("server is running on port number", port)
})