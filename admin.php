<?php
include_once $_SERVER['DOCUMENT_ROOT'].'/gvsu-shop/db/conn.php';

$db = new DB();
$conn = $db->connect();

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $from_url = $_SERVER['HTTP_REFERER'];
    $from_url = explode('?', $from_url);
    $from_url = $from_url[0];

    $username = $_REQUEST['username'];
    $password = $_REQUEST['password'];

    // $pdo = new PDO('sqlite:cartshop.db');
    $STH = $conn->prepare("SELECT * FROM `user_login` WHERE `username`=?");
    $STH->execute([$username]);

    // $data = $STH->fetch(PDO::FETCH_OBJ);

    if($STH->rowCount()){
        $data = $STH->fetch(PDO::FETCH_OBJ);
        $db_pass = $data->password;
        if($db_pass === $password){
            session_start();
            $_SESSION['admin'] = $username;
            header('Location: ./dashboard.php');
        }else{
            $url = $from_url.'?msg=Invalid username or password';
            header('Location: '.$url);
        }
    }else{
        $url = $from_url.'?msg=Invalid username or password';
        header('Location: '.$url);
    }

    // if(!is_null($data) && is_object($data)){
    //     $db_pass = $data->password;
    //     if($db_pass === $password){
    //         session_start();
    //         $_SESSION['admin'] = $username;
    //         header('Location: ./dashboard.php');
    //     }else{
    //         $url = $from_url.'?msg=Invalid username or password';
    //         header('Location: '.$url);
    //     }
    // }else{
    //     $url = $from_url.'?msg=Invalid username or password';
    //     header('Location: '.$url);
    // }
}