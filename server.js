const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const staticServe = express.static(`${ __dirname }/build`);

app.use("/", staticServe);
app.use("*", staticServe);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
