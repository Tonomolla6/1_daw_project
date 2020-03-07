function clicks() {
    $('#slider_id_module').on("click",function() {
		$('#content').css('overflow','hidden');
        $('.hidden_container').css('display','flex');
        $('.hidden_container').css('zIndex','2');

        $.ajax({
			type: 'GET',
			url: "module/admin/module/homepage/controller/controller_homepage.php",
			dataType: 'json',
			data: {module: 'slider_list'},
			success: function(result) {
				$('#slider_total').html(" " + result.length);
				var total = "";
				for (let i = 0; i < result.length; i++) {
					total += 
					"<div class='slider' id='slider_"+result[i][0]+"' style='background-image: url("+result[i][3]+");'><div class='hidden_plus'><i class='fas fa-pencil-alt'></i></div><div class='hidden_del'><i class='fas fa-trash-alt'></i></div><span><p>"+result[i][1]+"</p><label>"+result[i][2]+"</label></span></div>";
				}

				$('.hidden_container_sliders').html(total);
				console.log(total);
			}
		});
    });
    
    $('.close').on("click",function() {
		$('#content').css('overflowY','scroll');
        $('.hidden_container').css('display','none');
        $('.hidden_container').css('zIndex','-1');
    });

	$('.slider').on("click",function() {

    });

}

$( document ).ready(function() {
    clicks();
});