import Navbar from '../Components/Navbar'
import RateLimitedUI from '../Components/RateLimitedUI'
import NoteCard from '../Components/NoteCard'
import { useEffect, useState } from 'react'
import toast from "react-hot-toast"
import NotesNotFound from '../Components/NotesNotFound'
import api from '../lib/axios'

const HomePage = () => {
    const [isRateLimited, setIsRateLimited] = useState(false)
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await api.get("/notes");

                if (res.status == 429) {
                    setIsRateLimited(true)
                }

                console.log(res.data)

                //Or you could import axios from axios and use
                //const res = await axios.get("https://localhost:5001/api/notes")
                //console.log(res.data)

                setNotes(res.data)
                setIsRateLimited(false)

            } catch (error) {
                console.log("Error fetching notes")
                toast.error("Failed to Load Notes")
            }
            finally {
                setLoading(false)
            }
        }
        fetchNotes();

    }, [])

    return (
        <div className='min-h-screen'>
            <Navbar />
            {isRateLimited && <RateLimitedUI />}
            <div className='max-w-7xl mx-auto p-4 mt-6'>
                {loading && <div className='text-center text-primary py-10'>Loading Thoughts...</div>}

                {notes.length === 0 && !isRateLimited && <NotesNotFound />}
                {notes.length > 0 && !isRateLimited && (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {notes.map(note => (
                            <NoteCard key={note._id} note={note} setNotes={setNotes} />
                        ))}


                    </div>
                )}
            </div>

        </div>
    )
}

export default HomePage