// database/migrations/..._create_trajet_porteurs_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTrajetPorteursTable extends Migration
{
    public function up(): void
    {
        Schema::create('trajet_porteurs', function (Blueprint $table) {
            $table->id('id_trajet');

            // Clé Étrangère vers PORTEUR
            $table->unsignedBigInteger('id_utilisateur');
            $table->foreign('id_utilisateur')->references('id_utilisateur')->on('porteurs')->onDelete('cascade');

            $table->string('ville_depart');
            $table->string('code_pays_depart', 2);
            $table->string('ville_destination');
            $table->string('code_pays_destination', 2);
            $table->date('date_depart');
            $table->date('date_arrivee');

            $table->float('poids_disponible', 8, 2);
            $table->float('poids_total_capacite', 8, 2);
            $table->float('tarif_par_kg', 8, 2);

            $table->enum('statut_trajet', ['Ouvert', 'Complet', 'Annulé'])->default('Ouvert');
            $table->timestamp('date_expiration_offre');
            $table->timestamp('date_creation')->useCurrent();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('trajet_porteurs');
    }
}
