require('dotenv').config({path: './config/.env'})
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);


/**===================
 * ===== PARSING =====
 * ===================
 */
// Corps des requêtes pour pouvoir être utilisable par la suite
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Cookies pour pouvoir être utilisable par la suite
app.use(cookieParser());


/**=======================
 * ====== LANCEMENT ======
 * =======================
 */
// Contenu Front-end
app.use(express.static('./client'))
    .use(cors())
    .use(cookieParser());


server.listen(PORT, () => {
    console.log("🔌 Le serveur en marche sur le port " + PORT);
})