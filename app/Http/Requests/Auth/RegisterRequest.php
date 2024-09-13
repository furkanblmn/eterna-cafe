<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users', 
            'email' => 'required|string|email|max:255|unique:users', 
            'password' => 'required|string',
        ];
    }

    /**
     * Custom error messages for validation rules
     * (Opsiyonel: Hata mesajlarını özelleştirebilirsiniz)
     */
    public function messages()
    {
        return [
            'first_name.required' => 'İsim alanı gereklidir.',
            'last_name.required' => 'Soyisim alanı gereklidir.',
            'username.required' => 'Kullanıcı adı gereklidir.',
            'username.unique' => 'Bu kullanıcı adı zaten kullanılıyor.',
            'email.required' => 'Email adresi gereklidir.',
            'email.email' => 'Geçerli bir email adresi girin.',
            'email.unique' => 'Bu email adresi zaten kayıtlı.',
            'password.required' => 'Şifre gereklidir.',
        ];
    }
}
