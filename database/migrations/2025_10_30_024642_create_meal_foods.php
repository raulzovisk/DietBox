<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('meal_foods', function (Blueprint $table) {
            $table->id();
            $table->foreignId('daily_meal_id')->constrained('daily_meals')->onDelete('cascade');
            $table->foreignId('food_id')->constrained('foods')->onDelete('cascade');
            $table->decimal('quantity', 8, 2);
            $table->foreignId('measure_id')->constrained('measures')->onDelete('cascade');
            $table->text('preparation_notes')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('meal_foods');
    }
};
