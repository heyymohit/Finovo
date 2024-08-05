const { getTransactions, addTransaction, deleteTransaction } = require('../controllers/transactions');
const express = require('express')
const router = express.Router();

router
    .route('/')
    .get(getTransactions)
    .post(addTransaction);

router
    .route('/:id')
    .delete(deleteTransaction);

module.exports = router;