$( document ).ready(function() {
    categorias();
});

control_add = true;

function clicks() {
    $('#add_category').on('click', function(){
        if (control_add == true) {
            var new_element = "<tr id='newcategory'><td>...</td><td ><input class='newcategory' name='newcategory'/><div class='error'></div></td><td class='products_settings'><a id='save_newcategory' class='read'><i class='fas fa-save'></i><p data-tr='Save'></p></a><a id='cancel_newcategory' class='delete delete_question_b'><i class='fas fa-trash-alt'></i><p data-tr='Cancel'></p></a></td></tr>";
            $('tbody').html(new_element + $('tbody').html());
            $('.newcategory').focus();
            change_lang();
            control_add = false;
            clicks();
        }
    });

    $('#save_newcategory').on('click', function(){
        $.ajax({
            type: 'GET',
            url: "module/admin/module/categories/controller/controller_categories.php",
            dataType: 'json',
            data: { op: 'insert_category', name: $('.newcategory').val()},
            success: function(result){
                if(result == 'error')
                    $('.error').html('Esta categoria ya existe');
                else {
                    $('#newcategory').remove();
                    location.reload();
                }
          }});
    });

    $('#save_newsubcategory').on('click', function(){
        var id = this.getAttribute('id_button');
        $.ajax({
            type: 'GET',
            url: "module/admin/module/categories/controller/controller_categories.php",
            dataType: 'json',
            data: { op: 'insert_subcategory', name: $('.newcategory').val(), id: id},
            success: function(result){
                if(result == 'error')
                    $('.error').html('Esta subcategoria ya existe');
                else {
                    $('#newcategory').remove();
                    location.reload();
                }
          }});
    });

    $('#cancel_newcategory').on('click', function(){
        $('#newcategory').remove();
        control_add = true;
    });

    $('.delete2').on('click', function(){
        var id = this.getAttribute('id_button');
        $.ajax({
            type: 'GET',
            url: "module/admin/module/categories/controller/controller_categories.php",
            dataType: 'json',
            data: { op: 'delete_category', id: id},
            success: function(result){
                location.reload();
          }});
    });

    $('.delete3').on('click', function(){
        var id = this.getAttribute('id_button');
        $.ajax({
            type: 'GET',
            url: "module/admin/module/categories/controller/controller_categories.php",
            dataType: 'json',
            data: { op: 'delete_subcategory', id: id},
            success: function(result){
                location.reload();
          }});
    });

    $('.read').on('click', function(){
        var id = this.getAttribute('id_button');
        if (control_add == true) {
            var new_element = "<tr id='newcategory'><td>...</td><td class='padding'><input class='newcategory' name='newcategory'/><div class='error'></div></td><td class='products_settings'><a id_button='"+id+"' id='save_newsubcategory' class='read'><i class='fas fa-save'></i><p data-tr='Save'></p></a><a id='cancel_newcategory' class='delete delete_question_b'><i class='fas fa-trash-alt'></i><p data-tr='Cancel'></p></a></td></tr>";
            $( "#category"+id).after(new_element);
            $('.newcategory').focus();
            change_lang();
            control_add = false;
            clicks();
        }
    });
    
}
function categorias() {
    $.ajax({
        type: 'GET',
        url: "module/admin/module/categories/controller/controller_categories.php",
        dataType: 'json',
        data: { op: 'list_categories'},
        success: function(result){
            if (result != 'error') {
                for (let index = 0; index < result.length; index++) {
                    var element = element + "<tr id='category"+result[index][0]+"' class='evenn'><td>"+result[index][0]+"</td><td>"+result[index][1]+"</td><td class='products_settings'><a id_button='"+result[index][0]+"' class='read'><i class='fas fa-plus-square'></i><p data-tr='Subcategory'></p></a><a class='update'><i class='fas fa-pencil-alt'></i><p data-tr='Update'></p></a><a id_button='"+result[index][0]+"' class='delete delete2 delete_question_b'><i class='fas fa-trash-alt'></i><p data-tr='Delete'></p></a></td></tr>";
                    // $( ".inner" ).after( "<p>Test</p>" );
                }
                $('tbody').html(element);
            }   
            $
            subcategorias();
    }});  
}

function subcategorias() {
    $.ajax({
        type: 'GET',
        url: "module/admin/module/categories/controller/controller_categories.php",
        dataType: 'json',
        data: { op: 'list_subcategories'},
        success: function(result){
            for (let x = 0; x < result.length; x++) {
                $( "#category"+result[x][2]).after("<tr id='subcategory"+result[x][0]+"'><td>"+result[x][0]+"</td><td class='padding'>"+result[x][1]+"</td><td class='products_settings'><a class='update'><i class='fas fa-pencil-alt'></i><p data-tr='Update'></p></a><a id_button='"+result[x][0]+"' class='delete delete3 delete_question_b'><i class='fas fa-trash-alt'></i><p data-tr='Delete'></p></a></td></tr>");
            }
            change_lang();
            $('#table_id').dataTable( {
                "ordering": false,
                "lengthMenu": [ 25, 50, 75, 100 ]
            });
            clicks();
    }});  
}