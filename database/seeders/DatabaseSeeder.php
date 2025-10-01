<?php

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Porteur;
use App\Models\TrajetPorteur;
use App\Models\Colis;
use App\Models\Avis;
use App\Models\TypeColis;
//Classe permettant de peupler la base de données avec des données initiales pour les tests
class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // ===============================================================
        // 0. Création des TYPES DE COLIS
        // ===============================================================
        $types = [
            ['nom_type' => 'Électronique', 'restrictions' => 'Batteries limitées.'],
            ['nom_type' => 'Vêtements', 'restrictions' => 'Aucune.'],
            ['nom_type' => 'Bijoux', 'restrictions' => 'Doit être déclaré.'],
            ['nom_type' => 'Documents', 'restrictions' => 'Aucune.'],
            ['nom_type' => 'Nourriture', 'restrictions' => 'Non périssable uniquement.'],
            ['nom_type' => 'Liquides', 'restrictions' => 'Contenants scellés < 1L.'],
            ['nom_type' => 'Cosmétiques', 'restrictions' => 'Aucune.'],
        ];

        $typeObjects = [];
        foreach ($types as $data) {
            $typeObjects[] = TypeColis::create([
                'nom_type' => $data['nom_type'],
                'restrictions' => $data['restrictions'],
                'description' => $data['nom_type'] . ' standard',
                'fragile' => false
            ]);
        }

        // On utilisera le type "Vêtements" pour les colis
        $typeVetements = $typeObjects[1];

        // ===============================================================
        // 1. Fonction pour créer un PORTEUR + TRAJET
        // ===============================================================
        function creerPorteurSimple($nom, $prenom, $email, $photo, $note, $avis, $certifie, $userExpediteurId, $typeColisId) {
            // Création de l'utilisateur porteur
            $user = User::create([
                'nom' => $nom,
                'prenom' => $prenom,
                'email' => $email,
                'mot_de_passe' => bcrypt('password123'),
                'photo_profil' => "profils/$photo",
                'statut_compte' => 'Actif'
            ]);

            // Création du porteur
            $porteur = Porteur::create([
                'id_utilisateur' => $user->id_utilisateur,
                'note_moyenne' => $note,
                'nombre_avis' => $avis,
                'certifie' => $certifie,
                'statut_porteur' => 'Actif'
            ]);

            // Création d'un trajet simple (le même pour tous)
            $trajet = TrajetPorteur::create([
                'id_utilisateur' => $user->id_utilisateur,
                'ville_depart' => 'Dakar',
                'code_pays_depart' => 'SN',
                'ville_destination' => 'Paris-Orly',
                'code_pays_destination' => 'FR',
                'date_depart' => '2024-11-15',
                'date_arrivee' => '2024-11-17',
                'poids_disponible' => 10,
                'poids_total_capacite' => 20,
                'tarif_par_kg' => 6.50,
                'statut_trajet' => 'Ouvert',
                'date_expiration_offre' => now()->addDays(10)
            ]);

            // Création d'un colis pour ce trajet
            $colis = Colis::create([
                'id_expediteur' => $userExpediteurId,
                'id_trajet' => $trajet->id_trajet,
                'id_type_colis' => $typeColisId,
                'ville_depart' => 'Dakar',
                'pays_depart' => 'SN',
                'ville_destination' => 'Paris-Orly',
                'pays_destination' => 'FR',
                'adresse_livraison' => '45 Avenue Foch, 75016 Paris',
                'nom_destinataire' => 'Jean Dupont',
                'telephone_destinataire' => '+33123456789',
                'poids' => 2.0,
                'description' => 'Petits vêtements',
                'montant_total' => 10.46,
                'statut_colis' => 'Livré',
                'date_creation' => now()->subWeeks(2),
                'date_livraison_reelle' => now()->subDays(5),
                'code_suivi' => 'TEST' . strtoupper(uniqid()), // <-- unique
                //Chaque code de suivi doit être unique en fonction du porteur
            ]);

            // Création d'un avis pour ce porteur (même avis pour tous)
            Avis::create([
                'id_utilisateur_porteur' => $porteur->id_utilisateur,
                'id_evaluateur' => $userExpediteurId,
                'id_colis' => $colis->id_colis,
                'note' => 5,
                'commentaire' => 'Porteur fiable, colis reçu à temps !',
                'date_avis' => now()->subDays(4),
            ]);

            return [$user, $porteur, $trajet, $colis];
        }

        // ===============================================================
        // 2. Création de l'utilisateur EXPÉDITEUR (client connecté)
        // ===============================================================
        $userExpediteur = User::create([
            'nom' => 'Expediteur',
            'prenom' => 'Test',
            'email' => 'expediteur.test@example.com',
            'mot_de_passe' => bcrypt('password123'),
            'photo_profil' => 'profils/Logo.png',
            'statut_compte' => 'Actif',
        ]);

        // ===============================================================
        // 3. Création des 5 PORTEURS avec le même trajet et avis
        // ===============================================================
        creerPorteurSimple('Dubois','Mathieu','mathieu.dubois@example.com','M_Dubois.png',4.5,104,true,$userExpediteur->id_utilisateur, $typeVetements->id_type_colis);
        creerPorteurSimple('Dubois','Camille','camille.dubois@example.com','C_Dubois.png',5.0,12,false,$userExpediteur->id_utilisateur, $typeVetements->id_type_colis);
        creerPorteurSimple('Rousseau','Théo','theo.rousseau@example.com','Theo_R.png',4.8,8,false,$userExpediteur->id_utilisateur, $typeVetements->id_type_colis);
        creerPorteurSimple('Bernard','Chloé','chloe.bernard@example.com','Chloe_B.png',4.9,15,false,$userExpediteur->id_utilisateur, $typeVetements->id_type_colis);
        creerPorteurSimple('Garnier','Marie','marie.garnier@example.com','Marie_G.png',4.7,20,false,$userExpediteur->id_utilisateur, $typeVetements->id_type_colis);
    }
}
