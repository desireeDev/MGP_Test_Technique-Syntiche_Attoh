// database/migrations/..._create_porteurs_table.php



<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// C'est le nom que Laravel cherche dans le fichier !
class CreatePorteursTable extends Migration
{
    public function up(): void
    {
        Schema::create('porteurs', function (Blueprint $table) {
            // Clé Primaire ET Étrangère : id_utilisateur
            $table->unsignedBigInteger('id_utilisateur')->primary();

            $table->float('note_moyenne', 2, 1)->default(0.0);
            $table->unsignedInteger('nombre_avis')->default(0);
            $table->boolean('certifie')->default(false);
            $table->date('mois_certification')->nullable();
            $table->enum('statut_porteur', ['Actif', 'En attente', 'Suspendu'])->default('En attente');

            // Attributs d'habitude
            $table->string('ville_depart_habituelle')->nullable();
            $table->string('pays_depart_habituel')->nullable();
            $table->string('ville_destination_habituelle')->nullable();
            $table->string('pays_destination_habituel')->nullable();

            // Définition de la Clé Étrangère vers la table 'utilisateurs'
            $table->foreign('id_utilisateur')
                  ->references('id_utilisateur')
                  ->on('utilisateurs')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('porteurs');
    }
};
