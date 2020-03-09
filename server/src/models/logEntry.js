const mongoose = require('mongoose');
const { Schema } = mongoose;

const requiredString = {
    type:String,
    required: true
};

const requiredDate = {
    type: Date,
    default: Date.now,
    required: true,
};

const requiredNumber = {
    type:Number,
    required: true,
};

const logEntrySchema = new Schema({
    title: requiredString,
    description: String,
    comments : String,
    image : String,
    rating : {
        type:Number,
        min: 1,
        max:10,
        default:1,
    },
    startDate : requiredDate,
    endDate : {
        type: Date,
    },
    latitude : {
        ...requiredNumber,
        min:-90,
        max:90
    },
    longitud : {
        ...requiredNumber,
        min:-180,
        max:180
    },
    
},{
    timestamps: true
});

const LogEntry = mongoose.model('LogEntry', logEntrySchema);

module.exports =  LogEntry;