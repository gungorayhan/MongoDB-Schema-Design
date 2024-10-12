const { UserModel, ProfileModel } = require("../../model/one-to-one/index.js")


const create = async (req, res) => {
    try {

        const { username, email, bio, website } = req.body

        const profile = new ProfileModel({ bio, website })
        await profile.save();

        const user = new UserModel({
            username,
            email,
            profile: profile._id
        })

        await user.save();

        res.status(201).json({ data: user })
    } catch (error) {
        console.error(error)
        res.status(500).send(error);
    }
}

const get = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id).populate("profile");
        res.status(200).json({ data: user })
    } catch (error) {
        console.error(error)
        res.status(500).send(error);
    }
}


module.exports = {
    create,
    get
}