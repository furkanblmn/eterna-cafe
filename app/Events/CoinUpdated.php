<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class CoinUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $user;
    public $coin;

    public function __construct($user)
    {
        $this->user = $user;
        $this->coin = $user->coin;
    }

    public function broadcastOn()
    {
        return new Channel('user.' . $this->user->id);
    }
}
