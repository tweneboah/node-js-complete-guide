const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task')

const app = express();
const port = process.env.PORT || 4000
app.use(express.json())

//Using router
app.use(userRouter);
app.use(taskRouter);


//SERVER
app.listen(port, () => {
    console.log('Server is runing on port ' + port)
})

