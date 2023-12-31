const express = require('express');
const router = express.Router();
const {getSavedPrayers, savePrayers} = require("../controllers/prayers");
const { getAnnouncements, saveAnnouncements, deleteAnnouncement } = require('../controllers/announcements');

router.get('/prayers', getSavedPrayers)
router.get('/announcements', getAnnouncements)

//Body Parsing
router.use(express.json({limit: '50mb'}));
router.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

router.post('/savePrayers', savePrayers)
router.post('/postAnnouncements', saveAnnouncements)

router.delete('/announcement/:index', deleteAnnouncement);

module.exports = router;