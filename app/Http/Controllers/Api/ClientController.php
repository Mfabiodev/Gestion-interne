<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;
use App\Imports\ClientsImport;
use Maatwebsite\Excel\Facades\Excel;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Client::with('dossiers')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:clients,name',
            'numero_de_police' => 'nullable|string|max:255',
        ]);

        $client = Client::create($validatedData);

        return response()->json($client, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Client $client)
    {
        return $client->load('dossiers');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Client $client)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:clients,name,' . $client->id,
            'numero_de_police' => 'nullable|string|max:255',
        ]);

        $client->update($validatedData);

        return response()->json($client);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client)
    {
        $client->delete();

        return response()->json(null, 204);
    }

    /**
     * Import clients from a file.
     */
    public function import(Request $request)
    {
        $request->validate([
            'clients_file' => 'required|file|mimes:xlsx,xls,csv'
        ]);

        Excel::import(new ClientsImport, $request->file('clients_file'));

        return response()->json(['message' => 'Importation des clients réussie'], 200);
    }
}
