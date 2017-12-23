$(document).ready(function() {
	$('#logout').click(async function() {
		let res = await $.ajax('/logout', {type : 'post'});
		try {
			if(res.state == 'success') {
				window.location.href = '/';
			} else {
				console.log('log out fail.');
			}
		} catch(err) {
			console.log('connecting error.');
		}
	});
});