const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const OS = require('os');
const cronMysql = require('./cron/cron-mysql');
const errorHandlerMiddleware = require('./utils/errorHandlerMiddleware');
const invoicesImagesBackup = require('./invoicesImagesBackup/invoicesImagesBackup');

process.env.UV_THREADPOOL_SIZE = OS.cpus().length;

app.use(helmet());
// see https://stackoverflow.com/questions/67166472/cant-remove-x-powered-by-header-in-node-express
// not very important to remve this header, see: https://github.com/expressjs/express/pull/2813#issuecomment-159270428
// removing X-Powered-By: Express is not working with :
app.use(helmet.hidePoweredBy());

app.use(cors());

if (process.env.PROD) {
  invoicesImagesBackup();
  cronMysql();
}

// Bodyparser Middleware
app.use(express.json());


app.use('/users', require('./routes/api/users'));
app.use('/categories', require('./routes/api/categories'));
app.use('/spendings', require('./routes/api/spendings'));
app.use('/recurrings', require('./routes/api/recurringSpendings'));
app.use('/dashboard', require('./routes/api/dashboard'));
app.use('/monthlystats', require('./routes/api/monthlybudgetstats'));
app.use('/weeklystats', require('./routes/api/weeklystats'));

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
