<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CreateUploadsSymlink extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'storage:uploads-link';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a symbolic link from "storage/uploads" to "public/uploads"';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $storagePath = storage_path('uploads');
        $publicPath = public_path('uploads');

        if (file_exists($publicPath)) {
            $this->error('The "public/uploads" directory already exists.');
            return Command::FAILURE;
        }

        // Symlink oluşturma
        symlink($storagePath, $publicPath);

        if (file_exists($publicPath)) {
            $this->info('The "storage/uploads" directory has been linked to "public/uploads".');
            return Command::SUCCESS;
        } else {
            $this->error('Failed to create the symlink.');
            return Command::FAILURE;
        }
    }
}
