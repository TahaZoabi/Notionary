import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useForm } from "react-hook-form";
import { Note } from "@/models/Note.ts";

import * as NotesAPI from "@/network/notes_api.ts";

interface NoteInput {
  title: string;
  description?: string;
}

interface AddEditNoteDialogProps {
  noteToEdit?: Note;
  onNotesSaved: (note: Note) => void;
  onCancel: () => void;
}

export function AddEditNoteDialog({
  onNotesSaved,
  onCancel,
  noteToEdit,
}: AddEditNoteDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      description: noteToEdit?.description || "",
    },
  });

  async function onSubmit(input: NoteInput) {
    try {
      let noteResponse: Note;
      if (noteToEdit) {
        noteResponse = await NotesAPI.updateNote(noteToEdit._id, input);
      } else {
        noteResponse = await NotesAPI.createNote(input);
      }

      onNotesSaved(noteResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Card className="w-full max-w-[450px]">
      <CardHeader>
        <CardTitle className={"text-center"}>
          {noteToEdit ? "Update Note" : "Create New Note"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} id={"add-edit-note-form"}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Note Title</Label>
              <Input
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 3,
                    message: "Title should be 3 characters at least",
                  },
                })}
                id="title"
                placeholder="Add a meaningful title..."
              />
              <CardDescription className={"text-destructive text-sm my-3"}>
                {errors.title?.message}
              </CardDescription>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="note-text">Note Text</Label>
              <Textarea
                {...register("description", {
                  maxLength: {
                    value: 50,
                    message: "Note text cannot exceed 50 characters.",
                  },
                })}
                id="note-text"
                placeholder="Add details, thoughts, or reminders..."
                rows={5}
                cols={25}
              />
              <CardDescription className={"text-destructive text-sm my-3"}>
                {errors.description?.message}
              </CardDescription>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          disabled={isSubmitting}
          form={"add-edit-note-form"}
          type={"submit"}
        >
          Confirm
        </Button>
      </CardFooter>
    </Card>
  );
}
