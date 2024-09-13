<?php

namespace App\Http\Requests\Category;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Category;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // CategoryPolicy'deki create yetkisini kontrol ediyoruz
        return $this->user()->can('create', Category::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'file_id' => ['required', 'exists:files,id'],
        ];
    }

    /**
     * Get custom messages for validation errors.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Başlık alanı zorunludur.',
            'title.string' => 'Başlık metin türünde olmalıdır.',
            'title.max' => 'Başlık en fazla 255 karakter uzunluğunda olabilir.',

            'file_id.required' => 'Dosya seçmek zorunludur.',
            'file_id.exists' => 'Seçilen dosya mevcut değil.',
        ];
    }
}
