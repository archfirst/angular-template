module.exports = function(app) {
    var api = '/api';
    var data = '/../../data/';
    var jsonfileservice = require('./utils/jsonfileservice')();

    app.get(api + '/test-data', getTestData);

    function getTestData(req, res, next) {
        var json = jsonfileservice.getJsonFromFile(data + 'test-data.json');
        res.send(json);
    }
};
