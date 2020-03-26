$(document).ready(function () {
    categorias();

    if (localStorage.getItem('product'))
        change_product_details(localStorage.getItem('product'));

    $(window).on('popstate', function (event) {
        alert("pop");
    });

    $('.pages').bootpag({
        total: 1,
        page: 1,
        maxVisible: 5,
        leaps: true,
        firstLastUse: true,
        first: 'Anterior',
        last: 'Siguiente',
        wrapClass: 'pagination',
        activeClass: 'active',
        disabledClass: 'disabled',
        nextClass: 'next',
        prevClass: 'prev',
        lastClass: 'last',
        firstClass: 'first'
    });
    paginacion();
});

function paginacion() {
    $('.pages').bootpag().on("page", function (event, num) {
        $.ajax({
            url: "module/client/module/products/controller/products.php",
            dataType: 'json',
            data: {
                op: 'list_products_add',
                category: localStorage.getItem('category'),
                mostrados: partes[num],
                subcategory: localStorage.getItem('subcategory')
            },
            success: function (result) {
                if (result == 'error') {
                    $(".products").html('<p class="error">No hay resultados para esa categoría.</p>');
                } else {
                    count_productos(partes[num + 1], partes[num]);
                    change_data();
                    draw_products(result);
                }
            }
        });
    });
}

function productos() {
    partes = [];
    if (localStorage.getItem('search'))
        force_search();
    else {
        $.ajax({
            url: "module/client/module/products/controller/products.php",
            dataType: 'json',
            data: {
                op: 'list_products',
                category: localStorage.getItem('category'),
                subcategory: localStorage.getItem('subcategory')
            },
            success: function (result) {
                $('.pages').bootpag({ page: 1 });
                if (result == 'error') {
                    $(".products").html('<p class="error">No hay resultados para esa categoría.</p>');
                } else {
                    count_productos(result.length, 0);
                    change_data();
                    draw_products(result);
                }
            }
        });
    }
}

var partes = [];
function count_productos(totales, offset) {
    $.ajax({
        url: "module/client/module/products/controller/products.php",
        dataType: 'json',
        data: {
            op: 'count_products',
            category: localStorage.getItem('category'),
            subcategory: localStorage.getItem('subcategory')
        },
        success: function (result) {
            if ((result.length / 20) % 1 == 0) {
                $('.pages').bootpag({ total: (result.length / 20), maxVisible: 5 });
                for (let i = 1; i <= ((result.length / 20) + 1); i++) {
                    if (i == 1)
                        partes[i] = 0;
                    else
                        partes[i] = partes[i - 1] + 20;
                }
            } else {
                var numero = parseInt(result.length / 20);
                numero = numero + 1;
                for (let i = 1; i <= numero; i++) {
                    if (i == 1)
                        partes[i] = 0;
                    else
                        partes[i] = partes[i - 1] + 20;
                }
                partes[numero + 1] = result.length;
                $('.pages').bootpag({ total: numero, maxVisible: 5 });
            }
            $('.text').html((offset + 1) + ' - ' + totales + ' de ' + result.length + ' resultados para');
        }
    });
}

function categorias() {
    $.ajax({
        url: "module/client/module/products/controller/products.php",
        dataType: 'json',
        data: { op: 'list_categories' },
        success: function (result) {
            for (let index = 0; index < result.length; index++) {
                var element = '<div id_button="' + result[index][0] + '" id="category_filter' + result[index][0] + '" class="category"><i class="fas fa-plus"></i><p>' + result[index][1] + '</p></div><div id="subcategories_filter' + result[index][0] + '" class="subcategories"></div>';
                $(".filter").html($(".filter").html() + element);
            }
            $('#category_filter' + localStorage.getItem('category')).css('background-color', 'rgb(225, 225, 225)');
            $('#category_filter' + localStorage.getItem('category') + ' i').removeClass('fa-plus');
            $('#category_filter' + localStorage.getItem('category') + ' i').addClass('fa-minus');
            $('.category').on('click', function () {
                pintadas = 0;
                var id = this.getAttribute('id_button');
                if ($('#subcategories_filter' + id).css('overflow') != 'visible') {
                    $('.subcategories').css({
                        'overflow': '',
                        'height': ''
                    });
                    $('.category').css('background-color', '');
                    $('.category' + ' i').removeClass('fa-minus');
                    $('.category' + ' i').addClass('fa-plus');

                    $('#subcategories_filter' + id).css({
                        'overflow': 'visible',
                        'height': 'auto',
                    });
                    $('#category_filter' + id).css('background-color', 'rgb(225, 225, 225)');
                    $('#category_filter' + id + ' i').removeClass('fa-plus');
                    $('#category_filter' + id + ' i').addClass('fa-minus');

                    localStorage.setItem('category', id);
                    localStorage.removeItem('subcategory');
                    $('.subcategory' + ' i').addClass('fa-greater-than');
                    $('.subcategory' + ' i').removeClass('fa-equals');
                    $('.subcategory p').css('color', 'black');
                    productos();
                } else {
                    localStorage.removeItem('subcategory');
                    $('.subcategory' + ' i').addClass('fa-greater-than');
                    $('.subcategory' + ' i').removeClass('fa-equals');
                    $('.subcategory p').css('color', 'black');
                    productos();
                }
            });
            subcategorias();
        }
    });
}

