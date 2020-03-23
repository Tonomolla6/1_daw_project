var interruptor = true;

function scroll_menu() {
  if (document.getElementById('scroll_menu').style.transform == "rotate(180deg)" && interruptor == true) {
    //Columna
    document.getElementById('scroll_menu').style.transform = "rotate(0deg)";
    document.getElementById('menu').style.width = "20vw";
    //Nombres
    document.getElementById('homepage_p').style.transform = "translateX(0px)";
    document.getElementById('products_p').style.transform = "translateX(0px)";
    document.getElementById('users_p').style.transform = "translateX(0px)";
    document.getElementById('discounts_p').style.transform = "translateX(0px)";
    document.getElementById('categories_p').style.transform = "translateX(0px)";

    document.getElementById('orders_p').style.transform = "translateX(0px)";
    document.getElementById('settings_p').style.transform = "translateX(0px)";
    document.getElementById('homepage_i').style.fontSize = "1em";
    document.getElementById('products_i').style.fontSize = "1em";
    document.getElementById('users_i').style.fontSize = "1em";
    document.getElementById('discounts_i').style.fontSize = "1em";
    document.getElementById('categories_i').style.fontSize = "1em";
    document.getElementById('orders_i').style.fontSize = "1em";
    document.getElementById('settings_i').style.fontSize = "1em";
    //Perfil
    document.getElementById('menu_p').style.opacity = "1";
    document.getElementById('menu_h3').style.opacity = "1";
    document.getElementById('menu_img').style.width = "80px";
    document.getElementById('menu_img').style.transform = "translateY(0px)";
    document.getElementById('menu_img').style.marginBottom = "10px";
    //Boton
    document.getElementById('button_menu').style.opacity = "1";
    document.getElementById('button_menu_i').style.opacity = "0";
    document.getElementById('button_menu').style.transform = "translateX(0px)";

    document.getElementById('user_menu').style.minHeight = "170px";
    document.getElementById('user_menu').style.paddingTop = "0px";

    interruptor = false;
  } else {
    //Columna
    document.getElementById('scroll_menu').style.transform = "rotate(180deg)";
    document.getElementById('menu').style.width = "50px";
    //Nombres
    document.getElementById('homepage_p').style.transform = "translateX(70px)";
    document.getElementById('products_p').style.transform = "translateX(70px)";
    document.getElementById('users_p').style.transform = "translateX(70px)";
    document.getElementById('discounts_p').style.transform = "translateX(70px)";
    document.getElementById('categories_p').style.transform = "translateX(70px)";
    document.getElementById('orders_p').style.transform = "translateX(70px)";
    document.getElementById('settings_p').style.transform = "translateX(70px)";
    document.getElementById('homepage_i').style.fontSize = "22px";
    document.getElementById('products_i').style.fontSize = "22px";
    document.getElementById('users_i').style.fontSize = "22px";
    document.getElementById('discounts_i').style.fontSize = "22px";
    document.getElementById('categories_i').style.fontSize = "22px";
    document.getElementById('orders_i').style.fontSize = "22px";
    document.getElementById('settings_i').style.fontSize = "22px";
    //Perfil
    document.getElementById('menu_p').style.opacity = "0";
    document.getElementById('menu_h3').style.opacity = "0";
    document.getElementById('menu_img').style.width = "36px";
    document.getElementById('menu_img').style.transform = "translateY(18px)";
    document.getElementById('menu_img').style.marginBottom = "0px";
    //Boton
    document.getElementById('button_menu').style.opacity = "0";
    document.getElementById('button_menu_i').style.opacity = "1";
    document.getElementById('button_menu').style.transform = "translateX(50px)";

    document.getElementById('user_menu').style.minHeight = "65px";
    document.getElementById('user_menu').style.paddingTop = "55px";

    interruptor = true;
  }
}

function change_lang(lang) {
  var language = lang || localStorage.getItem('lang') || 'en';
  var data_tr = document.querySelectorAll("[data-tr]");
  if (language == 'en') {
    for (let i = 0; i < data_tr.length; i++) {
      if (data_tr[i]['localName'] == 'input' && data_tr[i]['type'] == 'button'
      || data_tr[i]['localName'] == 'input' && data_tr[i]['type'] == 'reset')
        data_tr[i]['value'] = data_tr[i]['dataset']['tr'];
      else
        data_tr[i].innerHTML = data_tr[i]['dataset']['tr'];
    }
    localStorage.setItem('lang', language);
  } else {
    $.ajax({
      url: "module/admin/view/json/"+language+".json",
      success: function(result){
        for (let i = 0; i < data_tr.length; i++) {
          if (result[language][data_tr[i]['dataset']['tr']])
            if (data_tr[i]['localName'] == 'input' && data_tr[i]['type'] == 'button' 
            || data_tr[i]['localName'] == 'input' && data_tr[i]['type'] == 'reset')
              data_tr[i]['value'] = result[language][data_tr[i]['dataset']['tr']];
            else
              data_tr[i].innerHTML = result[language][data_tr[i]['dataset']['tr']];
          else 
            data_tr[i].innerHTML = data_tr[i]['dataset']['tr']
        }
    }});
  }
}

$(document).ready(function() {
  // Change of language
  change_lang();

  // Selection in the menu buttons
  var items = location.search.substr(1).split("&")[0].split("=")[1];

  try {
    document.getElementById(items).style.backgroundColor = "#1e1e1e";
    document.getElementById(items).style.color = "white";
  }
  catch(error) {
    console.error(error);
  }

  $('#logout').on("click", function() {
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
});
