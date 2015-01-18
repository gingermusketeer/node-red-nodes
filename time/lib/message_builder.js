var SunCalc = require("suncalc")
var moment = require("moment")

module.exports = function buildMessage(currentMoment, startPhase, endPhase, lat, lon) {
    var currentDate = currentMoment.toDate();
    var times = SunCalc.getTimes(currentDate, lat, lon);
    var moonFraction = SunCalc.getMoonIllumination(currentDate).fraction;
    var startMoment = moment(times[startPhase]);
    var endMoment = moment(times[endPhase]);

    var payload = currentMoment.isBetween(startMoment, endMoment) ? 1 : 0;

    return {
        payload: payload,
        topic: "sun",
        moon: Math.round(moonFraction * 100)/100
    };
};
