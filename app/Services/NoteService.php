<?php

namespace App\Services;

use App\Models\Note;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class NoteService
{
    public function create(array $data): Note
    {
        $this->validate($data);
        return Note::create($data);
    }

    public function update(Note $note, array $data): Note
    {
        $this->validate($data, $note->id);
        $note->update($data);
        return $note;
    }

    public function delete(Note $note): bool
    {
        return $note->delete();
    }

    public function list(string $orderBy = 'created_at', string $direction = 'desc'): Collection
    {
        return Note::with(['user', 'tags'])
        ->orderBy($orderBy, $direction)
        ->get();

    }

    private function validate(array $data, ?int $noteId = null): void
    {
        $rules = [
            'user_id' => 'required|exists:users,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'due_date' => 'nullable|date',
            'image' => 'nullable|string',
        ];

        $validator = Validator::make($data, $rules);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }
}
