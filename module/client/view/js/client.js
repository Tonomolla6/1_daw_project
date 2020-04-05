$( document ).ready(function() {
  //API
  $.ajax({
    type: 'GET',
    url: 'https://www.googleapis.com/books/v1/volumes?q=hosteleria',
    dataType: 'json',
    success: function(result) {
      for (let i = 0; i < 5; i++) {
        $('.apis').html($('.apis').html() +
          '<a href="'+result['items'][i]['volumeInfo']['infoLink']+'" class="div api">'+
            '<div style="background-image: url('+result['items'][i]['volumeInfo']['imageLinks']['smallThumbnail']+')" class="img"></div>'+
            '<p>'+result['items'][i]['volumeInfo']['title']+'</p>'+
          '</a>');
      }
    }
  });

  $('#search_bar').val(localStorage.getItem('search'));

  // Obtener get
  var $_GET = {};
  document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
      function decode(s) {
          return decodeURIComponent(s.split("+").join(" "));
      }

      $_GET[decode(arguments[1])] = decode(arguments[2]);
  });

  //Categories
  $.ajax({
    type: 'GET',
    url: "module/client/controller/client.php",
    dataType: 'json',
    data: { op: 'menu'},
    success: function(result){
      var element = "";
      for (let i = 0; i < result.length; i++) {
        if(i == 0) {
          $('div.list_subcategories h3').html(result[0][1]);
        }

        element = element + 
        '<div id_button="'+result[i][0]+'" class="top_category">'+
          '<p>'+result[i][1]+'</p>'+
          '<i class="fas fa-angle-right"></i>'+
        '</div>';
      }
      $('.list_categories').html(element);
      
      manu_search = "true";

      menu_fixed();
      clicks_admin();
      top_subcategorias($(".top_subcategory").first().attr('id_button'));
  }});

  //Search
  $("#search_bar").keyup(function() {
    var string = $("#search_bar").val();
    localStorage.setItem('search',string);
    $.ajax({
      type: 'GET',
      url: "module/client/controller/client.php",
      dataType: 'json',
      data: { 
        op: 'autocomplete',
        keyup: string,
        categoria: localStorage.getItem('category'),
        subcategoria: localStorage.getItem('subcategory')
      },
      success: function(result){
        try{
          console.log(result);
          search_productos(result,string);
        } catch(e) {

          console.log(result);
        }
      }
    })
  });
});

function force_search() {
  var string = $("#search_bar").val();
    $.ajax({
      type: 'GET',
      url: "module/client/controller/client.php",
      dataType: 'json',
      data: { 
        op: 'autocomplete',
        keyup: string,
        categoria: localStorage.getItem('category'),
        subcategoria: localStorage.getItem('subcategory')
      },
      success: function(result){  
        try{
          console.log(result);
          search_productos(result,string);
        } catch(e) {
          console.log(result);
        }
      }
    })
}

function menu_fixed() {
  //Css del menu
  if (manu_search == "true")  {
    $('#close_button').css("display","none");
    $('#search_button').css("display","none");
    $('.first').css("position","absolute");
    $('.first').css("width","80%");
    $('.first').css("background-color","rgba(255, 255, 255, 0.95)");
    $('.first').css("padding-left","20%");
    $('.search').css("display","flex");
    $('.first').css("height","35px");
    $('.search').css("opacity","1");
  } else if (localStorage.getItem('menu_search') == "true") {
    $('#close_button').css("display","flex");
    $('#search_button').css("display","none");
    $('.first').css("position","absolute");
    $('.first').css("width","80%");
    $('.first').css("background-color","rgba(255, 255, 255, 0.95)");
    $('.first').css("padding-left","20%");
    $('.search').css("display","flex");
    $('.first').css("height","35px");
    $('.search').css("opacity","1");
  }
}

