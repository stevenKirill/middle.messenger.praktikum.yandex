const express = require('express');
// const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const staticServe = express.static(`${ __dirname }/build`);

app.use("/", staticServe);
app.use("*", staticServe);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// app.get("/*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
// });
