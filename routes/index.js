const express = require('express');
const router = express.Router();
const {getSavedPrayers, savePrayers} = require("../controllers/prayers")

router.get('/prayers', getSavedPrayers)

//Body Parsing
router.use(express.json({limit: '50mb'}));
router.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

router.post('/savePrayers', savePrayers)

module.exports = router;