<?php
return [

    'paths' => ['api/*', 'sanctum/csrf-cookie', '/images/*', '/models/*'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['*'],

    'allowed_origins_patterns' => ['*'],

    'allowed_headers' => ['*'],

    'exposed_headers' => ['*'],

    'supportedContentTypes' => [
        'model/gltf-binary',
        'application/json',
        'text/html',
    ],

    'max_age' => 0,

    'supports_credentials' => true
];
