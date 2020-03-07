<?php 
    $route = "
    <a href='index.php?page=products' data-tr='Products'></a>
    <i class='fas fa-caret-right'></i>
    <a href='index.php?page=products&op=create_product' data-tr='Add product'></a>"; 
?>

<script src="module/admin/module/products/model/validator.js"></script>
<script src="module/admin/module/products/view/js/products_js.js"></script>
<link href="module/admin/module/products/view/css/productos_css.css" rel="stylesheet" type="text/css" />
<div class="title">
    <h1 data-tr="Create Product"></h1>
    <a href="index.php?page=products">
        <div class="products_title_button products_back_button">
            <i class="fas fa-arrow-circle-left"></i>
            <p data-tr="Back"></p>
        </div>
    </a>
</div>
<?php
    if(isset($error)){
        print ("<span id='error' class='error'>".$error."</span>");
    } else if (isset($mensaje)){
        print ("<span id='succes' class='succes'>".$mensaje."</span>");
    }
?>
<form method="post" name="form_create_product" id="form_create_product">
    <div class="products_input">
        <div>
            <label for="name" data-tr="Name"></label><label>*:</label>
        </div>
        <input name="name" id="name" type="text" placeholder="Product name" value="<?php echo $_POST?$_POST['name']:""; ?>" />
    </div>
    <span id="e_name" class="styerror"></span>
    <hr>
    <div class="products_input">
        <div>
            <label for="purchase_price" data-tr="Purchase price"></label><label>*:</label>
        </div>
        <input name="purchase_price" id="purchase_price" type="text" placeholder="Purchase price, in €" value="<?php echo $_POST?$_POST['purchase_price']:""; ?>" /> 
    </div>
    <span id="e_purchase_price" class="styerror"></span>
    <hr>
    <div class="products_input">
        <div>
            <label for="sale_price" data-tr="Sale price"></label><label>*:</label>
        </div>
        <input name="sale_price" id="sale_price" type="text" placeholder="Sale price, in €" value="<?php echo $_POST?$_POST['sale_price']:""; ?>" /> 
    </div>
    <span id="e_sale_price" class="styerror"></span>
    <hr>
    <div class="products_input">
        <div>
            <label for="stock" data-tr="Stock"></label><label>*:</label>
        </div>
        <input name="stock" id="stock" type="text" placeholder="Stock, in pcs" value="<?php echo $_POST?$_POST['stock']:""; ?>" /> 
    </div>
    <span id="e_stock" class="styerror"></span>
    <hr>
    <div class="products_input">
        <div>
            <label for="description" data-tr="Description"></label><label>:</label>
        </div>
        <textarea name="description" id="description" rows="5"><?php echo $_POST?$_POST['description']:""; ?></textarea>
    </div>
    <hr>
    <div class="products_input">
        <div>
            <label for="provider" data-tr="Provider"></label><label>*:</label>
        </div>
        <select name="provider" id="provider">
            <option value="other">Other</option>
            <option value="Provider 1">Provider 1</option>
            <option value="Provider 2">Provider 2</option>
            <option value="Provider 3">Provider 3</option>
            <option value="Provider 4">Provider 4</option>
        </select>
    </div>

    <div class="products_input">
        <div>
            <label for="category" data-tr="Category"></label><label>*:</label>
        </div>
        <select name="category" id="category">
        </select>
    </div>

    <div class="products_input">
        <div>
            <label for="subcategory" data-tr="Subcategory"></label><label>*:</label>
        </div>
        <select name="subcategory" id="subcategory">
        </select>
    </div>
    
    <input class="add_button" name="add" type="button" data-tr="Add product" onclick="product_validator_js()"/>
    <input class="reset_button" name="reset" type="reset" data-tr="Reset"/>
</form>