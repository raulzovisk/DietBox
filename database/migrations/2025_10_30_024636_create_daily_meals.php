<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('daily_meals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('diet_id')->constrained('diets')->onDelete('cascade');
            $table->integer('day_of_week');
            $table->string('meal_type');
            $table->time('suggested_time')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('daily_meals');
    }
};
