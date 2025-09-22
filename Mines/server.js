const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const port = 3000
 

express.static(__dirname)
router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});
 
//add the router
app.use(express.static(__dirname))
app.use('/', router);
app.listen(port);
 
console.log(`mines runing http://localhost:${port}`);