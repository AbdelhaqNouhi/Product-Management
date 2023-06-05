<?php

namespace App\Http\Controllers\auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\loginResource;


class loginController extends Controller
{
    public function login(LoginRequest $request)
    {
        $validator = $request->all();

        if (Auth::attempt($validator)) {
            $user = User::where('email', $request->email)->first();

            return new loginResource($user);
        } else {
            return response()->json(['message' => 'Invalid login credentials'], 401);
        }
    }
}
