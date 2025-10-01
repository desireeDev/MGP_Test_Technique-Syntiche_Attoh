<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Définit la longueur par défaut des colonnes "string" à 191 caractères.
    // Cela évite l'erreur 1071 ("Specified key was too long") sur MySQL 5.6/utf8mb4
    // lorsque l'on crée des index uniques sur des colonnes VARCHAR.
    Schema::defaultStringLength(191);
    }
}
