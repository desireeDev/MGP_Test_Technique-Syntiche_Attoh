// database/migrations/..._create_type_colis_table.php



<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// CHANGE THIS LINE: Use the named class 'CreateTypeColisTable'
class CreateTypeColisTable extends Migration
{
    public function up(): void
    {
        Schema::create('type_colis', function (Blueprint $table) {
            $table->id('id_type_colis');
            $table->string('nom_type')->unique();
            $table->text('description')->nullable();
            $table->text('restrictions')->nullable();
            $table->boolean('fragile')->default(false);
            // Pas de timestamps
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('type_colis');
    }
}
