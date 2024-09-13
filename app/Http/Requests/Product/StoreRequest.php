<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Product;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('create', Product::class);
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
            'content' => ['required', 'string'],
            'file_id' => ['required', 'exists:files,id'],
            'price' => ['required', 'numeric', 'min:0'],
            'categories' => ['required', 'array'],
            'categories.*' => ['exists:categories,id'],
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

            'content.required' => 'İçerik alanı zorunludur.',
            'content.string' => 'İçerik metin türünde olmalıdır.',

            'file_id.required' => 'Dosya seçmek zorunludur.',
            'file_id.exists' => 'Seçilen dosya mevcut değil.',

            'price.required' => 'Fiyat alanı zorunludur.',
            'price.numeric' => 'Fiyat sayısal olmalıdır.',
            'price.min' => 'Fiyat sıfırdan küçük olamaz.',

            'categories.required' => 'En az bir kategori seçilmelidir.',
            'categories.array' => 'Kategoriler geçerli bir dizi olmalıdır.',
            'categories.*.exists' => 'Seçilen kategori mevcut değil.',
        ];
    }
}
