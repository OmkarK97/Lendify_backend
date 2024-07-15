const { Router } = require("express");
const { User } = require("../../../DB");
const router = Router();

router.post('/send', async (req, res) => {
    try {
        const {address, Total_Diam_Deposit, Total_USDC_Deposit, Total_USDC_Borrowed, Last_Borrowed, Last_Supplied } = req.body;

        // Fetch existing data if address exists
        const existingUser = await User.findOne({address: address});

        if (existingUser) {
            // Merge existing data with new data
            const updatedData = {
                Total_Diam_Deposit: existingUser.Total_Diam_Deposit + Total_Diam_Deposit,
                Total_USDC_Deposit: existingUser.Total_USDC_Deposit + Total_USDC_Deposit,
                Total_USDC_Borrowed: existingUser.Total_USDC_Borrowed + Total_USDC_Borrowed,
                Last_Borrowed,
                Last_Supplied
            };

            // Update the existing record in the database
            await User.updateMany({address: address}, updatedData);

            res.status(200).json({
                msg: 'User Data Updated Successfully',
                updatedData,
            });
        } else {
            // If address does not exist, create a new record
            const response = await User.create({
                address,
                Total_Diam_Deposit,
                Total_USDC_Deposit,
                Total_USDC_Borrowed,
                Last_Borrowed,
                Last_Supplied
            });

            res.status(200).json({
                msg: 'User Data Stored Successfully',
                response,
            });
        }
    } catch (error) {
        console.error('Error adding data', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/get', async (req, res) => {
    try {
        
        const { address } = req.query;

        const response = await User.findOne({address: address})

        res.status(200).json({
            msg: response
        })

    } catch (error) {
        console.error('Error getting data', error);
    }
})

module.exports = router;
