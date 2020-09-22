const express = require("express")
const app = express()
app.get('', (req, res) => {
    res.send('API is running');
});
const PORT = 5000;
app.listen(5000, () => {
    console.log('App listening on port 5000!');
});

