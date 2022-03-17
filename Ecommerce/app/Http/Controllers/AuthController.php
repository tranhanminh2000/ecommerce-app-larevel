<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'email|required',
                'password' => 'required'
            ]);

            // $credentials = request(['email', 'password']);

            // if (!Auth::attempt($credentials)) {
            //     return response()->json([
            //         'status_code' => 500,
            //         'message' => 'Unauthorized'
            //     ], 500);
            // }

            $user = User::where('email', $request->email)->first();
            if (!$user) {
                return response()->json([
                    'status_code' => 500,
                    'message' => 'Email doest not exist'
                ], 500);
            }

            if (!Hash::check($request->password, $user->password, [])) {
                return response()->json([
                    'status_code' => 500,
                    'message' => 'Wrong password'
                ], 500);
            }

            $tokenResult = $user->createToken('authToken')->plainTextToken;

            return response()->json([
                'status_code' => 200,
                'access_token' => $tokenResult,
                'token_type' => 'Bearer',
            ]);
        } catch (\Exception $error) {
            return response()->json([
                'status_code' => 500,
                'message' => 'Error in Login',
                'error' => $error,
            ]);
        }
    }

    public function register(Request $request)
    {
        $request->validate([
            'firstName' => 'required',
            'lastName' => 'required',
            'email' => 'email|required',
            'password' => 'required'
        ]);

        try {
            $newUser = new User();
            $newUser->first_name = $request->firstName;
            $newUser->last_name = $request->lastName;
            $newUser->email = $request->email;
            $newUser->password = Hash::make($request->password);

            $newUser->save();
            return response()->json([
                "success" => true,
                "message" => "Register successfully!"
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "success" => false,
                "message" => "Register failed!"
            ]);
        }
    }

    public function logout(Request $request)
    {
        $result = $request->user()->currentAccessToken()->delete();
        if ($result) {
            return response()->json([
                "success" => true,
                "message" => "logout successfully"
            ], 200);
        }
    }
}
