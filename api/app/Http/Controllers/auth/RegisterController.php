<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\RegisterResource;
use App\Http\Requests\RegisterRequest;
use Illuminate\Support\Facades\Auth;

class RegisterController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $validator = $request->all();

        if(User::where('email', $request->email)->first()) {
            return response([
                'message' => ['This email is already exist']
            ], 404);
        }

        $data['password'] = bcrypt($request->password);

        $user = User::create($validator);

        $token = $user->createToken('token')->plainTextToken;

        $user->remember_token = $token;
        $user->save();

        return new RegisterResource($user);
    }
}
