<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('checks', function (Blueprint $table) {
            $table->foreignId('replaced_by_check_id')->nullable()->constrained('checks')->onDelete('set null');
            $table->foreignId('replaced_check_id')->nullable()->constrained('checks')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('checks', function (Blueprint $table) {
            $table->dropForeign(['replaced_by_check_id']);
            $table->dropForeign(['replaced_check_id']);
            $table->dropColumn(['replaced_by_check_id', 'replaced_check_id']);
        });
    }
};
