import { Note } from "@/models/Note.ts";

interface NoteInput {
  title: string;
  description?: string;
}

async function fetchData(
  input: RequestInfo,
  init?: RequestInit,
): Promise<Response> {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  }

  const errorBody = await response.json();
  const errorMessage = errorBody.error;
  throw Error(errorMessage);
}

// Notes

export async function fetchNotes(): Promise<Note[]> {
  const response = await fetchData(
    `${import.meta.env.VITE_BASE_URL}/api/notes`,
    {
      method: "GET",
      credentials: "include",
    },
  );
  const responseData = await response.json();

  if (responseData && Array.isArray(responseData.data)) {
    return responseData.data; // Return the notes array inside 'data'
  } else {
    console.error("Unexpected API response:", responseData);
    return []; // Return an empty array if 'data' is not an array
  }
}

export async function createNote(note: NoteInput) {
  const response = await fetchData(
    `${import.meta.env.VITE_BASE_URL}/api/notes`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
      credentials: "include",
    },
  );

  const responseData = await response.json();

  if (responseData && responseData.data) {
    // If data is an object, handle it directly
    return Array.isArray(responseData.data)
      ? responseData.data
      : [responseData.data];
  } else {
    console.error("Unexpected API response:", responseData);
    return [];
  }
}

export async function updateNote(noteId: string, note: NoteInput) {
  const response = await fetchData(
    `${import.meta.env.VITE_BASE_URL}/api/notes/${noteId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
      credentials: "include",
    },
  );

  const responseData = await response.json();

  if (responseData && Array.isArray(responseData.data)) {
    return responseData.data;
  } else {
    console.error("Unexpected API response:", responseData);
    return [];
  }
}

export async function deleteNote(noteId: string) {
  await fetchData(`${import.meta.env.VITE_BASE_URL}/api/notes/${noteId}`, {
    method: "DELETE",
    credentials: "include",
  });
}
