var total;
$(document).ready(function() {
    login();
    activity();
});

function login() {
    var login_promise = function () {
        return new Promise(function(resolve, reject) {
            $.ajax({ 
                     type: 'POST', 
                     url: "module/login/controller/login.php?op=checking"
                 })
                 .done(function(data) {
                     total = data;
                     resolve(data);
                 })
                 .fail(function(textStatus) {
                       console.log("Error en la promesa");
            });
        });
    }

    login_promise()
    .then(function(result) {
        if (result == "false") {
            window.location.href = "index.php?page=checking"
        } else if (result == "true") {
            $('#login i').removeClass('fa-sign-out-alt');
            $('#login i').addClass('fa-user');
            $('#login p').html("Iniciar sesión");
            $('#login').attr('id_stat','login');
            total = result;
        } else {
            $('#login p').html(result);
            $('#login i').removeClass('fa-user');
            $('#login i').addClass('fa-sign-out-alt');
            $('#login').attr('id_stat','logout');
            total = result;
        } 
    });
    return total;
}

function activity() {
    setInterval(function(){
		$.ajax({
			type : 'GET',
			url  : 'module/login/controller/login.php?op=time',
			success :  function(result){						
				if (result == "false") 
                    window.location.href = "index.php?page=checking"
			}
		});
	}, 10000);
}