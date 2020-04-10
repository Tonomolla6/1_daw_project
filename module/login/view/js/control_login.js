var total;
$(document).ready(function() {
    login('session');
    activity();
});

function login(stat) {
    var login_promise = function () {
        return new Promise(function(resolve, reject) {
            $.ajax({ 
                    type: 'POST',
                    url: "module/login/controller/login.php?op=checking",
                    dataType: 'json',
                    data: {stat: stat}
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

    if (stat == 'session') {
        login_promise()
        .then(function(result) {
            cart_reload();
            if (result == false) {
                window.location.href = "index.php?page=checking"
            } else if (result == true) {
                $('#login i').removeClass('fa-sort-down');
                $('#login i').addClass('fa-user');
                $('#login p').html("Iniciar sesión");
                $('#login .options').css('display','none');
                $('#login .avatar').css('display','none');
                $('#login').attr('id_stat','login');
            } else {
                $('#login p').html(result[0]);
                $('#login i').removeClass('fa-user');
                $('#login i').addClass('fa-sort-down');
                $('#login i').css('margin','5px 0px 10px 5px');
                $('#login').css('flex-direction','row-reverse');
                $('#login .avatar').css('display','flex');
                $('#login .avatar').css('background-image','url('+result[1]+')');
                $('#login .options').css('display','flex');
                $('#login').attr('id_stat','none');
            }
        });
    } else {
        login_promise()
        .then(function(result) {
            total = result;
        });
    }
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