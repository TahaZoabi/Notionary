import { AddEditNoteDialog } from "../../components/AddEditNotesDialog.tsx";
import Note from "@/components/Note.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useEffect, useState } from "react";
import { Note as NoteModel } from "@/models/Note.ts";
import * as NotesAPI from "@/network/notes_api.ts";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner.tsx";

function Notes() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [showLoadingNotesError, setShowLoadingNotesError] = useState(false);
  const fetchNotesData = async () => {
    try {
      setShowLoadingNotesError(false);
      setLoadingNotes(true);

      const notes = await NotesAPI.fetchNotes();
      setNotes(notes);
    } catch (error) {
      console.error("Failed to load notes:", error);
      setShowLoadingNotesError(true);
    } finally {
      setLoadingNotes(false);
    }
  };
  useEffect(() => {
    fetchNotesData();
  }, []);

  const fetchUpdatedNotes = async () => {
    try {
      const updatedNotes = await NotesAPI.fetchNotes();
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Failed to load updated notes:", error);
    }
  };

  async function deleteNote(note: NoteModel) {
    try {
      await NotesAPI.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  const NotesGrid = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-2/3 sm:w-full ">
      {notes.map((note, index) => {
        const key = note._id || `fallback-key-${index}`;
        return (
          <Note
            key={key}
            note={note}
            onDeleteNoteClick={deleteNote}
            onEditNoteClick={setNoteToEdit}
          />
        );
      })}
    </div>
  );

  return (
    <>
      <div
        className={`${showDialog || noteToEdit ? "fixed inset-0 flex items-center justify-center z-50 bg-opacity-30 backdrop-blur-sm" : ""}`}
      >
        {showDialog && (
          <AddEditNoteDialog
            onCancel={() => setShowDialog((dialog) => !dialog)}
            onNotesSaved={(newNote) => {
              setNotes((notes) => [...notes, newNote]);
              setShowDialog((dialog) => !dialog);
              fetchUpdatedNotes();
            }}
          />
        )}

        {noteToEdit && (
          <AddEditNoteDialog
            onNotesSaved={(updatedNote) => {
              notes.map((existingNote) =>
                existingNote._id === updatedNote._id
                  ? updatedNote
                  : existingNote,
              );
              setNoteToEdit(null);
              fetchUpdatedNotes();
            }}
            onCancel={() => setNoteToEdit(null)}
            noteToEdit={noteToEdit}
          />
        )}
      </div>

      <div className={"flex  items-center  flex-col gap-5 w-[90%] mx-4"}>
        <div
          className={
            "flex justify-between px-10 sm:px-20 items-center mb-5 w-full"
          }
        >
          <h1 className={"text-primary text-3xl sm:text-4xl"}>Notes</h1>
          <Button onClick={() => setShowDialog((dialog) => !dialog)}>
            Add Note
          </Button>
        </div>
        {/*Show Notes*/}
        {loadingNotes && <LoadingSpinner />}
        {showLoadingNotesError && (
          <p className={"text-xl text-destructive text-center p-2"}>
            Something went wrong, Please refresh the page.
          </p>
        )}
        {!loadingNotes && !showLoadingNotesError && (
          <>
            {notes.length > 0 ? (
              NotesGrid
            ) : (
              <p className={"text-xl text-destructive text-center p-2"}>
                Your Note list is empty. Please add some notes.
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Notes;
