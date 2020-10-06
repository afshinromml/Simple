const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({

	name:{
		type:String,
		required:true
    },
    faxNumber:{
        type:Number,
       required:true
    },
    firma:{
    type:String,
	required: true,
	unique:true
},
// bachNumber:{
// 	type:Number
// },
	email:{
		type:String,
		required: true,
		unique:true
	},
	password:{
		type:String,
		required:true
	},
	avatar:{
		type:String
	},
	date:{
		type:Date,
		default:Date.now
	}
});
module.exports = User = mongoose.model('user',UserSchema);
