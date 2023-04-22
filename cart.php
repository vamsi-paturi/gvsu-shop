<?php
include_once $_SERVER['DOCUMENT_ROOT']."/gvsu-shop/db/conn.php";

$db = new DB();
$conn = $db->connect();

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $body = file_get_contents('php://input');
    $body = json_decode($body);
    $fullname = $body->fullname;
    $email = $body->email;
    $cart = json_encode($body->cart);

    // $pdo = new PDO('sqlite:cartshop.db');

    $STH = $conn->prepare("INSERT INTO gvsucart (fullname, email, cart) VALUES (:fullname, :email, :cart)");
    $STH->bindParam(':fullname', $fullname);
    $STH->bindParam(':email', $email);
    $STH->bindParam(':cart', $cart);
    $STH->execute();

    if($STH->rowCount()){
        echo json_encode(['status'=>true]);
    }else{
        echo json_encode(['status'=>false]);
    }
}