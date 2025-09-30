// database/migrations/..._create_avis_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('avis', function (Blueprint $table) {
            $table->id('id_avis');

            // Clés Étrangères
            $table->unsignedBigInteger('id_utilisateur_porteur'); // vers PORTEUR
            $table->unsignedBigInteger('id_evaluateur'); // vers UTILISATEUR
            $table->unsignedBigInteger('id_colis'); // vers COLIS (Un avis est lié à une transaction)

            $table->unsignedTinyInteger('note')->comment('Note de 1 à 5');
            $table->text('commentaire')->nullable();
            $table->timestamp('date_avis')->useCurrent();

            // Définition des contraintes
            $table->foreign('id_utilisateur_porteur')->references('id_utilisateur')->on('porteurs')->onDelete('cascade');
            $table->foreign('id_evaluateur')->references('id_utilisateur')->on('utilisateurs')->onDelete('restrict');
            $table->foreign('id_colis')->references('id_colis')->on('colis')->onDelete('cascade');

            // Empêcher un colis de recevoir plus d'un avis
            $table->unique('id_colis');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('avis');
    }
};
