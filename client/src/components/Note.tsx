import { Note as NoteModel } from "@/models/Note.ts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card.tsx";
import { formatDate } from "@/lib/formatDate.ts";
import { Pencil, Trash2 } from "lucide-react";

interface NoteProps {
  note: NoteModel;
  onEditNoteClick: (note: NoteModel) => void;
  onDeleteNoteClick: (note: NoteModel) => void;
}

function Note({ note, onDeleteNoteClick, onEditNoteClick }: NoteProps) {
  const { title, description, updatedAt, createdAt } = note;

  let createdUpdateText: string;
  if (updatedAt > createdAt) {
    createdUpdateText = `Updated: ${formatDate(updatedAt)}`;
  } else {
    createdUpdateText = `Created: ${formatDate(createdAt)}`;
  }
  return (
    <>
      <Card className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 w-full">
        <CardHeader className="bg-gray-100 p-4 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-primary mb-4">
            {description || "No content available."}
          </p>
        </CardContent>
        <CardFooter
          className={"border-t flex justify-between items-center p-3"}
        >
          <p className="text-sm text-gray-500  w-full ">{createdUpdateText}</p>
          <div className={"flex gap-3 "}>
            <Pencil
              className={
                "h-5 w-5 text-gray-500 hover:text-primary hover:scale-110 hover:shadow-sm"
              }
              onClick={() => {
                onEditNoteClick(note);
              }}
            />
            <Trash2
              className={
                "h-5 w-5 text-destructive hover:scale-110 hover:shadow-sm"
              }
              onClick={(e) => {
                onDeleteNoteClick(note);
                e.stopPropagation();
              }}
            />
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

export default Note;
