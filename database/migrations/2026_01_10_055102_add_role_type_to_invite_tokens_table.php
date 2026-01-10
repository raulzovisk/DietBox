<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('invite_tokens', function (Blueprint $table) {
            $table->unsignedBigInteger('role_type')->default(1)->after('token'); // 1 = user, 2 = nutritionist
        });
    }

    public function down(): void
    {
        Schema::table('invite_tokens', function (Blueprint $table) {
            $table->dropColumn('role_type');
        });
    }
};
