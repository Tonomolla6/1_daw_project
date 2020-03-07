
<script src="module/admin/module/products/model/validator.js"></script>
<script src="module/admin/module/products/view/js/products_js.js"></script>
<link href="module/admin/module/products/view/css/productos_css.css" rel="stylesheet" type="text/css" />
<!-- WEB TITLE -->
<div class="title">
  <h1 data-tr="All Products"></h1>
  <div class="products_title_buttons">

    <!-- DUMMIES BUTTON -->
    <a href="index.php?page=products&op=products_dummies">
      <div class="products_dummies">
        <i class="fas fa-boxes"></i>
        <p data-tr="Dummies"></p>
      </div>
    </a>

    <!-- CREATE BUTTON -->
    <a href="index.php?page=products&op=create_product">
      <div class="products_title_button products_add_button">
        <i class="fas fa-plus-circle"></i>
        <p data-tr="Add product"></p>
      </div>
    </a>

    <!-- DELETE ALL BUTTON -->
    <div id="products_delete_all_button" class="products_title_button products_delete_all_button">
      <i class="fas fa-times"></i>
      <p data-tr="Delete all"></p>
    </div>

  </div>
</div>

<!-- EMERGENT CONTAINERS -->
<div id="products_question">
  <div class="delete_question question">
    <p><strong id="products_delete_title"></strong></p>
    <div>
      <a id="accept_product" class="accept delete_question_yes" data-tr="Accept"></a>
      <a id="cancel_delete" class="delete_question_b cancel" data-tr="Cancel"></a>
    </div>
  </div>

  <div class="delete_all_question question">
    <p><strong id="products_delete_title" data-tr="Are you sure you want to delete all products?"></strong></p>
    <div>
      <a href="index.php?page=products&op=delete_products_all" class="accept" data-tr="Accept"></a>
      <a class="cancel products_delete_all_button" data-tr="Cancel"></a>
    </div>
  </div>

  <div class="read_question question">
    <div id="read_data">
    </div>
    <a id="close_read" class="cancel" data-tr="Close"></a>
  </div>
  
</div>

<!-- WEB CONTENT -->
<table id="table_id" class="list_products">
  <thead>
    <tr class="products_first">
      <th class="id" data-tr="Id"></th>
      <th data-tr="Name"></th>
      <th class="price" data-tr="Sale price"></th>
      <th class="stock" data-tr="Stock"></th>
      <th class="provider" data-tr="Provider"></th>
      <th class="settings" data-tr="Settings"></td>
    </tr>
  </thead>
  <tbody>
  <?php
    foreach ($list as $recived) {
     print_r("
     <tr>
        <td>#".$recived['id']."</td>
        <td>".$recived['name']."</td>
        <td>".$recived['sale_price']."€</td>
        <td>".$recived['stock']."&nbsppcs</td>
        <td>".$recived['provider']."</td>
        <td class='products_settings'>
          <a class='read' id='".$recived['id']."'>
            <i class='fas fa-eye'></i>
            <p data-tr='Read'></p>
          </a>
          <a href='index.php?page=products&op=update_product&id=".$recived['id']."' class='update'>
            <i class='fas fa-pencil-alt'></i>
            <p data-tr='Update'></p>
          </a>
          <a class='delete delete_question_b' id='".$recived['id']."' name='".$recived['name']."'>
            <i class='fas fa-trash-alt'></i>
            <p data-tr='Delete'></p>
          </a>
        </td>
      </tr>
     ");
    }
  ?>
  </tbody>
</table>