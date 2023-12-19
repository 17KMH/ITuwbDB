<?php

# error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
error_reporting(E_WARNING);
// ini_set('display_startup_errors',TRUE);
// ini_set('display_errors', TRUE);
// ini_set('log_errors',TRUE);
// ini_set('error_log','./errorlog/err.log');

require '../vendor/autoload.php';


$config = ['settings' => [
    'displayErrorDetails' => true,
]];

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


// Database configuration
$dbConfig = [
    'host' => 'dev.wappprojects.de',
    'dbname' => 'd03e6397',
    'user' => 'd03e6397',
    'password' => '21ii-dev_mydb'
];

// Create Slim app
$c = new \Slim\Container($config);

$c['notFoundHandler'] = function ($c) {
    return function ($request, $response) use ($c) {
        return $response->withStatus(404)
            // ->withHeader('Content-Type', 'application/json')
            ->withJson(['error' => 'Route not supported.']);
    };
};

$app = new Slim\App($c);

// Dependency injection for PDO
$container = $app->getContainer();
$container['db'] = function ($c) use ($dbConfig) {
    $pdo = new PDO(
        "mysql:host={$dbConfig['host']};dbname={$dbConfig['dbname']}",
        $dbConfig['user'],
        $dbConfig['password']
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    return $pdo;
};

$app->get('/hello', function (Request $request, Response $response) {
    // return $response->withJson(['message' => 'Hello from the WiWs21ii Dev-Group!']);
    return $response->withStatus(200)
                    ->withHeader('Content-Type', 'application/json')
                    ->write("Hello from the WiWs21ii Dev-Group!");
});

// Define routes
$app->get('/customers', function (Request $request, Response $response) {
    $db = $this->get('db');
    $stmt = $db->query('SELECT * FROM Customers');
    $customers = $stmt->fetchAll();

    foreach ($customers as &$cust) {
        $id = $cust['ID_Add'];
        $stmt = $db->prepare('SELECT * FROM Addresses WHERE Addresses.ID_Add = :id');
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $address = $stmt->fetch(PDO::FETCH_ASSOC);
        $cust['address'] = $address; 
    } 

    return $response->withJson($customers);
});

$app->get('/customers/{id}', function (Request $request, Response $response, array $args) {
    $db = $this->get('db');
    $stmt = $db->prepare('SELECT * FROM Customers WHERE ID_Cust = :id');
    $stmt->bindParam(':id', $args['id']);
    $stmt->execute();
    $customer = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$customer) {
        return $response->withStatus(404)->withJson(['error' => 'Customer not found']);
    }

    $stmt = $db->prepare('SELECT * FROM Addresses WHERE ID_Add = :id');
    $stmt->bindParam(':id', $customer['ID_Add']);
    $stmt->execute();
    $customer["address"] = $stmt->fetch(PDO::FETCH_ASSOC);

    return $response->withJson($customer);
});

$app->post('/customers', function (Request $request, Response $response) {
    $data = $request->getParsedBody();

    $db = $this->get('db');
    
    // Assuming $data is in the format: ['name' => 'John Doe', 'address' => ['city' => 'City', 'zip' => '12345', 'street' => 'Street 1']]
    $name = $data['Name'];
    $address = $data['Address']; //json_decode() entfernt

    // Insert address first
    $stmt = $db->prepare('INSERT INTO Addresses (City, Zipcode, Street) VALUES (:city, :zipcode, :street)');
    $stmt->bindParam(':city', $address['City']);
    $stmt->bindParam(':zipcode', $address['Zipcode']);
    $stmt->bindParam(':street', $address['Street']);
    $stmt->execute();
    $addressId = $db->lastInsertId();

    // Then insert customer with the address id
    $stmt = $db->prepare('INSERT INTO Customers (name, id_add) VALUES (:name, :addressId)');
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':addressId', $addressId);
    $stmt->execute();

    return $response->withJson(['message' => 'Customer added successfully']);
});

$app->put('/customers/{id}', function (Request $request, Response $response, array $args) {
    $id = $args['id'];
    $data = $request->getParsedBody();
    //var_dump($data); debugging
    $address = $data['Address'];
    $id_address = $address['ID_Add'];
    $db = $this->get('db');
 
    // Update customer
    $stmt = $db->prepare('UPDATE Customers SET name = :name, id_add = :id_add  WHERE id_cust = :id');
    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':name', $data['Name']);
    $stmt->bindParam(':id_add', $id_address);
    $stmt->execute();

    // Update address
    $stmt = $db->prepare('UPDATE Addresses SET City = :city, Zipcode = :zip, Street = :street WHERE id_add = :id_add');
    $stmt->bindParam(':city', $address['City']);
    $stmt->bindParam(':zip', $address['Zipcode']);
    $stmt->bindParam(':street', $address['Street']);
    $stmt->bindParam(':id_add', $id_address);
    $stmt->execute();

    return $response->withJson(['message' => 'Customer with Address updated successfully']);
});

$app->delete('/customers/{id}', function (Request $request, Response $response, array $args) {
    $id = $args['id'];
    $db = $this->get('db');

    // Delete customer
    $stmt = $db->prepare('DELETE FROM Customers WHERE id_cust = :id_cust');
    $stmt->bindParam(':id_cust', $id);
    $stmt->execute();

    return $response->withJson(['message' => 'Customer deleted successfully']);
});

// Get all products
$app->get('/products', function (Request $request, Response $response) {
    $db = $this->get('db');
    $stmt = $db->query('SELECT * FROM Products');
    $products = $stmt->fetchAll();

    return $response->withJson($products);
});

// Get a specific product by ID
$app->get('/products/{id}', function (Request $request, Response $response, array $args) {
    $db = $this->get('db');
    $stmt = $db->prepare('SELECT * FROM Products WHERE ID_Prod = :id');
    $stmt->bindParam(':id', $args['id']);
    $stmt->execute();
    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$product) {
        return $response->withStatus(404)->withJson(['error' => 'Product not found']);
    }

    return $response->withJson($product);
});

// Add a new product
$app->post('/products', function (Request $request, Response $response) {
    $data = $request->getParsedBody();
    $db = $this->get('db');

    $stmt = $db->prepare('INSERT INTO Products (Name, Type) VALUES (:name, :type)');
    $stmt->bindParam(':name', $data['Name']);
    $stmt->bindParam(':type', $data['Type']);
    $stmt->execute();

    return $response->withJson(['message' => 'Product added successfully']);
});
// Update a product
$app->put('/products/{id}', function (Request $request, Response $response, array $args) {
    $id = $args['id'];
    $data = $request->getParsedBody();
    $db = $this->get('db');

    $stmt = $db->prepare('UPDATE Products SET Name = :name, Type = :type WHERE ID_Prod = :id');
    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':name', $data['Name']);
    $stmt->bindParam(':type', $data['Type']);
    $stmt->execute();

    return $response->withJson(['message' => 'Product updated successfully']);
});

// Delete a product
$app->delete('/products/{id}', function (Request $request, Response $response, array $args) {
    $id = $args['id'];
    $db = $this->get('db');

    $stmt = $db->prepare('DELETE FROM Products WHERE ID_Prod = :id');
    $stmt->bindParam(':id', $id);
    $stmt->execute();

    return $response->withJson(['message' => 'Product deleted successfully']);
});

// Run Slim app
$app->run();

