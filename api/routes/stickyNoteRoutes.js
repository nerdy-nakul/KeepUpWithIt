const express = require('express');
const { getStickyNotes, createStickyNote, updateStickyNote, deleteStickyNote } = require('../controllers/stickyNoteController');
const router = express.Router();

router.get('/sticky-notes', getStickyNotes);
router.post('/sticky-notes', createStickyNote);
router.put('/sticky-notes/:id', updateStickyNote);
router.delete('/sticky-notes/:id', deleteStickyNote);

module.exports = router;
