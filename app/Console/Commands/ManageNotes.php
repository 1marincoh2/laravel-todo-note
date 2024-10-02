<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Models\Note;
use App\Services\NoteService;
use Illuminate\Console\Command;

class ManageNotes extends Command
{
    protected $signature = 'notes:manage {action} {--user=} {--note=} {--title=} {--description=} {--due_date=} {--order_by=} {--direction=}';
    protected $description = 'Manage notes: create, update, list, or delete';
    protected $noteService;

    public function __construct(NoteService $noteService)
    {
        parent::__construct();
        $this->noteService = $noteService;
    }

    public function handle()
    {
        $action = $this->argument('action');
        switch ($action) {
            case 'create':
                $this->createNote();
                break;
            case 'update':
                $this->updateNote();
                break;
            case 'list':
                $this->listNotes();
                break;
            case 'delete':
                $this->deleteNote();
                break;
            default:
                $this->error('Invalid action. Use create, update, list, or delete.');
        }
    }

    private function createNote()
    {
        $userId = $this->option('user');
        $user = User::findOrFail($userId);

        $data = [
            'user_id' => $user->id,
            'title' => $this->option('title') ?? $this->ask('Enter note title:'),
            'description' => $this->option('description') ?? $this->ask('Enter note description:'),
            'due_date' => $this->option('due_date') ?? $this->ask('Enter due date (YYYY-MM-DD):'),
        ];

        $note = $this->noteService->create($data);
        $this->info("Note created: {$note->title}");
    }

    private function updateNote()
    {
        $noteId = $this->option('note');
        $note = Note::findOrFail($noteId);

        // Obtener los nuevos valores o mantener los actuales si no se proporcionan
        $data = [
            'title' => $this->option('title') ?? $note->title,
            'description' => $this->option('description') ?? $note->description,
            'due_date' => $this->option('due_date') ?? $note->due_date,
            'user_id' => $this->option('user') ?? $note->user_id, // Mantener el user_id actual si no se proporciona
        ];

        // Asegurarse de que el 'user_id' esté presente
        if (empty($data['user_id'])) {
            $this->error('The user id field is required.');
            return;
        }

        $data = array_filter($data);  // Remover valores vacíos

        // Actualizar la nota con los datos proporcionados
        $note = $this->noteService->update($note, $data);

        // Mensaje de éxito
        $this->info("Note updated: {$note->title}");
    }

    private function listNotes()
    {
        $orderBy = $this->option('order_by') ?? 'created_at';
        $direction = $this->option('direction') ?? 'desc';
        $notes = $this->noteService->list($orderBy, $direction);
        $this->table(['ID', 'Title', 'Description', 'Due Date', 'Created At'], $notes->map(function ($note) {
            return [$note->id, $note->title, $note->description, $note->due_date, $note->created_at];
        }));
    }

    private function deleteNote()
    {
        $noteId = $this->option('note');
        $note = Note::findOrFail($noteId);
        $this->noteService->delete($note);
        $this->info("Note deleted: {$note->title}");
    }
}
