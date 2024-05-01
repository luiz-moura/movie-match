<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('swipe.{roomKey}', fn () => true);
