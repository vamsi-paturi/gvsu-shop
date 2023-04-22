<?php
session_start();
include_once $_SERVER['DOCUMENT_ROOT']."/gvsu-shop/db/index.php";

if(isset($_SESSION['admin']) && !empty($_SESSION['admin'])){
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./css/style.css">
    <link rel="stylesheet" href="./css/nike.css">
    <link rel="stylesheet" href="./css/uicons/css/uicons-regular-rounded.css">
    <!-- <link rel="shortcut icon" href="./images/nikelogo.jpg" type="image/x-icon"> -->
    <title>GVSU Store - Dashboard - <?=$_SESSION['admin'];?></title>
    <script>
        let url = '<?=url;?>'
    </script>
</head>
<body>
    <div class="width-100 padding-all-10 black-bg white-text font-helvetica">
        <div class="flex-row-reverse">
            <div style="margin-left: 10px;">
                <a href="./logout.php" class="blue-text">Logout</a>
            </div>
            <div>Welcome, <span><?=$_SESSION['admin'];?></span></div>
        </div>
    </div>
    <div class="padding-all-20"></div>

    <div class="width-85 margin-auto nike-product-page-bg font-helvetica" style="border-radius: 5px;">
        <!-- <div class="padding-all-20"></div> -->
        <div class="width-50 width-m-90 width-s-100 margin-auto">
            <div class="row justify-content-center">
                <div class="padding-all-5">
                    <a href="./dashboard.php?product">
                        <button class="blue-bg white-text cursor-pointer">Products</button>
                    </a>
                </div>
                <div class="padding-all-5">
                    <a href="./dashboard.php?cart">
                        <button class="red-bg white-text cursor-pointer">View Orders</button>
                    </a>
                </div>
            </div>
        </div>

        <?php if(isset($_GET['editprod'])): ?>
            <div class="padding-all-10"></div>
            <div class="width-40 width-lx-50 width-l-60 width-m-100 width-s-100 margin-auto">
                <div class="center-text font-25 font-bold font-allerBd">Edit Products</div><br>
                <div style="box-shadow: 1px 2px 5px rgba(0,0,0,0.5); border-radius: 5px" class="padding-all-10 white-bg">
                    <form action="" method="POST">
                        <input type="hidden" name="id" id="id" value="<?=$_GET['editprod'];?>">
                        <input type="hidden" name="dimage" id="dimage" value="<?=$_GET['img'];?>" />
                        <div>
                            <label class="bold-text font-helvetica" for="">Product Name</label>
                            <input value="<?=$_GET['name'];?>" type="text" name="name" id="name" placeholder="Enter product name" />
                        </div><br>
                        <div>
                            <label class="bold-text font-helvetica" for="">Price</label>
                            <input value="<?=$_GET['price'];?>" type="text" name="price" id="price" placeholder="Enter product price" />
                        </div><br>
                        <div>
                            <label class="bold-text font-helvetica" for="">Image</label><br>
                            <input type="file" class="input" name="image" id="image">
                        </div>
                        <div>
                            <img src="<?=$_GET['img'];?>" alt="" width="100" height="100"/>
                        </div>
                        <div id="error" class="font-14 red-text"></div><br>
                        <div class="flex-row-reverse">
                            <button type="submit" class="blue-bg white-text">Edit product</button>
                        </div>
                    </form>
                </div>
            </div>
            <script src="./script/editprod.js"></script>
        <?php endif; ?>

        <?php if(isset($_GET['product'])): ?>
            <div class="padding-all-10"></div>
            <div class="width-40 width-lx-50 width-l-60 width-m-100 width-s-100 margin-auto">
                <div class="center-text font-25 font-bold font-allerBd">Add Products</div><br>
                <div style="box-shadow: 1px 2px 5px rgba(0,0,0,0.5); border-radius: 5px" class="padding-all-10 white-bg">
                    <form action="" method="POST">
                        <div>
                            <label class="bold-text font-helvetica" for="">Product Name</label>
                            <input type="text" name="name" id="name" placeholder="Enter product name" />
                        </div><br>
                        <div>
                            <label class="bold-text font-helvetica" for="">Price</label>
                            <input type="text" name="price" id="price" placeholder="Enter product price" />
                        </div><br>
                        <div>
                            <label class="bold-text font-helvetica" for="">Image</label><br>
                            <input type="file" class="input" name="image" id="image">
                        </div>
                        <div id="error" class="font-14 red-text"></div><br>
                        <div class="flex-row-reverse">
                            <button type="submit" class="blue-bg white-text">Add product</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="padding-all-20"></div>
            <div class="white-bg width-60 width-lx-70 width-l-95 width-m-100 width-s-100 margin-auto">
                <table class="table bordered">
                    <thead>
                        <tr>
                            <th>Id</th><th>Name</th><th>Price</th><th colspan="2">Action</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>

            <script src="./script/addproduct.js"></script>
        <?php endif; ?>

        <?php if(isset($_GET['cart'])):?>
        <div class="center-text bold-text font-20">Orders</div><br />

        <div class="width-50 width-lx-70 width-l-80 width-m-95 width-s-100 margin-auto padding-all-5 overflow-auto">
            <table class="table bordered font-roboto">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Fullname</th>
                        <th>Qty</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <script src="./script/getCart.js"></script>
        <?php endif;?>
        <div class="padding-all-20"></div>
    </div>

    <div class="padding-all-20"></div>
</body>
</html>

<?php
}else{
    header('Location: ./admin.htm');
}
?>