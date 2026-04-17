<?php

namespace App\Http\Controllers;

use App\Models\ContactRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

class ContactSubmissionController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $key = 'contact-submission:'.$request->ip();
        if (RateLimiter::tooManyAttempts($key, 10)) {
            abort(429, 'Too many attempts.');
        }
        RateLimiter::hit($key, 120);

        $validated = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:40'],
            'email' => ['nullable', 'email', 'max:255'],
            'property_kind' => ['required', 'in:apt,villa,any'],
            'area' => ['nullable', 'string', 'max:500'],
            'message' => ['nullable', 'string', 'max:5000'],
            'source' => ['required', 'in:home,contact'],
        ]);

        ContactRequest::query()->create($validated);

        $msg = app()->getLocale() === 'en'
            ? 'Your request was received.'
            : 'تم استلام طلبك.';

        return back()->with('success', $msg);
    }
}
