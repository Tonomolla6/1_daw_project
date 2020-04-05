$( document ).ready(function() {
  // Slider img
  var_img = 1;
  $.ajax({
    type: 'GET',
    url: "module/client/module/homepage/controller/homepage.php",
    dataType: 'json',
    data: { op: 'slider_img_count'},
    success: function(result){
      max_img = result[0][0];
      change_img(var_img);
  }});

  // Slider subcategories
  var_img = 1;
  $.ajax({
    type: 'GET',
    url: "module/client/module/homepage/controller/homepage.php",
    dataType: 'json',
    data: { op: 'slider_subcategoria'},
    success: function(result){
      for (let i = 0; i < result.length; i++) {
        $('.subcategorias').html($('.subcategorias').html() +
          '<div id_sub="'+result[i][0]+'" id_cat="'+result[i][2]+'" class="div subcategoria">'+
            '<div style="background-image: url(/nueva_final/module/client/module/homepage/view/img/subcategorias.jpg)" class="img"></div>'+
            '<p>'+result[i][1]+'</p>'+
          '</div>');
      }
    }
  });

  // Slider productos
  var_img = 1;
  $.ajax({
    type: 'GET',
    url: "module/client/module/homepage/controller/homepage.php",
    dataType: 'json',
    data: { op: 'slider_products'},
    success: function(result){
      console.log(result);
      for (let i = 0; i < result.length; i++) {
        $('.products').html($('.products').html()+
          '<div id_cat="'+result[i][8]+'" id_sub="'+result[i][9]+'" id_button="'+result[i][0]+'" class="div product">'+
            '<div style="background-image: url('+result[i]['img']+')" class="img"></div>'+
            '<p>'+result[i][1]+'</p>'+
          '</div>');
      }
      loop_img();
      clicks();
    }
  });  
});

function change_img(id_img) {
  $.ajax({
    url: "module/client/module/homepage/controller/homepage.php",
    dataType: 'json',
    data: {op: 'slider_img_change', id: id_img},
    success: function(result){
      $('#homepage_slider').css("background-image", "url("+result[0][3]+")"); 
      $('#homepage_slider div.text h2').html(result[0][1]); 
      $('#homepage_slider div.text p').html(result[0][2]);
  }}); 
}

function loop_img() {
  var_loop_img = setInterval(function(){
    if (var_img == max_img)
    var_img = 1;
    else
      var_img++;
    change_img(var_img);
  }, 8000);
}

function clicks() {
  $('.button1 i').on('click', function(){
    clearInterval(var_loop_img);
    if (var_img == 1)
      var_img = max_img;
    else
      var_img--;
    change_img(var_img);
    loop_img();
  });

  $('.button2 i').on('click', function(){
    clearInterval(var_loop_img);
    if (var_img == max_img)
      var_img = 1;
    else
      var_img++;
    change_img(var_img);
    loop_img();
  });

  $('.subcategoria').on('click', function(){
    var sub = this.getAttribute('id_sub');
    var cat = this.getAttribute('id_cat');
    localStorage.setItem('subcategory',sub);
    localStorage.setItem('category',cat);
    update_clicks("subcategories",sub);
    window.location.href = "index.php?page=products";
  });

  $('.product').on('click', function(){
    var sub = this.getAttribute('id_sub');
    var cat = this.getAttribute('id_cat');
    var id = this.getAttribute('id_button');
    localStorage.setItem('subcategory',sub);
    localStorage.setItem('category',cat);
    localStorage.setItem('product',id);
    update_clicks("products",id);
    window.location.href = "index.php?page=products";
  });

}

function update_clicks(table,id) {
  $.ajax({
    url: "module/client/module/homepage/controller/homepage.php",
    dataType: 'json',
    data: {op: 'update_clicks', 
    id: id,
    table: table}
  });
}