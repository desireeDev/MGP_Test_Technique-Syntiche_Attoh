// database/migrations/..._create_colis_table.php
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('colis', function (Blueprint $table) {
            $table->id('id_colis');

            // Clés Étrangères
            $table->unsignedBigInteger('id_expediteur'); // vers UTILISATEUR
            $table->unsignedBigInteger('id_trajet')->nullable(); // vers TRAJET_PORTEUR (NULL si non encore réservé)
            $table->unsignedBigInteger('id_type_colis'); // vers TYPE_COLIS

            // Détails du Colis
            $table->string('ville_depart');
            $table->string('pays_depart');
            $table->string('ville_destination');
            $table->string('pays_destination');
            $table->string('adresse_livraison');
            $table->string('nom_destinataire');
            $table->string('telephone_destinataire');
            $table->float('poids', 8, 2);
            $table->text('description')->nullable();
            $table->float('montant_total', 8, 2)->nullable();
            $table->enum('statut_colis', ['En attente', 'Réservé', 'En transit', 'Livré', 'Annulé'])->default('En attente');

            $table->timestamp('date_creation')->useCurrent();
            $table->timestamp('date_reservation')->nullable();
            $table->date('date_livraison_prevue')->nullable();
            $table->date('date_livraison_reelle')->nullable();
            $table->string('code_suivi', 15)->unique()->nullable();
            $table->text('instructions_livraison')->nullable();
            $table->timestamps();

            // Définition des contraintes
            $table->foreign('id_expediteur')->references('id_utilisateur')->on('utilisateurs')->onDelete('restrict');
            $table->foreign('id_trajet')->references('id_trajet')->on('trajet_porteurs')->onDelete('set null');
            $table->foreign('id_type_colis')->references('id_type_colis')->on('type_colis')->onDelete('restrict');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('colis');
    }
};
