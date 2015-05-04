var router = require('express').Router();
var statisticsService = require('../services/statisticsService');

router.get('/general', function(req, res){
	statisticsService.getUsersStats(function(response){
		console.log(response);
		res.send(response);
	})
});

module.exports = router;