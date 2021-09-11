const express = require('express');
const router = express.Router();
const taxamt = require('../controller/taxincContrller');
const checkauth = require('../middleware/authntication');

router.post('/', checkauth, taxamt.calculateTaxInc)
router.get('/', checkauth, taxamt.getEntry)

module.exports = router;