function clicks_admin() {
  $('.button_').on("click",function() {
    localStorage.removeItem('subcategory');
    id = this.getAttribute('id');
    id_button = this.getAttribute('id_button');
    if (id_button) {
      localStorage.setItem("category",id_button);
      window.location.href = "index.php?page=products";
    } else
      window.location.href = "index.php?page="+id;
  });

  $('#login').on("click",function() {
    id = this.getAttribute('id_stat');
    if (id == "logout") {
      $.ajax({
        type: 'POST',
        url: "module/login/controller/login.php?op=logout",
        success: function(result) {
          if (result == "true") {
            window.location.href = "index.php?page=homepage";
          }
        }
      });
    } else if (id != "none")
      window.location.href = "index.php?page="+id;
  });

  $('#login .logout').on("click",function() {
      $.ajax({
        type: 'POST',
        url: "module/login/controller/login.php?op=logout",
        success: function(result) {
          if (result == "true") {
            window.location.href = "index.php?page=homepage";
          }
        }
      });
  });

  $('#search_button').on("click",function() {
    localStorage.setItem('menu_search',"true");
    $('.first').css("position","absolute");
    $('.first').css("width","80%");
    $('.first').css("background-color","rgba(255, 255, 255, 0.95)");
    $('.first').css("padding-left","20%");
    $('.first').css("height","0px");
    setTimeout(function(){ 
      $('#close_button').css("display","flex");
      $('#search_button').css("display","none");
      $('.search').css("display","flex");
      $('.first').css("height","35px");
    }, 100);

    setTimeout(function(){ 
      $('.search').css("opacity","1");
    }, 110);

  });

  $('#close_button').on("click",function() {
    localStorage.setItem('menu_search',"false");
    $('.search').css("transition","0s");
    $('#close_button').css("display","none");
    $('#search_button').css("display","flex");

    setTimeout(function(){
      $('.search').css("opacity","0");
      $('.first').css("height","0px");
    }, 1);

    setTimeout(function(){ 
      $('.search').css("display","none");
      $('.search').css("transition","0.5");
    }, 300);

    setTimeout(function(){ 
      $('.first').css("opacity","1");
      $('.first').css("display","flex");
      $('.first').css("position","static");
      $('.first').css("height","auto");
      $('.first').css("padding-left","0");
      $('.first').css("width","auto");
      $('.first').css("background-color","transparent");
    }, 301);
  });

  $('#categories').on("click",function() {
    if ($('#all_categories').css('height') == '0px') {
      $('#all_categories').css('height','400px');
      $('.first').css('border-bottom','3px solid black');
      $('#categories').css('background-color','#03a9f4');
    } else {
      $('#all_categories').css('height','0px');
      $('#categories').css('background-color','black');
      setTimeout(function(){
        $('.first').css('border-bottom','none');
      }, 300);
    }
  });

  $("#all_categories").hover(function() {
  },function() {
    $('#all_categories').css('height','0px');
      $('#categories').css('background-color','black');
      setTimeout(function(){
        $('.first').css('border-bottom','none');
      }, 300);
  }
);

  $(".top_category").hover(function() {
      // Css de categoria
      $('.top_category').css("color","black");
      $(this).css("color","#2196F3");
      

      //Mostrar subcategorias
      id_button = this.getAttribute('id_button');
      localStorage.setItem("top_category",id_button);
      $('div.list_subcategories h3').html(jQuery(this).children("p").html());
      top_subcategorias();
      
    },function() {
    }
  );

  $(".top_category").on("click",function() {
      localStorage.removeItem("subcategory");
      localStorage.setItem("category",localStorage.getItem("top_category"));
      localStorage.removeItem("top_category");
      window.location.href = "index.php?page=products";
    }
  );
}

function top_subcategorias(categoria = localStorage.getItem('top_category')) {
  $.ajax({
      url: "module/client/controller/client.php",
      dataType: 'json',
      data: {
        op: 'list_subcategories',
        category: categoria
      },
      success: function(result){
          var element = "";
          for (let i = 0; i < result.length; i++) {
            element = element + 
            '<div id_button="'+result[i][0]+'" class="top_subcategory">'+
              '<div class="img"></div>'+
              '<p>'+result[i][1]+'</p>'+
            '</div>';
          }
          $('.add_subcategories').html(element);

          $(".top_subcategory").on("click",function() {
            id_button = this.getAttribute('id_button');
            localStorage.setItem("category",localStorage.getItem("top_category"));
            localStorage.setItem("subcategory",id_button);
            localStorage.removeItem("top_category");
            window.location.href = "index.php?page=products";
          });
      }
  }); 
}