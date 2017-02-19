var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', (req, res) => {
	console.log(req.body.reading);
	res.render('index', { reading: req.body.reading });
});

module.exports = router;
