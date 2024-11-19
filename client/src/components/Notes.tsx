import { useEffect, useState } from "react";
import { Note as NoteModel } from "@/models/Note.ts";

import { Button } from "@/components/ui/button.tsx";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner.tsx";
import Note from "@/components/Note.tsx";

function Notes() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  // const [showDialog, setShowDialog] = useState(false);
  // const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [showLoadingNotesError, setShowLoadingNotesError] = useState(false);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await fetchNotes();
        if (Array.isArray(notes)) {
          setNotes(notes);
        } else {
          console.error("API response is not an array:", notes);
          setNotes([]); // fallback to empty array if the response is not an array
        }
      } catch (error) {
        console.error("Failed to load notes:", error);
        setShowLoadingNotesError(true); // Show error if something goes wrong
      } finally {
        setLoadingNotes(false); // Set loading to false whether the request succeeds or fails
      }
    }

    loadNotes();
  }, []);

  async function fetchNotes(): Promise<NoteModel[]> {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/notes`, {
      method: "GET",
      credentials: "include",
    });

    const responseData = await response.json();

    // Check if the response has a "data" property and is an array
    if (responseData && Array.isArray(responseData.data)) {
      return responseData.data; // Return the array inside "data"
    } else {
      console.error("API response is not an array:", responseData);
      return []; // Return an empty array if it's not an array
    }
  }

  const NotesGrid = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full ">
      {notes.map((note) => (
        <Note
          key={note._id}
          note={note}
          onDeleteNoteClick={""}
          onEditNoteClick={""}
        />
      ))}
    </div>
  );

  return (
    <div className="flex items-center flex-col gap-5 mx-6">
      <div className="flex justify-between px-10 sm:px-20 items-center mb-5 w-full">
        <h1 className="text-primary text-3xl sm:text-4xl">Notes</h1>
        <Button>Add Note</Button>
      </div>

      {/* Show Notes */}
      {loadingNotes && <LoadingSpinner />}
      {showLoadingNotesError && (
        <p className="text-xl text-destructive text-center p-2">
          Something went wrong, Please refresh the page.
        </p>
      )}
      {!loadingNotes && !showLoadingNotesError && (
        <>
          {notes.length > 0 ? (
            NotesGrid
          ) : (
            <p className="text-xl text-destructive text-center p-2">
              Your Note list is empty. Please add some notes.
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default Notes;
