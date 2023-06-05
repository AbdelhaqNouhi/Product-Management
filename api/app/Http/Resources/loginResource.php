<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class loginResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'token' => $this->createToken('auth_token')->plainTextToken,
            'user' => [
                'id' => $this->id,
                'name' => $this->name,
                'email' => $this->email
            ]
        ];
    }
}
