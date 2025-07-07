import Note from "../models/Note.js";

export async function getNotes(_, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 }) //-1 will sort in descending order (Newest first)
        res.status(200).json(notes)
    } catch (error) {
        console.error('Error in getting Notes')
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function getNoteByID(req, res) {
    try {
        const noteByID = await Note.findById(req.params.id)
        if (!noteByID) return res.status(404).json({ message: "Note not found" })
        res.status(200).json(noteByID)
    } catch (error) {
        console.error("Error in finding the note")
        res.status(500).json({ message: "Internal Server Error" })
    }
}
export async function postNotes(req, res) {
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content });

        const savedNote = await newNote.save();
        res.status(201).json(savedNote)
    } catch (error) {
        console.error('Error in creating Notes', error)
        res.status(500).json({ message: "Internal Server Error" })
    }

}

export async function putNotes(req, res) {
    try {

        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true, }); //req.params.variable_name should match that in the notesRoutes.js

        if (!updatedNote) return res.status(404).json({ message: "Note not found" })

        res.status(200).json(updatedNote)
    } catch (error) {
        console.error('Error in updating Notes', error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function deleteNotes(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if (!deletedNote) res.status(404).json({ message: "Note not found" })

        res.status(200).json({ message: "Note deleted successfully" })
    } catch (error) {
        console.error("Could not delete the Note")
        res.status(500).json({ message: "Internal Server Error" })
    }
}

// mongodb+srv://rohanmanhas407:4YsZEegizF9nvvP2@cluster0.gmktafj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0