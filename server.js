const app = require("./app");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
global.domain = process.env.NODE_ENV === 'production' ? process.env.DOMAIN : `http://localhost:${PORT}/`;

app.listen(PORT, () => {
    console.log(`Server running port ${PORT}`);
});