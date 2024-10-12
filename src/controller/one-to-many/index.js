const { OrderModel, UserManyModel } = require("../../model/one-to-many/index.js");

const create = async (req, res)=>{
    try {
        const {username, email, orders} = req.body

        const orderDocs =  await Promise.all(
            orders.map((order)=>{
                const newOrder = new OrderModel(order);
                return newOrder.save();
            })
        )


        const user=new UserManyModel({
            username,
            email,
            orders:orderDocs.map((order)=>order._id)
        })

        await user.save();

        res.status(201).json({
            data:user
        })

    } catch (error) {
        console.error(first)
        res.status(500).send(error)
    }
}


const get=async (req, res)=>{
    try {
        const user = await UserManyModel.findById(req.params.id).populate("orders")

        res.status(200).json({
            data:user
        })
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

module.exports={
    create,
    get
}