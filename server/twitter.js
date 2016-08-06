var router = require('express').Router();

router.post('/test', function(req, res) {
	console.log(req.body);
	res.send({msg: 'test'});
})

module.exports = router;
