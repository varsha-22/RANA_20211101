const proxy = require('http-proxy-middleware');
const { TARGET_URL }  = require('./components/Config')

module.exports = function(app) {

    app.use(proxy("/api", { target: TARGET_URL }));

};
