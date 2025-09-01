<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Imports\ChecksImport;
use App\Models\Check;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\DB;

class CheckController extends Controller
{
    public function index(Request $request)
    {
        return Check::with(['client', 'dossier', 'user'])->latest()->get();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'check_number' => 'required|string|unique:checks,check_number|max:255',
            'bank_name' => 'required|string|max:255',
            'check_type' => 'required|string|max:255',
        ]);

        $check = Check::create($validatedData + ['user_id' => Auth::id()]);

        $check->history()->create([
            'user_id' => Auth::id(),
            'action' => 'création',
        ]);

        return response()->json($check, 201);
    }

    public function show(Check $check)
    {
        return $check->load(['client', 'dossier', 'user', 'history.user']);
    }

    public function update(Request $request, Check $check)
    {
        $validatedData = $request->validate([
            'check_number' => 'required|string|max:255|unique:checks,check_number,' . $check->id,
            'bank_name' => 'required|string|max:255',
            'check_type' => 'required|string|max:255',
        ]);

        $check->update($validatedData);
        
        $check->history()->create([
            'user_id' => Auth::id(),
            'action' => 'modification',
        ]);

        return response()->json($check);
    }

    public function destroy(Check $check)
    {
        if ($check->status !== 'disponible') {
            return response()->json(['message' => 'Impossible de supprimer un chèque qui n\'est pas disponible.'], 422);
        }

        $check->delete();

        return response()->json(null, 204);
    }

    public function import(Request $request)
    {
        $request->validate([
            'checks_file' => 'required|file|mimes:xlsx,xls,csv'
        ]);

        Excel::import(new ChecksImport, $request->file('checks_file'));

        return response()->json(['message' => 'Importation réussie'], 200);
    }

    public function replace(Request $request, Check $check)
    {
        $request->validate([
            'new_check_id' => 'required|exists:checks,id',
        ]);

        $newCheck = Check::find($request->new_check_id);

        if ($check->status !== 'utilisé') {
            return response()->json(['message' => 'Le chèque à remplacer doit être déjà utilisé.'], 422);
        }

        if ($newCheck->status !== 'disponible') {
            return response()->json(['message' => 'Le nouveau chèque doit être disponible.'], 422);
        }

        $originalDossierId = $check->dossier_id;

        DB::transaction(function () use ($check, $newCheck, $originalDossierId) {
            $check->dossier_id = null;
            $check->status = 'remplacé';
            $check->save();

            $newCheck->dossier_id = $originalDossierId;
            $newCheck->status = 'utilisé';
            $newCheck->save();

            $check->history()->create([
                'user_id' => Auth::id(),
                'action' => 'remplacement',
                'details' => 'Remplacé par le chèque ' . $newCheck->check_number,
            ]);

            $newCheck->history()->create([
                'user_id' => Auth::id(),
                'action' => 'remplacement',
                'details' => 'Remplace le chèque ' . $check->check_number,
            ]);
        });

        return response()->json(['message' => 'Chèque remplacé avec succès.'], 200);
    }

    public function history(Check $check)
    {
        return $check->history()->with('user')->latest()->get();
    }
}
