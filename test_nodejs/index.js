const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const app = express();
const mapelRouter = require('./routes/mapel');
const jadwalRouter = require('./routes/jadwal');
const jwtRouter = require('./routes/jwt');
const response = require('./config/payload');

const PORT = 8080;

dotenv.config();
app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/jwt', jwtRouter);

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null){
      return response.errAuthorize('UnAuthorized Permission Denied', res.status(500));
    }
  
    jwt.verify(token, process.env.TOKEN, (err, user) => {
  
      if (err){
        return response.errAuthorize('UnAuthorized Permission Denied', res.status(500));
      }
  
      req.user = user
  
      next()
    })
}

app.use('/mapel', authenticateToken, mapelRouter);
app.use('/jadwal', authenticateToken, jadwalRouter);

app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`)
});