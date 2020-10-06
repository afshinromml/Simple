const mongoose = require('mongoose');
const SamplesSchema = new mongoose.Schema({
	admin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Admin'
      },
      user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User' 
      },
	product:{
		type:String,
		required:true
    },
    bachNumber:{
        type:Number,
       required:true
    },
    lotNumber:{
    type:String,
	required: true,
	unique:true
},
CPercent:{
    type:Number,
    required: true
},
MnPercent:{
    type:Number,
		required: true,
	 
	},
	Spercent:{
        type:Number,
		required:true
	},
	Ppercent:{
        type:Number,
        required:true
	},
	UTS:{
        type:Number,
        required:true
    },
    Yield:{
        type:Number,
        required:true    
    },
    Elongation:{
        type:Number,
        required:true    
    },
    Impact :{
        type:Number,
        required:true    
    }
});
module.exports = Samples = mongoose.model('sample',SamplesSchema);
