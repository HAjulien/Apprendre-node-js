import express from "express"
import { User } from '../models/user.js'

export const router = new express.Router()

router.get('/users', async (req, res) => {
    try {
        const user = await User.find({});
        if(!user) return res.status(404).send('not found')
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        const saveUser = await user.save();
        res.status(201).send(saveUser)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/users/:id', async (req, res) => {
    const userId = req.params.id
    try {
        const user = await User.findById(userId);
        if(!user) return res.status(404).send('not found')
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/users/:id', async (req, res) => {
    const userId = req.params.id
    const updatedInfo = Object.keys(req.body)

    try {
        const user = await User   .findById(userId)

        if(!user) return res.status(404).send('not found')

        updatedInfo.forEach(update => user[update] = req.body[update])
        await user.save()
        res.send(user)

    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/users/:id', async (req, res) => {
    const userId = req.params.id
    try {
        const user = await User.findByIdAndDelete(userId)
        if(!user) return res.status(404).send('not found')
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/login', async (req, res) => {

    try {
        const user = await User.findUser(req.body.email, req.body.password);
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})