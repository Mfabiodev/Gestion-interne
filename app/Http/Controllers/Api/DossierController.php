<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Dossier;
use Illuminate\Http\Request;

use App\Models\Check;
use Illuminate\Support\Facades\Auth;

class DossierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Dossier::with('user')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'dossier_number' => 'required|string|unique:dossiers|max:255',
            'user_id' => 'required|exists:users,id',
        ]);

        $dossier = Dossier::create($request->all());

        return response()->json($dossier, 201);
    }

    public function assignCheck(Request $request, Dossier $dossier)
    {
        $request->validate([
            'check_id' => 'required|exists:checks,id',
        ]);

        $check = Check::find($request->check_id);

        if ($check->status !== 'disponible') {
            return response()->json(['message' => 'Le chèque n\'est pas disponible.'], 422);
        }

        $check->dossier_id = $dossier->id;
        $check->status = 'utilisé';
        $check->save();

        $check->history()->create([
            'user_id' => Auth::id(),
            'action' => 'assignation',
            'details' => 'Assigné au dossier ' . $dossier->dossier_number,
        ]);

        return response()->json($check, 200);
    }

    /**
     * Display the specified resource.
     */

    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
