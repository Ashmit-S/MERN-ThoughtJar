import express from "express"
import { getNotes, postNotes, putNotes, deleteNotes, getNoteByID } from '../controller/notesController.js'
const router = express.Router();

router.get('/', getNotes)
router.get('/:id', getNoteByID)
router.post('/', postNotes)

router.put('/:id', putNotes)
router.delete('/:id', deleteNotes)

export default router