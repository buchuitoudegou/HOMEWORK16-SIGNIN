$(document).ready(function() {
	$('#failbox').hide();
	$('#regist').click(function() {
		window.location.href = '/regist';
	});
	$('#sub').click(async function() {
		var username_ = document.getElementById('username_').value;
		var password_ = document.getElementById('password_').value;
		console.log(username_ == '', password_ == '');
		if(username_ == '' || password_ == '') {
			$('#failbox').show().text('username or password has not been filled in.').fadeOut(3000);
			return;
		}
		var Postdata = {
			username : username_,
			password : password_
		}
		console.log('11');
		try {
			let res = await $.ajax('/', {
				type : 'POST',
				dataType : 'json',
				data : Postdata
			});
			console.log(res);
			if(res.state == 'success' && res.reason == 'none') {
				window.location.href = '/?username=' + username_;
			} else {
				switch(res.reason) {
					case 'USER_ERR' : $('#failbox').show().text('username not exist.').fadeOut(3000);break;
					case 'PASSWORD_ERR' : $('#failbox').show().text('password error.').fadeOut(3000);break;
					default : $('#failbox').show().text('connect error').fadeOut(3000);break;
				}
			}
		} catch(err) {
			console.log('111');
		}
	});
});