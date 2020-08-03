require('dotenv')

const app = require("./api/server")
const PORT = process.env.PORT || 5005

app.listen(
    PORT, () => console.log(`[LOG]: API Server is listening on http://localhost:${PORT}`)
) 