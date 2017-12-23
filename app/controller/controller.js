var express = require('express');
var model = require('../model/model');
var crypto = require('crypto');


var controller = {
	registPage : function(request, response, next) {
		response.render('signup');
		response.end();
	},

	register : async function(request, response, next) {
		//console.log(request.body);
		var md5 = crypto.createHash('md5');
		var UND = false, IDD = false, TED = false, EMD = false;
		var UND = await model.findByUsername(request.body.username);
		var IDD = await model.findById(request.body.id);
		var TED = await model.findByTel(request.body.tel);
		var EMD = await model.findByEmail(request.body.email);
		var i = {
			state : 'success',
			reason : 'none'
		};
		//console.log(UND.length);
		if(UND.length != 0)
			i.reason = 'USER_NAME_DUL';
		else if(IDD.length != 0)
			i.reason = 'ID_DUL';
		else if(TED.length != 0)
			i.reason = 'TEL_DUL';
		else if(EMD.length != 0)
			i.reason = 'EMAIL_DUL';
		else {
			request.body.password = await md5.update(request.body.password).digest('base64');
			console.log(request.body.password);
			request.session.userid = model.add(request.body);
			request.session.username = request.body.username;

		}
		//console.log(i);
		response.send(i);
		response.end();
	},

	login : async function(request, response, next) {
		//console.log(request.query, request.session);
		var count = 0;
		for(var i in request.query)
			count ++;
		if(count > 1) {
			response.redirect('/');
			response.end();
		}

		if(request.query.username && request.session.username) {
			let curUser = await model.findByUsername(request.session.username);
			response.render('user', {
				username : curUser[0].username,
				id : curUser[0].id,
				tel : curUser[0].tel,
				email : curUser[0].email,
				errtext : request.query.username === request.session.username ? '' :
				 "cannot visit other user's page."
			});
			response.end();
		} else if(request.session.username) {
			response.redirect('/?username=' + request.session.username);
			response.end();
		} else if(request.query.username) {
			response.redirect('/');
			response.end();
		} else {
			response.render('login');
			response.end();
		}
	},

	loginHandler : async function(request, response, next) {
		//console.log('this is a post');
		var md5 = crypto.createHash('md5');
		var back = {
			state : 'success',
			reason : 'none'
		}
		request.body.password = await md5.update(request.body.password).digest('base64');
		console.log(request.body.password);
		back.reason = await model.logIn(request.body);
		if(back.reason == 'none') {
			request.session.username = request.body.username;
		}
		//console.log(back);
		response.send(back);
		response.end();
	},

	redirecter : function(request, response, next) {
		//console.log('this is to redirect');
		response.redirect('/');
		response.end();
	},

	logout : function(request, response, next) {
		//console.log('this is logout');
		request.session.destroy();
		response.send({state : 'success'});
		response.end();
		//console.log(request.session);
	}
}

module.exports = controller;