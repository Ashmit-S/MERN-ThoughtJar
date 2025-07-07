import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
},
    {
        timestamps: true //MongoDB will by default give you createdAt, updatedAt fields
    }
);

const Note = mongoose.model("Note", noteSchema) //Create a "Note" model based off of noteSchema

export default Note