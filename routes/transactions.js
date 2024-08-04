const { getTransactions } = require('../controllers/transactions');
const express = require('express')
const router = express.Router();

router.route('/').get(getTransactions);
module.exports = router;