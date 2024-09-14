<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CreateUploadsSymlink extends Command
{
    /**
     * Konsol komutunun adı ve imzası.
     *
     * @var string
     */
    protected $signature = 'storage:uploads-link';

    /**
     * Konsol komutunun açıklaması.
     *
     * @var string
     */
    protected $description = '"storage/uploads" ile "public/uploads" arasında sembolik bağlantı oluştur';

    /**
     * Konsol komutunu çalıştır.
     *
     * @return int
     */
    public function handle()
    {
        $storagePath = storage_path('uploads');
        $publicPath = public_path('uploads');

        if (file_exists($publicPath)) {
            $this->error('"public/uploads" dizini zaten mevcut.');
            return Command::FAILURE;
        }

        // Symlink oluşturma
        symlink($storagePath, $publicPath);

        if (file_exists($publicPath)) {
            $this->info('"storage/uploads" dizini, "public/uploads" dizinine başarıyla bağlandı.');
            return Command::SUCCESS;
        } else {
            $this->error('Sembolik bağlantı oluşturulamadı.');
            return Command::FAILURE;
        }
    }
}
