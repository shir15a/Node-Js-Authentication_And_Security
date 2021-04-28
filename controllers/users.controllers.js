const UserModel = require("../models/users.model");

const getAll = async (req, res) => {
    try {
        const users = await UserModel.find({})
        return res.send(users);
    }
    catch (error) {
        console.log(error);
        return res.status(500)
    }
}

//run only if user authenticated
const getprofile = async (req, res) => {
    // const _id = req.params.id

    // try {
    //     const user = await UserModel.findById(_id)

    //     if (!user) {
    //         return res.status(404).send()
    //     }

    //     res.send(user)
    // } catch (e) {
    //     res.status(500).send()
    // }

    res.send(req.user)

}

const create = async (req, res) => {
    const user = new UserModel(req.body)
    try {
        await user.save()
        // Generating Authentication Tokens
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
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
    // update for password
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

const login = async (req, res) => {
    try {
        const user = await UserModel.findByCredentails(req.body.email, req.body.password);
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        console.log(e);
        return res.status(500).send()
    }
}

module.exports = {
    getAll,
    getprofile,
    create,
    update,
    remove,
    login
};
