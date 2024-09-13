<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;

class UpdatePasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'token' => [
                'required',
                'string',
                function ($attribute, $value, $fail) {
                    $exists = DB::table('password_resets')
                        ->where('token', $value)
                        ->where('email', $this->email)
                        ->exists();

                    if (!$exists) {
                        $fail('Geçersiz veya süresi dolmuş bir token girdiniz.');
                    }
                }
            ],
            'email' => [
                'required',
                'email',
            ],
            'password' => [
                'required',
                'string',
                'confirmed'
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'token.required' => 'Token alanı zorunludur.',
            'token.string' => 'Token geçerli bir metin olmalıdır.',
            'email.required' => 'Email alanı zorunludur.',
            'email.email' => 'Geçerli bir email adresi giriniz.',
            'password.required' => 'Parola alanı zorunludur.',
            'password.min' => 'Parola en az 8 karakter uzunluğunda olmalıdır.',
            'password.confirmed' => 'Parola onayı eşleşmiyor.',
        ];
    }
}
