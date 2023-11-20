// install mongodb database
// install mongoose for data modelling (ORM)
// require mongoose package and setup mongoose port 
// make schema or create fields that need to present in a document or row
// make model or table or collection and export that 

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/CRUDinMERN');

const userSchema = mongoose.Schema({
    UserName: String,
    Name: String,
    age: Number    
});

module.exports = mongoose.model('USERS', userSchema);