"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
axios_1.default.defaults.baseURL = 'http://localhost:5000/api';
var responseBody = function (response) { return response.data; };
var requests = {
    get: function (url) { return axios_1.default.get(url).then(responseBody); },
    post: function (url, body) { return axios_1.default.post(url, body).then(responseBody); }
};
var Portfolio = {
    result: function () { return requests.get('/Portfolio'); }
};
var Investments = {
    list: function () { return requests.get('/Portfolio/Investments'); }
};
var Projection = {
    result: function (payload) { return requests.post('/Projection', payload); }
};
var agent = {
    Portfolio: Portfolio,
    Investments: Investments,
    Projection: Projection
};
exports.default = agent;
//# sourceMappingURL=agent.js.map