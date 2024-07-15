require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const portocolRouter = require('./routes/Protocol/index');
const userRouter = require('./routes/User/index');

app.use(express.json());
app.use(cors());

app.use('/protocolData', portocolRouter);
app.use('/userData', userRouter);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`listening on ${port}`);
});
