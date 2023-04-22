<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

include_once $_SERVER['DOCUMENT_ROOT']."/gvsu-shop/db/conn.php";

// $pdo = new PDO('sqlite:cartshop.db');
$db = new DB();
$conn = $db->connect();

if($_SERVER['REQUEST_METHOD'] == 'GET'){
    $array = [];
    $STH = $conn->prepare("SELECT * FROM `products`");
    $STH->execute();
    $data = $STH->fetchAll(PDO::FETCH_OBJ);

    if(count($data) > 0){
        foreach($data as $key => $value){
            $item = array(
                'id'=>(int)$value->id,
                'name'=>$value->prodname,
                'price'=>(double)$value->price,
                'img'=>$value->img
            );
            array_push($array, $item);
        }
    }

    echo json_encode(array(
        'status'=>true,
        'data'=>$array
    ));
}else if($_SERVER['REQUEST_METHOD'] == 'POST'){
    if(isset($_REQUEST['id'])){
        $id = (int)$_REQUEST['id'];
        $name = $_REQUEST['name'];
        $price = (double)$_REQUEST['price'];
        $dimage = $_REQUEST['dimage'];

        $imageName = $_FILES['image']['name'];
        $imageSize = $_FILES['image']['size'];
        $imageTemp = $_FILES['image']['tmp_name'];
        $explode = explode('.', $imageName);
        $ext = end($explode);
        $rand = rand(1000, 100000);
        $imageUrl = './products/'.$rand.'.'.$ext;

        if(move_uploaded_file($imageTemp, $imageUrl)){
            $STH = $conn->prepare('UPDATE products SET `prodname`=?, `price`=?, `img`=? WHERE `id`=?');
            $STH->execute([$name, (double)$price, $imageUrl, $id]);

            if($STH->rowCount()){
                unlink($dimage);
                echo json_encode(array(
                    'status'=>true,
                    'message'=>'Record updated'
                ));
            }else{
                unlink($imageUrl);
                echo json_encode(array(
                    'status'=>false,
                    'message'=>'Failed to update record'
                ));
            }
        }else{
            echo json_encode(array(
                'status'=>false,
                'message'=>'Failed to upload image'
            ));
        }
    }else{
        $name = $_REQUEST['name'];
        $price = (double)$_REQUEST['price'];
        $imageName = $_FILES['image']['name'];
        $imageSize = $_FILES['image']['size'];
        $imageTemp = $_FILES['image']['tmp_name'];
        $explode = explode('.', $imageName);
        $ext = end($explode);
        $rand = rand(1000, 100000);
        $imageUrl = './products/'.$rand.'.'.$ext;

        if(move_uploaded_file($imageTemp, $imageUrl)){
            $STH = $conn->prepare("INSERT INTO `products` (prodname, price, img) VALUES (:prodname, :price, :img)");
            $STH->bindParam(':prodname', $name);
            $STH->bindParam(':price', $price);
            $STH->bindParam(':img', $imageUrl);
            $STH->execute();

            if($STH->rowCount()){
                echo json_encode(array(
                    'status'=>true,
                    'message'=> 'Product created successfully'
                ));
            }else{
                unlink($imageUrl);
                echo json_encode(array(
                    'status'=>false,
                    'message'=>'Failed to record product input'
                ));
            }
        }else{
            // unlink($imageUrl);
            echo json_encode(array(
                'status'=>false,
                'message'=>'Failed to upload product image'
            ));
        }
    }
}else if($_SERVER['REQUEST_METHOD'] == 'PUT'){
    $body = file_get_contents('php://input');
    $body = json_decode($body);

    $STH = $conn->prepare('UPDATE `products` SET `prodname`=?, `price`=? WHERE `id`=?');
    $STH->execute([$body->name, (double)$body->price, (int)$body->id]);

    if($STH->rowCount()){
        echo json_encode(array(
            'status'=>true,
            'message'=> 'Record updated'
        ));
    }else{
        echo json_encode(array(
            'status'=>false,
            'message'=> 'Failed to update record'
        ));
    }
}else if($_SERVER['REQUEST_METHOD'] == 'DELETE'){
    $body = file_get_contents('php://input');
    $body = json_decode($body);

    $STH = $conn->prepare('DELETE FROM `products` WHERE `id`=?');
    $STH->execute([(int)$body->id]);

    if($STH->rowCount()){
        unlink($body->img);
        echo json_encode(array(
            'status'=>true,
            'message'=>'Record deleted'
        ));
    }else{
        echo json_encode(array(
            'status'=>false,
            'message'=>'Failed to delete record'
        ));
    }
}