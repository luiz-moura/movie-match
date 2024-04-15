<?php

namespace App\Services;

use App\Services\Exceptions\HttpException;
use GuzzleHttp\Client;
use Psr\Http\Client\ClientExceptionInterface;
use Psr\Http\Client\NetworkExceptionInterface;
use Psr\Http\Client\RequestExceptionInterface;

class HttpClientService
{
    private Client $client;
    private string $baseUri;
    private ?string $secret = null;
    private int $timeout = 10;

    private function getClient(): Client
    {
        if (!isset($this->baseUri)) {
            throw new HttpException('The uri base was not defined.');
        }

        $this->client ??= new Client([
            'base_uri' => $this->baseUri,
            'timeout' => $this->timeout,
            'headers' => [
                'Accept' => 'application/json',
                'Authorization' => "Bearer {$this->secret}"
            ],
            'http_errors' => true,
        ]);

        return $this->client;
    }

    public function setBaseUri(string $baseUri)
    {
        $this->baseUri = $baseUri;

        return $this;
    }

    public function setSecret(string $secret)
    {
        $this->secret = $secret;

        return $this;
    }

    public function setTimeout(int $timeout)
    {
        $this->timeout = $timeout;

        return $this;
    }

    public function get(string $uri): array
    {
        try {
            $response = $this->getClient()->request('GET', $uri);
        } catch (NetworkExceptionInterface|ClientExceptionInterface|RequestExceptionInterface $e) {
            throw new HttpException(message: 'Failure to integrate with third parties.', previous: $e);
        }

        return json_decode($response->getBody()->getContents(), true);
    }
}
