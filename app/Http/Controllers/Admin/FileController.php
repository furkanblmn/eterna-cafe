<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Exception;

class FileController extends Controller
{
    public function store(Request $request)
    {
        $requestKeys = collect($request->all())->keys();

        try {
            $file = $this->getFileFromRequest($request, $requestKeys);
            $mimeType = $file->getMimeType();
            $fileExtension = Str::lower($file->getClientOriginalExtension());
            $uploadPath = $this->getUploadPath($mimeType);

            if (checkMimeType($fileExtension)) {
                $uploadedFile = $this->uploadFile($file, $uploadPath);

                try {
                    $storeFileData = $this->storeFileData($uploadedFile, $uploadPath);
                    return $storeFileData->id;
                } catch (Exception $e) {
                    $this->handleUploadError($uploadPath, $uploadedFile, $e);
                }
            } else {
                throw new Exception("{$fileExtension} dosya türü desteklenmiyor.", 1);
            }
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    private function handleUploadError($uploadPath, $uploadedFile, Exception $e)
    {
        $this->deleteUploadedFile($uploadPath, $uploadedFile);
        DB::rollBack();
        throw $e;
    }

    private function getFileFromRequest(Request $request, $requestKeys)
    {
        return is_array($request[$requestKeys[0]]) ? $this->checkArray($request[$requestKeys[0]]) : $request[$requestKeys[0]];
    }

    private function storeFileData($uploadedFile, $uploadPath)
    {
        DB::beginTransaction();
        $file = File::create([
            'path' => $uploadPath,
            'slug' => $uploadedFile
        ]);
        DB::commit();
        return $file;
    }

    private function deleteUploadedFile($uploadPath, $uploadedFile)
    {
        $filePath = storage_path("{$uploadPath}/{$uploadedFile}");
        if (file_exists($filePath)) {
            unlink($filePath);
        }
    }

    public static function checkArray($file)
    {
        $key = array_key_first($file);
        $file = $file[$key];
        return is_array($file) ? self::checkArray($file) : $file;
    }

    public function destroy(Request $request, File $file)
    {
        try {
            unlink(storage_path($file->orj_path));
            $file->delete();
            return 1;
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public static function uploadFile($file, $folder)
    {
        try {
            $fileName = Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME));
            $fileExtension = $file->getClientOriginalExtension();

            $uniqueFileName = self::generateUniqueFileName($folder, $fileName, $fileExtension);
            $file->move(storage_path($folder), $uniqueFileName);

            return $uniqueFileName;
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }

    public static function generateUniqueFileName($folder, $fileName, $fileExtension)
    {
        $uniqueNumber = 1;
        $fullFileName = "{$folder}/{$fileName}.{$fileExtension}";

        while (file_exists(storage_path($fullFileName))) {
            $fullFileName = "{$folder}/{$fileName}-{$uniqueNumber}.{$fileExtension}";
            $uniqueNumber++;
        }

        return pathinfo($fullFileName, PATHINFO_BASENAME);
    }

    public static function getUploadPath($mimeType)
    {
        $baseFolder = "uploads/";

        return match (true) {
            str_contains($mimeType, 'image') => "{$baseFolder}images",
            str_contains($mimeType, 'audio') => "{$baseFolder}sounds",
            default => $baseFolder,
        };
    }
}
