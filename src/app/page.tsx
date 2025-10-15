'use client';

import { useState, useEffect, useRef } from 'react';
import { Bold, Italic, Underline, FilePlus, Trash2, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

type Note = {
  id: string;
  title: string;
  content: string;
  lastModified: number;
};

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        const savedNotes = localStorage.getItem('simply-start-notes');
        if (savedNotes) {
          const parsedNotes: Note[] = JSON.parse(savedNotes);
          const sorted = parsedNotes.sort((a, b) => b.lastModified - a.lastModified);
          setNotes(sorted);
          if (sorted.length > 0 && activeNoteId === null) {
            setActiveNoteId(sorted[0].id);
          }
        }
      } catch (error) {
        console.error('Failed to load notes from local storage', error);
        setNotes([]);
      }
    }
  }, [isMounted, activeNoteId]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('simply-start-notes', JSON.stringify(notes));
    }
  }, [notes, isMounted]);

  const activeNote = notes.find((note) => note.id === activeNoteId);

  const handleNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'New Note',
      content: '',
      lastModified: Date.now(),
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setActiveNoteId(newNote.id);
  };

  const handleDeleteNote = (noteIdToDelete: string) => {
    setNotes(prevNotes => {
        const newNotes = prevNotes.filter(n => n.id !== noteIdToDelete);
        if (activeNoteId === noteIdToDelete) {
            const sortedRemaining = newNotes.slice().sort((a,b) => b.lastModified - a.lastModified);
            setActiveNoteId(sortedRemaining.length > 0 ? sortedRemaining[0].id : null);
        }
        return newNotes;
    });
  };

  const handleNoteChange = (field: 'title' | 'content', value: string) => {
    if (!activeNoteId) return;
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === activeNoteId
          ? { ...note, [field]: value, lastModified: Date.now() }
          : note
      )
    );
  };

  const applyFormatting = (style: 'bold' | 'italic' | 'underline') => {
    const textarea = textareaRef.current;
    if (!textarea || activeNote === undefined) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    const markers = {
        bold: '**',
        italic: '*',
        underline: '__',
    };
    const marker = markers[style];
    
    const newContent = 
      textarea.value.substring(0, start) +
      marker +
      selectedText +
      marker +
      textarea.value.substring(end);

    handleNoteChange('content', newContent);
    
    setTimeout(() => {
        textarea.focus();
        textarea.selectionStart = start + marker.length;
        textarea.selectionEnd = end + marker.length;
    }, 0);
  };


  if (!isMounted) {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-background">
            <Book className="w-12 h-12 animate-pulse text-primary" />
        </div>
    );
  }

  return (
    <div className="flex h-screen bg-background text-foreground font-body">
      <aside className="w-80 flex-shrink-0 border-r border-border p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
          <h1 className="text-2xl font-bold font-headline flex items-center gap-2">
            <Book className="w-6 h-6 text-primary" />
            SimplyStart
          </h1>
          <Button variant="ghost" size="icon" onClick={handleNewNote} aria-label="New Note">
            <FilePlus />
          </Button>
        </div>
        <div className="flex-grow overflow-y-auto -mx-4">
          <div className="px-4">
          {notes.length > 0 ? (
            <ul className="space-y-2">
              {notes
                .slice()
                .sort((a, b) => b.lastModified - a.lastModified)
                .map((note) => (
                <li key={note.id}>
                  <button
                    onClick={() => setActiveNoteId(note.id)}
                    className={cn(
                      "w-full text-left p-3 rounded-lg transition-colors",
                      activeNoteId === note.id
                        ? 'bg-accent text-accent-foreground'
                        : 'hover:bg-accent/50'
                    )}
                  >
                    <h3 className="font-semibold truncate">{note.title || "Untitled Note"}</h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {note.content.substring(0, 40) || 'No content'}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-muted-foreground mt-10 p-4">
                <p>No notes yet.</p>
                <p className="text-sm">Click the [+] to create one!</p>
            </div>
          )}
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        {activeNote ? (
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-border flex items-center justify-between gap-4 flex-wrap">
                <Input
                  value={activeNote.title}
                  onChange={(e) => handleNoteChange('title', e.target.value)}
                  placeholder="Note Title"
                  className="text-2xl font-bold border-none shadow-none focus-visible:ring-0 p-0 h-auto flex-grow bg-transparent"
                />
                <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-sm text-muted-foreground hidden sm:inline">
                        {format(new Date(activeNote.lastModified), "MMM d, h:mm a")}
                    </span>
                    <Button variant="ghost" size="icon" onClick={() => applyFormatting('bold')} aria-label="Bold">
                        <Bold className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => applyFormatting('italic')} aria-label="Italic">
                        <Italic className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => applyFormatting('underline')} aria-label="Underline">
                        <Underline className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDeleteNote(activeNote.id)} aria-label="Delete note">
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>
            <div className="flex-grow p-6">
              <Textarea
                ref={textareaRef}
                value={activeNote.content}
                onChange={(e) => handleNoteChange('content', e.target.value)}
                placeholder="Start writing your note..."
                className="w-full h-full resize-none border-none shadow-none focus-visible:ring-0 text-base leading-relaxed bg-transparent"
              />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center text-muted-foreground">
            <div>
              <Book className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h2 className="text-xl font-semibold">Select a note to view</h2>
              <p>Or create a new one to get started.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
