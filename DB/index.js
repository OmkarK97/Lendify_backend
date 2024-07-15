require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODBURL)

const ProtocolSchema = new mongoose.Schema({
    USDC_Deposit_Total: Number,
    Total_Diam_Deposit: Number,
    Total_USDC_Borrowed: Number,
    Available_Borrow_USDC: Number,
    Supply_Rate: {type: Number, required: false, default: 6},
    Borrow_Rate: {type: Number, required: false, default: 8}
});

const UserSchema = new mongoose.Schema({
    address: String,
    Total_Diam_Deposit: Number,
    Total_USDC_Deposit: Number,
    Total_USDC_Borrowed: Number,
    Last_Borrowed: {type: Number, required: false},
    Last_Supplied: {type: Number, required: false}
});

const Protocol = mongoose.model('Protocol', ProtocolSchema);
const User = mongoose.model('User', UserSchema);

module.exports = {
    Protocol,
    User
};
