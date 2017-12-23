var mongoose = require('../../lib/db.js');

var Schema = mongoose.Schema;

var UserSchema = new Schema( {
	username : {type : String},
	password : {type : String},
	id : {type : String},
	tel : {type : String},
	email : {type : String}
});

var userModel = mongoose.model('User', UserSchema);
exports.add = async function(user) {
	try {
		let new_user = await userModel.create(user);
		return new_user.id;
	} catch(err) {
		console.log(err);
	}
}
exports.findByUsername = async function(name) {
	try {
		let condition = {username : name}
		let user = await userModel.find(condition, function(err, result) {
			if(err)
				console.log(err);
			else {
				//console.log(result);
				if(result.length == 0)
					return false;
				else return true;
			}
		});
		//console.log(user);
		return user;
	}
	catch(err) {console.log('connect to DB failed.');return true;}
}
exports.findById = async function(id_) {
	try {
		let condition = {id : id_}
		let user = await userModel.find(condition, function(err, result) {
			if(err)
				console.log(err);
			else {
				//console.log(result);
				if(result.length == 0)
					return false;
				else return true;
			}
		});
		return user;
	}
	catch(err) {console.log('connect to DB failed.');return true;}
}
exports.findByTel = async function(tel_) {
	try {
		let condition = {tel : tel_}
		let user = await userModel.find(condition, function(err, result) {
			if(err)
				console.log(err);
			else {
				//console.log(result);
				if(result.length == 0)
					return false;
				else return true;
			}
		});
		return user;
	}
	catch(err) {console.log('connect to DB failed.');return true;}
}
exports.findByEmail = async function(email_) {
	try {
		let condition = {email : email_}
		let user = await userModel.find(condition, function(err, result) {
			if(err)
				console.log(err);
			else {
				//console.log(result);
				if(result.length == 0)
					return false;
				else return true;
			}
		});
		return user;
	}
	catch(err) {console.log('connect to DB failed.');return true;}
}

exports.logIn = async function(condition) {
	try {
		let user_exist = await exports.findByUsername(condition.username);
		console.log(user_exist[0]);
		if(user_exist.length >= 1 && user_exist[0].password == condition.password) {
			return 'none';
		} else if(user_exist.length >= 1 && user_exist[0].password != condition.password) {
			return 'PASSWORD_ERR';
		} else {
			return 'USER_ERR';
		}
	} catch(err) {
		console.log(err);
	}
}