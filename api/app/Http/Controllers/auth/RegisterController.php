<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\RegisterResource;
use App\Http\Requests\RegisterRequest;

class RegisterController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $validator = $request->all();

        $validator['password'] = bcrypt($request->password);

        $user = User::create($validator);

        return new RegisterResource($user);
    }
}
