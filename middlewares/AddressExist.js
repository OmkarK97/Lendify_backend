const { User } = require("../DB");

async function addressMiddleware(req, res, next) {
    try {
        const address = req.body.address;
        const existingUser = await User.findOne({ where: { address } });

        if (existingUser) {
            // Merge existing data with new data
            req.body = {
                ...req.body,
                Total_Diam_Deposit: req.body.Total_Diam_Deposit,
                Total_USDC_Deposit: req.body.Total_USDC_Deposit,
                Total_USDC_Borrowed: req.body.Total_USDC_Borrowed,
                Last_Borrowed: req.body.Last_Borrowed || existingUser.Last_Borrowed,
                Last_Supplied: req.body.Last_Supplied || existingUser.Last_Supplied
            };
        }

        next();
    } catch (error) {
        console.error('Error checking address', error);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = addressMiddleware;
