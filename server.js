require('dotenv').config()
const app = require('./src/api')
const connectDb = require('./src/configs/db.config')
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  connectDb
  console.log(`Server is running on port:${PORT}.`)
})
