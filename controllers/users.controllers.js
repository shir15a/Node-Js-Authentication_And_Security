const UserModel = require("../models/users.model");

const getAll = async (req, res) => {
    try {
        const users = await UserModel.find({})
        return res.send(users);
    }
    catch(error) {
        console.log(error);
        return res.status(500)
    }
}

const getOne = async (req, res) => {
    const _id = req.params.id

    try {
        const user = await UserModel.findById(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
}

const create = async (req, res) => {
    const user = new UserModel(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
}

const update = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
		const user = await UserModel.findById(req.params.id);

		updates.forEach((update) => (user[update] = req.body[update]));
		await user.save();

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
}

const remove = async (req, res) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
}


module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
};


