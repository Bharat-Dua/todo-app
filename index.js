const app = require("./app")
// listen server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server is listening at ${port}`));