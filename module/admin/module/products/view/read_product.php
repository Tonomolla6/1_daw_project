<script src="module/admin/module/products/model/validator.js"></script>
<script src="module/admin/module/products/view/js/products_js.js"></script>
<link href="module/admin/module/products/view/css/productos_css.css" rel="stylesheet" type="text/css" />
<div class="h1">
  <h1>Read Product</h1>
  <a href="index.php?page=products"><div class="back">BACK</div></a>
</div>
<?php
    print_r("
    <div class='read_container'>
        <div>
            <p class='title_r'>Name:</p>
            <p>".$list['0']['name']."</p>
        </div>

        <div>
            <p class='title_r'>Price:</p>
            <p>".$list['0']['price']."</p>
        </div>

        <div>
            <p class='title_r'>Description:</p>
            <p>".$list['0']['description']."</p>
        </div>
    </div>
    ")
?>