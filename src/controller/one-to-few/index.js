const { UserFewModel, AddressModel } = require("../../model/one-to-few/index.js");

const create = async (req, res) => {
    try {

        const { username, email, addresses } = req.body;

        const addressDocs = await Promise.all(
            addresses.map((address) => {
                const newAddress = new AddressModel(address)
                return newAddress.save()
            })
        )

        const user = new UserFewModel({
            username,
            email,
            addresses: addressDocs.map(address => address._id)
        })

        await user.save()

        res.status(201).json({
            data: user
        })
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }

}


const get = async (req, res) => {
    try {
        const user = await UserFewModel.findById(req.params.id).populate("addresses");
        res.send(user);
      } catch (error) {
        res.status(500).send(error);
      }
}

module.exports = {
    create,
    get
}