function subcategorias() {
    $.ajax({
        url: "module/client/module/products/controller/products.php",
        dataType: 'json',
        data: { op: 'list_subcategories' },
        success: function (result) {
            var element = "";
            for (let x = 0; x < result.length; x++) {
                element = '<div id_button="' + result[x][0] + '" id="subcategory_filter' + result[x][0] + '" class="subcategory"><i class="fas fa-greater-than"></i><p>' + result[x][1] + '</p></div>';
                $("#subcategories_filter" + result[x][2]).html($("#subcategories_filter" + result[x][2]).html() + element);
            }
            $('#category_filter' + localStorage.getItem('category')).css('background-color', 'rgb(225, 225, 225)');
            $('#category_filter' + localStorage.getItem('category') + ' i').removeClass('fa-plus');
            $('#category_filter' + localStorage.getItem('category') + ' i').addClass('fa-minus');
            $('#subcategories_filter' + localStorage.getItem('category')).css({
                'overflow': 'visible',
                'height': 'auto'
            });
            $('#subcategory_filter' + localStorage.getItem('subcategory') + ' i').removeClass('fa-greater-than');
            $('#subcategory_filter' + localStorage.getItem('subcategory') + ' i').addClass('fa-equals');
            $('#subcategory_filter' + localStorage.getItem('subcategory') + ' p').css('color', '#2196F3');
            $('.subcategory').on('click', function () {
                pintadas = 0;
                var id = this.getAttribute('id_button');
                localStorage.setItem('subcategory', id);
                $('.subcategory' + ' i').addClass('fa-greater-than');
                $('.subcategory' + ' i').removeClass('fa-equals');
                $('.subcategory p').css('color', 'black');
                $('#subcategory_filter' + id + ' i').removeClass('fa-greater-than');
                $('#subcategory_filter' + id + ' i').addClass('fa-equals');
                $('#subcategory_filter' + id + ' p').css('color', '#2196F3');
                productos();
            });
            productos();
        }
    });
}

function clicks() {
    $('.product').on('click', function () {
        var id = this.getAttribute('id_button');
        change_product_details(id);
    });
    $('.like').on('click', function () {
        likes(this);
    });
    hovers();
}

function hovers() {
    $(".like").hover(
        function () {
            if ($(this).children('i').hasClass("far")) {
                $(this).children('i').removeClass("far");
                $(this).children('i').addClass("fas");
            } else {
                $(this).children('i').removeClass("fas");
                $(this).children('i').addClass("far");
            }
        }, function () {
            if ($(this).children('i').hasClass("fas")) {
                $(this).children('i').removeClass("fas");
                $(this).children('i').addClass("far");
            } else {
                $(this).children('i').removeClass("far");
                $(this).children('i').addClass("fas");
            }
            $(this).children('.error_like').css("display", "none");
        }
    );
}

