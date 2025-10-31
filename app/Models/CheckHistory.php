<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CheckHistory extends Model
{
    use HasFactory;

    protected $table = 'check_history';
    
    protected $fillable = ['check_id', 'user_id', 'action', 'details'];

    public function check()
    {
        return $this->belongsTo(Check::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
