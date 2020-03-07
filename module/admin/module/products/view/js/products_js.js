$(document).ready( function() {
	// Table
    $('#table_id').dataTable( {
        "lengthMenu": [ 5, 10, 25, 50, 75, 100 ],
	});

	//Categories
	$.ajax({
		type: 'GET',
		url: "module/admin/module/products/controller/controller_product.php?op=list_categories",
		dataType: 'json',
		success: function(result) {
			for (let index = 0; index < result.length; index++) {
				var element = '<option value="'+result[index][0]+'">'+result[index][1]+'</option>';
				$('#category').html($('#category').html() + element);
			}
			//Subcategories
			subcategories();
		}
	});
	
	$('#category').change(function() {
        subcategories();
    });


	// Read
	$('.read').on("click",function() {
		var id = this.getAttribute('id');
		$.ajax({
			type: 'GET',
			url: "module/admin/module/products/controller/controller_product.php?op=read_product",
			dataType: 'json',
			data: {id: id},
			success: function(result) {
				$('#content').css('overflow','hidden');
				$('#products_question').css('display','flex');
				$('#products_question').css('zIndex','2');
				$('.read_question').css('display','flex');
				var spans = [
				"<div><span>Nombre: </span>", 
				"<div><span>Description: </span>", 
				"<div><span>Stock: </span>", 
				"<div><span>Purchase price: </span>",
				"<div><span>Sale price: </span>",
				"<div><span>Gain: </span>",
				"<div><span>Provider: </span>",
				"<div><span>Category: </span>",
				"<div><span>Subcategory: </span>"];
				for (let x = 0; x < spans.length; x++) {
					$("#read_data").html($("#read_data").html() + spans[x] + result[0][x+1] + "</div>");
				}
			}
		});
	});

	$('#close_read').on("click", function() {
		$('#content').css('overflowY','scroll');
		$('#products_question').css('display','none');
		$('.read_question').css('display','none');
		$("#read_data").html("");
	});

	// Delete
	$('.delete_question_b').on("click", function() {
		var name = this.getAttribute('name');
		var id = this.getAttribute('id');
		if ($('#products_question').css('display') == "none") {
			$('#content').css('overflow','hidden');
			$('#products_question').css('display','flex');
			$('#products_question').css('zIndex','2');
			$('.delete_question').css('display','flex');
			$('#products_delete_title').html("Are you sure you want to delete the product '" + name + "' ?");
			$('#accept_product').attr("href", "index.php?page=products&op=delete_product&id=" + id);
		} else {
			$('#products_question').css('display','none');
			$('#content').css('overflowY','scroll');
			$('.question').css('display','none');
		}
	});

	// Delete all
	$('.products_delete_all_button').on("click", function() {
		if ($('#products_question').css('display') == "none") {
			$('#content').css('overflow','hidden');
			$('#products_question').css('display','flex');
			$('#products_question').css('zIndex','2');
			$('.delete_all_question').css('display','flex');
		} else {
			$('#products_question').css('display','none');
			$('#content').css('overflowY','scroll');
			$('.question').css('display','none');
		}
	});
});

function subcategories() {
	$.ajax({
		type: 'GET',
		url: "module/admin/module/products/controller/controller_product.php?op=list_subcategories",
		dataType: 'json',
		data: {id: $('#category').val()},
		success: function(result) {
			console.log(result);
			for (let index = 0; index < result.length; index++) {
				var element = element + '<option value="'+result[index][0]+'">'+result[index][1]+'</option>';
			}
			$('#subcategory').html(element);
			element = '';
		}
	});
}