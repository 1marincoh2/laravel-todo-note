<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Note;
use App\Services\NoteService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class NoteController extends Controller
{
    protected $noteService;

    public function __construct(NoteService $noteService)
    {
        $this->noteService = $noteService;
    }

    public function index(Request $request)
    {
        $orderBy = $request->input('order_by', 'created_at');
        $direction = $request->input('direction', 'desc');
        return $this->noteService->list($orderBy, $direction);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'due_date' => 'nullable|date',
            'image' => 'nullable|image|max:2048', // Imagen opcional
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
        ]);

        // Asignar el ID del usuario autenticado
        $validatedData['user_id'] = $request->user()->id;

        // // Verificar si hay una imagen y guardarla en 'public/notes'
        // if ($request->hasFile('image')) {
        //     $validatedData['image'] = $request->file('image')->store('notes', 'public');
        // }

        // Crear la nota
        $note = $this->noteService->create($validatedData);

        // Sincronizar las etiquetas si se proporcionaron
        if (isset($validatedData['tags'])) {
            $note->tags()->sync($validatedData['tags']);
        }

        // Generar URL de la imagen
        // $note->image = $note->image ? Storage::url($note->image) : null;

        // Devolver la nota creada con la URL de la imagen
        return response()->json($note, 201);
    }


    public function show(Note $note)
    {
        $this->authorize('view', $note);
        return $note->load('tags');
    }

    public function update(Request $request, Note $note)
{
    $this->authorize('update', $note);

    $validatedData = $request->validate([
        'title' => 'sometimes|required|string|max:255',
        'description' => 'sometimes|required|string',
        'due_date' => 'nullable|date',
        // 'image' => 'nullable|image|max:2048',
        'tags' => 'nullable|array',
        'tags.*' => 'exists:tags,id',
    ]);

    // // Manejo de la imagen
    // if ($request->hasFile('image')) {
    //     // Eliminar la imagen anterior
    //     if ($note->image) {
    //         Storage::disk('public')->delete($note->image);
    //     }
    //     // Almacenar la nueva imagen
    //     $validatedData['image'] = $request->file('image')->store('notes', 'public');
    // }

    // Actualizar la nota
    $note = $this->noteService->update($note, $validatedData);

    // Sincronizar las etiquetas si se proporcionaron
    if (isset($validatedData['tags'])) {
        $note->tags()->sync($validatedData['tags']);
    }

    // // Generar URL de la imagen
    // $note->image = $note->image ? Storage::url($note->image) : null;

    return response()->json($note, 200);
}



    public function destroy(Note $note)
    {
        $this->authorize('delete', $note);
        $this->noteService->delete($note);
        return response()->json(null, 204);
    }
}