function change_product_details(id) {
    $.ajax({
        url: "module/client/module/products/controller/products.php",
        dataType: 'json',
        data: { op: 'details', id: id },
        success: function (result) {
            $('.text_details h2').html(result[0][1]);
            $('.reference').html('#' + result[0][0]);
            $('.price').html(result[0][5] + '€');
            $('.page_details').css('display', 'flex');
            $('.page').css('display', 'none');
            $('div.imagen').css('background-image', 'url(' + result[0]['img'] + ')');
            localStorage.removeItem('product');
        }
    });
    $.ajax({
        url: "module/client/module/products/controller/products.php",
        dataType: 'json',
        data: {
            op: 'products_categories',
            id: id,
            sub: localStorage.getItem('subcategory'),
            cat: localStorage.getItem('category')
        },
        success: function (result) {
            var content = "";
            for (let i = 0; i < result.length; i++) {
                var content = content +
                    '<div id_cat="' + result[i][8] + '" id_sub="' + result[i][9] + '" id_button="' + result[i][0] + '" class="div product">' +
                    '<div style="background-image: url(' + result[i]['img'] + ')" class="img"></div>' +
                    '<p>' + result[i][1] + '</p>' +
                    '</div>';
            }
            $('.subcategorias').html(content);
            clicks();
        }
    });
}
function change_data() {
    $.ajax({
        url: "module/client/module/products/controller/products.php",
        dataType: 'json',
        data: { op: 'list_categories' },
        success: function (result) {
            for (let index = 0; index < result.length; index++) {
                if (result[index][0] == localStorage.getItem('category')) {
                    $('h1.title').html(result[index][1]);
                    if (localStorage.getItem('subcategory')) {
                        $('.route').html('<strong>Home</strong> / Products' + " / " + result[index][1] + ' / ' + $('#subcategory_filter' + localStorage.getItem('subcategory') + ' p').text());
                        $('.info strong').html('Categoria: ' + result[index][1] + ' > ' + $('#subcategory_filter' + localStorage.getItem('subcategory') + ' p').text());
                    }
                    else {
                        $('.route').html('<strong>Home</strong> / Products' + " / " + result[index][1]);
                        $('.info strong').html('Categoria: ' + result[index][1]);
                    }
                    if (localStorage.getItem('search'))
                        $('.info strong').html($('.info strong').html() + ' > "' + localStorage.getItem('search') + '"');

                    $('.button_left').css("background-color", "");
                    $('.button_left').css("border-color", "");
                    $('#category' + localStorage.getItem('category')).css("background-color", "#e1e1e1");
                    $('#category' + localStorage.getItem('category')).css("border-color", "black");
                    break;
                }
            }
        }
    });
}

function search_productos(result, string) {
    if (result == "errorw") {
        $(".products").html("<div class='error'>No se encuentran result para " + string + "</div>");
        $(".info p").html("");
        $(".info strong").html("");
    } else {
        $('.info p').html(result.length + ' - ' + result.length + ' resultados para');
        draw_products(result);
    }
}

function draw_products(result) {
    var element = "";
    for (let index = 0; index < result.length; index++) {
        element = element + '<div></div><div class="product_like"><div class="like"><div class="error_like">Es necesario iniciar sesion</div><i class="far fa-heart"></i></div><div id_button="' + result[index][0] + '" class="product"><div style="background-image: url(' + result[index]['img'] + ')" class="img"></div><div class="data"><p class="title_product">' + result[index][1] + '</p><h3>' + result[index][5] + '€</h3></div></div></div>';
    }
    $(".products").html(element);
    clicks();
    change_data();
    draw_likes();
}

function likes(selected) {
    var check = login();
    if (check == "true" || check == "false")
        $(selected).children('.error_like').css('display', 'flex');
    else {
        var id = $(selected).next().attr('id_button');
        if ($(selected).children('i').hasClass("fas")) {
            $.ajax({
                type: 'GET',
                url: "module/client/module/products/controller/products.php",
                data: {
                    op: 'add_like',
                    id_product: id
                }
            });
            $(selected).children('i').removeClass("fas");
            $(selected).children('i').addClass("far");
        } else {
            $.ajax({
                type: 'GET',
                url: "module/client/module/products/controller/products.php",
                data: {
                    op: 'remove_like',
                    id_product: id
                }
            });
            $(selected).children('i').removeClass("far");
            $(selected).children('i').addClass("fas");
        }
    }
}

function draw_likes() {
    $.ajax({
        type: 'GET',
        url: "module/client/module/products/controller/products.php",
        dataType: 'json',
        data: {
            op: 'list_likes'
        },
        success: function(result) {
            for (let index = 0; index < result.length; index++) {
                $("[id_button="+result[index][0]+"]").parent().children('.like').children('i').removeClass("far");
                $("[id_button="+result[index][0]+"]").parent().children('.like').children('i').addClass("fas");
            }
            
        }
    });
}