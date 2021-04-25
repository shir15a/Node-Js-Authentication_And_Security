const Task = require('../models/task.model')

const getAll = async (req, res) => {
    try {
        const tasks = await Task.find({})
        return res.send(tasks);
    }
    catch {
        res.status(500)
    }
}

const getOne = async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)

        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
}



const createTask = async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
}

const updateTask = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
		const task = await Task.findById(req.params.id);

		updates.forEach((update) => (user[update] = req.body[update]));
		await task.save();

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
}

const remove = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
}



module.exports = {
    getAll,
    getOne,
    createTask,
    updateTask,
    remove
};