// database/migrations/..._create_notifications_table.php
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id('id_notification');

            // Clé Étrangère
            $table->unsignedBigInteger('id_utilisateur'); // vers UTILISATEUR
            $table->foreign('id_utilisateur')->references('id_utilisateur')->on('utilisateurs')->onDelete('cascade');

            $table->string('type_notification'); // Ex: 'Nouvelle Réservation', 'Avis Reçu'
            $table->string('message');
            $table->boolean('lue')->default(false);
            $table->timestamp('date_notification')->useCurrent();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
