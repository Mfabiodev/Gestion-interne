<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Check;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $checksByStatus = Check::select('status', DB::raw('count(*) as total'))
                               ->groupBy('status')
                               ->pluck('total', 'status');

        $checksByType = Check::select('check_type', DB::raw('count(*) as total'))
                             ->groupBy('check_type')
                             ->pluck('total', 'check_type');

        $availableChecksByType = Check::where('status', 'disponible')
                                      ->select('check_type', DB::raw('count(*) as total'))
                                      ->groupBy('check_type')
                                      ->pluck('total', 'check_type');

        $distinctCheckTypes = Check::select('check_type')->distinct()->pluck('check_type');

        $recentChecks = Check::with('client')->latest()->take(5)->get();

        return response()->json([
            'checksByStatus' => $checksByStatus,
            'checksByType' => $checksByType,
            'availableChecksByType' => $availableChecksByType,
            'distinctCheckTypes' => $distinctCheckTypes,
            'recentChecks' => $recentChecks,
        ]);
    }
}
