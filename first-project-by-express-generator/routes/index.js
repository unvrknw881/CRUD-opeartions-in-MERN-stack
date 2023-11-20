var express = require('express');
const { exists } = require('./dbsetup');
var router = express.Router();
var usrModel = require('./dbsetup');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// CRUD
router.post('/create', async function(req, res){
const usr = await usrModel.create({
    UserName: 'siva',
    age: 22,
    Name: 'reddy'
  });
  // console.log(`User Model/Collection created ! ${usr}`);
  res.send(usr);
});

router.get("/readall", async function(req, res){
  const readAll = await usrModel.find();
  res.send(readAll);
})

router.get('/readone', async function(req, res){
  const readOne = await usrModel.findOne({ UserName: 'siva'});
  res.send(readOne);
})



router.get('/deleteuser', async function(req, res){
  const deleteUsr = await usrModel.findOneAndDelete({UserName: 'siva'});
  res.send(deleteUsr);
})

router.put('/updateuser', async (req, res) => {

  let usrDataById = await usrModel.findById(req.query.id);
   
    usrDataById.UserName = req.body.UserName;

   await usrDataById.save();


  res.json({
    success: true,
    message: "updated"
  });
})



// session

router.get('/session', function(req, res){
  // req.session.anyValue = "siva";
     req.session.ban = true;

     console.log(req.session);
      res.send('prohibited');
});

router.get('/checkban', (req, res) => {
      if(req.session.ban){
        res.send("user banned!");
      }
      else 
      res.send("user not banned!");
});

router.get('/removeban', (req, res) => {
  if(req.session.ban){
  req.session.destroy((err) => {if(err) throw err;}); 
  res.send('ban removed!')
}
  else
  res.send('u were not banned!');
});


// cookie

router.get('/setcookie', (req, res) => {

    res.cookie('userName', 'siva');
    res.send('Cookie value has been set!');

});

router.get('/readcookie', (req, res) => {

    // res.send(req.cookies);
    console.log(req.cookies.userName);
       res.send(req.cookies.userName);
       
});

router.get('/clearcookie', (req, res) => {
  res.clearCookie('userName');
  res.send('cookie cleared');
})




module.exports = router;
