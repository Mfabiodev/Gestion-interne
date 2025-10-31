<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Check extends Model
{
    use HasFactory;

    protected $fillable = [
        'check_number',
        'bank_name',
        'check_type',
        'amount',
        'issue_date',
        'status',
        'remarks',
        'client_id',
        'dossier_id',
        'user_id',
        'replaced_by_check_id',
        'replaced_check_id',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function dossier()
    {
        return $this->belongsTo(Dossier::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function history()
    {
        return $this->hasMany(CheckHistory::class);
    }

    public function replacedBy()
    {
        return $this->belongsTo(Check::class, 'replaced_by_check_id');
    }

    public function replacementFor()
    {
        return $this->hasOne(Check::class, 'replaced_by_check_id');
    }
}
