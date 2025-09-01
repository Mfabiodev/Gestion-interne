<?php

namespace App\Imports;

use App\Models\Check;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ChecksImport implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Check([
            'check_number' => $row['numero_de_cheque'],
            'bank_name'    => $row['banque_emetrice'],
            'check_type'   => $row['type_de_cheque'],
            'user_id'      => Auth::id(),
        ]);
    }
}
