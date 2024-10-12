const {TransactionModel, UserSqModel} = require("../../model/one-to-squillions/index.js")


const create = async (req, res)=>{
    try {
        const {username, email} = req.body
        
        const newUser = new UserSqModel({
            username,
            email
        })

        await newUser.save();

        res.status(201).json({
            data:newUser
        })

    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

const createTransactions = async (req, res)=>{
    try {
        const {id} = req.params
        const {amount, date, description} = req.body

        const newTransaction = new TransactionModel({
            amount,
            date,
            description,
            userId:id
        })

        await newTransaction.save();

        res.status(201).json({
            data:newTransaction
        })
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}


const get = async (req, res)=>{
    try {
        const {id} = req.params
        const {page=1, limit=10} = req.query
        
        const transaction = await TransactionModel.find({userId:id}).limit(limit*1).skip((page-1)*limit).exec();


        const count = await TransactionModel.countDocuments({userId:id});

        res.status(200).json({
            data:{
                transaction,
                totalPages:Math.ceil(count/limit),
                current:page
            }
        })

    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

module.exports={
    create,
    createTransactions,
    get
}