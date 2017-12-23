$(document).ready(function() {
	$('#failbox').hide();
	$('#sub').click(ajaxHandler);
	$('#tips').click(function() {
		window.location.href = '/';
	});
	var username = false, id = false, password = false, password_repeat = false, tel = false, email = false;
	function checkUsername() {
		var reg = /^[a-zA-Z]\w{5,17}$/;
		var user = document.getElementById('username_').value;
		var val = reg.test(user)
		if(val == false) {
			username = false;
			$('#failbox').show().text('username can only contain 6-18 English characters, \
				underline or number and begin with English alphabet').fadeOut(3000);
			return false;
		}
		else {
			return true;
			username = true;

		}
	}
	function checkId() {
		var reg = /^[1-9][0-9]{7}$/
		var id = document.getElementById('id_').value;
		var val = reg.test(id);
		if(val == false) {
			id = false;
			$('#failbox').show().text('id can only contain 8 numbers.').fadeOut(3000);
			return false;
		}
		else {
			id = true;
			return true;
		}
	}
	function checkTel() {
		var reg = /^[1-9][0-9]{10}$/
		var tel = document.getElementById('tel_').value;
		var val = reg.test(tel);
		if(val == false) {
			tel = false;
			$('#failbox').show().text('tel. can only contain 11 digital \
				content and can not begin with 0').fadeOut(3000);
			return false;
		}
		else {
			tel = true;
			return true;
		}
	}
	function checkEmail() {
		var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
		var email = document.getElementById('email_').value;
		var val = reg.test(email);
		if(val == false) {
			email = false;
			$('#failbox').show().text('email address NOT valid.').fadeOut(3000);
			return false;
		}
		else {
			email = true;
			return true;
		}
	}
	function checkPassword() {
		var reg = /^[\w|\-]{6,12}$/;
		var password = document.getElementById('password_').value;
		var val = reg.test(password);
		if(val == false) {
			password = false;
			$('#failbox').show().text('password can only contain numbers, "-" or alphabet.').fadeOut(3000);
			return false;
		}
		else {
			password = true;
			return true;
		}
	}
	function checkPasswordRepeat() {
		var str = document.getElementById('password_repeat').value;
		var str1 = document.getElementById('password_').value;
		//console.log(str == str1);
		if(str != str1) {
			password_repeat = false;
			$('#failbox').show().text('password_repeat NOT match').fadeOut(3000);
			return false;
		}
		else {
			password_repeat = true;
			return true;
		}
	}
	async function ajaxHandler() {
		if(!checkUsername())
			return;
		else if(!checkId())
			return;
		else if(!checkPassword())
			return;
		else if(!checkTel())
			return;
		else if(!checkEmail())
			return;
		else if(!checkPasswordRepeat())
			return;
		var user = document.getElementById('username_').value;
		var password = document.getElementById('password_').value;
		var id = document.getElementById('id_').value;
		var tel = document.getElementById('tel_').value;
		var email = document.getElementById('email_').value;
		var user_info = {
			'username' : user,
			'id' : id,
			'password' : password,
			'tel' : tel,
			'email' : email 
		}
		try {
			let res = await $.ajax('/regist', {
				type : 'POST',
				dataType : 'json',
				data : user_info 
			});
			//alert(res.reason);
			if(res.state == 'success' && res.reason == 'none') {
				window.location.href = '/?username=' + user;
			}
			else {
				switch(res.reason) {
					case 'USER_NAME_DUL' : alert('username has been registed.');break;
					case 'ID_DUL' : alert('id has been registed.');break;
					case 'TEL_DUL' : alert('tel has been registed.');break;
					case 'EMAIL_DUL' : alert('email has been registed.');break;
					default : alert('unknown mistake.');break;
				}
			}
		}
		catch(err) {
			alert('cannot connect to the server.');
		}
	}
});