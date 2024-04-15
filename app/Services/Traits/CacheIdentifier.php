<?php

namespace App\Services\Traits;

trait CacheIdentifier
{
    protected int|string|null $identifier = null;

    public function setIdentifier(string $identifier): self
    {
        $this->identifier = $identifier;

        return $this;
    }

    public function getKey(): string
    {
        return sprintf($this->key, $this->identifier);
    }
}
