<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactRequest;
use Inertia\Inertia;
use Inertia\Response;

class ContactRequestController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('dashboard/contact-requests-index', [
            'requests' => ContactRequest::query()->latest()->limit(200)->get(),
        ]);
    }
}
