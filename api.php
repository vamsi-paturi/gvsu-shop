<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

include_once $_SERVER['DOCUMENT_ROOT']."/gvsu-shop/db/conn.php";
include_once $_SERVER['DOCUMENT_ROOT']."/gvsu-shop/db/index.php";

// $pdo = new PDO('sqlite:cartshop.db');
$db = new DB();
$conn = $db->connect();

if($_SERVER['REQUEST_METHOD'] == 'GET'){
    $getId = isset($_GET['id']) && !empty($_GET['id']) ? $_GET['id'] : null;

    $array = [];
    $STH = $conn->prepare('SELECT * FROM gvsucart');
    $STH->execute();
    $data = $STH->fetchAll(PDO::FETCH_OBJ);

    if(count($data) > 0){
        foreach ($data as $key => $value) {
            $cartArr = [];
            $id = $value->id;
            $fullname = $value->fullname;
            $cart = json_decode($value->cart);
            foreach ($cart as $key => $cartItem) {
                $img = explode('/', $cartItem->img);
                $img = end($img);
                $img = url.'images/'.$img;
                $c_item = [
                    'id'=>(int)$cartItem->id,
                    'price'=>(double)$cartItem->price,
                    'name'=>$cartItem->name,
                    'img'=>$img
                ];
                array_push($cartArr, $c_item);
            }

            $item = ['id'=>$id, 'fullname'=>$fullname, 'cart'=>$cartArr];
            array_push($array, $item);
        }
    }

    if(is_null($getId)){
        echo json_encode($array);
    }else{
        $item = null;
        foreach ($array as $key => $value) {
            if($value['id'] == $getId) {
                $item = $value;
            }
        }
        echo json_encode($item);
    }

}