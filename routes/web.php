<?php

use App\Http\Controllers\Admin\SiteContentController;
use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\HeroSlideController;
use App\Http\Controllers\Admin\GalleryItemController;
use App\Http\Controllers\Admin\SiteServiceController;
use App\Http\Controllers\Admin\ContactRequestController;
use App\Http\Controllers\Admin\SiteConfigurationController;
use App\Http\Controllers\ContactSubmissionController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'home')->name('home');
Route::inertia('about', 'about')->name('about');
Route::inertia('services', 'services')->name('services');
Route::inertia('gallery', 'gallery')->name('gallery');
Route::inertia('process', 'process')->name('process');
Route::inertia('engineers', 'engineers')->name('engineers');
Route::inertia('contact', 'contact')->name('contact');
Route::post('contact-requests', [ContactSubmissionController::class, 'store'])->name('contact-requests.store');
Route::post('locale/{locale}', function (string $locale) {
    abort_unless(in_array($locale, ['ar', 'en'], true), 404);
    session(['locale' => $locale]);
    return back();
})->name('locale.switch');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('dashboard/site-content', [SiteContentController::class, 'index'])->name('dashboard.site-content.index');
    Route::post('dashboard/site-content/seed-defaults', [SiteContentController::class, 'seedDefaults'])->name('dashboard.site-content.seed-defaults');
    Route::post('dashboard/site-content', [SiteContentController::class, 'store'])->name('dashboard.site-content.store');
    Route::put('dashboard/site-content/{siteContent}', [SiteContentController::class, 'update'])->name('dashboard.site-content.update');
    Route::delete('dashboard/site-content/{siteContent}', [SiteContentController::class, 'destroy'])->name('dashboard.site-content.destroy');
    Route::get('dashboard/hero-slides', [HeroSlideController::class, 'index'])->name('dashboard.hero-slides.index');
    Route::post('dashboard/hero-slides', [HeroSlideController::class, 'store'])->name('dashboard.hero-slides.store');
    Route::post('dashboard/hero-slides/{heroSlide}', [HeroSlideController::class, 'update'])->name('dashboard.hero-slides.update');
    Route::delete('dashboard/hero-slides/{heroSlide}', [HeroSlideController::class, 'destroy'])->name('dashboard.hero-slides.destroy');
    Route::get('dashboard/brands', [BrandController::class, 'index'])->name('dashboard.brands.index');
    Route::post('dashboard/brands', [BrandController::class, 'store'])->name('dashboard.brands.store');
    Route::post('dashboard/brands/{brand}', [BrandController::class, 'update'])->name('dashboard.brands.update');
    Route::delete('dashboard/brands/{brand}', [BrandController::class, 'destroy'])->name('dashboard.brands.destroy');
    Route::get('dashboard/site-services', [SiteServiceController::class, 'index'])->name('dashboard.site-services.index');
    Route::post('dashboard/site-services', [SiteServiceController::class, 'store'])->name('dashboard.site-services.store');
    Route::post('dashboard/site-services/{siteService}', [SiteServiceController::class, 'update'])->name('dashboard.site-services.update');
    Route::delete('dashboard/site-services/{siteService}', [SiteServiceController::class, 'destroy'])->name('dashboard.site-services.destroy');
    Route::get('dashboard/gallery', [GalleryItemController::class, 'index'])->name('dashboard.gallery.index');
    Route::post('dashboard/gallery', [GalleryItemController::class, 'store'])->name('dashboard.gallery.store');
    Route::post('dashboard/gallery/{galleryItem}', [GalleryItemController::class, 'update'])->name('dashboard.gallery.update');
    Route::delete('dashboard/gallery/{galleryItem}', [GalleryItemController::class, 'destroy'])->name('dashboard.gallery.destroy');
    Route::get('dashboard/contact-requests', [ContactRequestController::class, 'index'])->name('dashboard.contact-requests.index');
    Route::get('dashboard/site-configuration', [SiteConfigurationController::class, 'edit'])->name('dashboard.site-configuration.edit');
    Route::post('dashboard/site-configuration', [SiteConfigurationController::class, 'update'])->name('dashboard.site-configuration.update');
});

require __DIR__.'/settings.php';

