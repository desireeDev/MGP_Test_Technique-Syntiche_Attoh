// database/migrations/..._create_users_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// CHANGEZ ICI : Utilisez une classe nommée
class CreateUtilisateursTable extends Migration
{
    public function up(): void
    {
        Schema::create('utilisateurs', function (Blueprint $table) {
            $table->id('id_utilisateur'); // Clé Primaire : id_utilisateur
            $table->string('nom');
            $table->string('prenom');
            $table->string('email')->unique();
            $table->string('mot_de_passe');
            $table->string('telephone')->nullable();
            $table->string('photo_profil')->nullable();
            $table->timestamp('date_inscription')->useCurrent();
            $table->enum('statut_compte', ['Actif', 'Inactif', 'Bloqué'])->default('Actif');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('utilisateurs');
    }
}
