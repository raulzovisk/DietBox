<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('food_alternatives', function (Blueprint $table) {
            $table->id();
            $table->foreignId('meal_food_id')->constrained('meal_foods')->onDelete('cascade');
            $table->foreignId('food_id')->constrained('foods')->onDelete('cascade');
            $table->decimal('quantity', 8, 2);
            $table->foreignId('measure_id')->constrained('measures')->onDelete('cascade');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('food_alternatives');
    }
};
