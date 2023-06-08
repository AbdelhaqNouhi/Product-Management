<?php

namespace App\Http\Controllers\auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\loginResource;
use App\Http\Requests\LoginRequest;


class loginController extends Controller
{
    public function login(LoginRequest $request)
    {
        $validator = $request->all();

        if(!Auth::attempt($validator)){
            return response([
                'message' => ['These credentials fail to match our records !!']
            ], 404);
        }

        $user = Auth::user();
        return new loginResource($user);

        // $user = User::where('email', $request->email)->first();

        // if (!$user || !Hash::check($request->password, $user->password)) {

        //     return response([
        //         'message' => ['These credentials fail to match our records']
        //     ], 404);
        // }
        // return new loginResource($user);
    }
}
