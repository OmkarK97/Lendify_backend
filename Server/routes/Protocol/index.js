const { Router } = require("express");
const { Protocol } = require("../../../DB");
const router = Router();

router.post('/send', async (req, res) => {
    try {
        const { USDC_Deposit_Total, Total_Diam_Deposit, Total_USDC_Borrowed, Available_Borrow_USDC } = req.body;

        // Fetch existing data if present
        const existingData = await Protocol.findOne({});

        if (existingData) {
            // Update the existing record with new data
            await Protocol.updateOne({}, {
                USDC_Deposit_Total: existingData.USDC_Deposit_Total + USDC_Deposit_Total,
                Total_Diam_Deposit: existingData.Total_Diam_Deposit + Total_Diam_Deposit,
                Total_USDC_Borrowed: existingData.Total_USDC_Borrowed + Total_USDC_Borrowed,
                Available_Borrow_USDC: existingData.Available_Borrow_USDC + Available_Borrow_USDC
            });

            res.status(200).json({
                msg: 'Data Updated'
            });
        } else {
            // Create a new record if none exists
            await Protocol.create({
                USDC_Deposit_Total,
                Total_Diam_Deposit,
                Total_USDC_Borrowed,
                Available_Borrow_USDC,
                Supply_Rate: 6,
                Borrow_Rate: 8
            });

            res.status(200).json({
                msg: 'Data Created'
            });
        }
    } catch (error) {
        console.error('Error updating data', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/get', async (req, res) => {
    try {

        const response = await Protocol.findOne({})

        res.status(200).json({
            msg: response
        })
        
    } catch (error) {
        console.error('Error getting data', error);
    }
})

module.exports = router;
