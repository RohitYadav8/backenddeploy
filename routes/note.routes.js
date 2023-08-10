const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { authenticator } = require("../middlewares/authenticator")
const { noteModel } = require("../model/NoteModel")


const noteRouter = express.Router()
noteRouter.use(authenticator)




noteRouter.get("/", async (req, res) => {
    const notedata =await noteModel.find()
    res.send({
        note:notedata,
        message: "all the notes",
        status: 1
    })

})
noteRouter.post("/create", async (req, res) => {
    try {
        const { title, body, user } = req.body
        let note = new noteModel({ title, body, user })
        await note.save()
        res.send({
            message: "note created",
            status: 1
        })

    }



    catch
    (err) {
        res.send({
            messege: err.message,
            status: 0
        })
    }


})

noteRouter.patch("/", async (req, res) => {
    let { id } = req.headers
    console.log(id)
    try {
        await noteModel.findByIdAndUpdate({ _id: id }, req.body)
        res.send({
            message: "note update",
            status: 1
        })
    } catch (error) {
        res.send({
            message: "error.message",
            status: 0
        })
    }
})

noteRouter.delete("/", async (req, res) => {
    let { id } = req.headers
    try {
        await noteModel.findByIdAndDelete({ _id: id }, req.body)
        res.send({
            message: "note deleted",
            status: 1
        })
    } catch (error) {
        res.send({
            message: "error.message",
            status: 0
        })
    }
})




module.exports = {
    noteRouter
}