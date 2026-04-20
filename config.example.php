<?php

declare(strict_types=1);

return [
    'db' => [
        // Prefer environment variables in production.
        'host' => getenv('DB_HOST') ?: 'your-db-host',
        'port' => (int) (getenv('DB_PORT') ?: 3306),
        'name' => getenv('DB_NAME') ?: 'sharpedge_segolfcounter',
        'user' => getenv('DB_USER') ?: 'your_db_user',
        'pass' => getenv('DB_PASS') ?: 'your_db_password',
        'charset' => 'utf8mb4',
    ],
];
