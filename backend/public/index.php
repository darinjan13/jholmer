<?php
require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../BookController.php';
require __DIR__ . '/../BookModel.php';

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// API Routes
Flight::route('GET /books', ['BookController', 'index']);
Flight::route('POST /books', ['BookController', 'store']);
Flight::route('PUT /books/@id', ['BookController', 'update']);
Flight::route('DELETE /books/@id', ['BookController', 'destroy']);

Flight::start();
