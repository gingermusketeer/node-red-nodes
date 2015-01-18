var messageBuilder = require("../lib/message_builder");
var moment = require("moment");
var expect = require("chai").expect;

describe("messageBuilder", function(){
    var currentTime = moment("2015-01-18T08:00:00.000Z");
    var lat = -43.5320544;
    var lon = 172.6362254;
    var startPhase = "sunrise";
    var endPhase = "sunset";

    it("sets the topic", function(){
        var msg = messageBuilder(currentTime, startPhase, endPhase, lat, lon);

        expect(msg.topic).to.eql("sun");
    });

    it("sets the payload to 1 when the current time is between the start and end", function(){
        var msg = messageBuilder(currentTime, startPhase, endPhase, lat, lon);

        expect(msg.payload).to.eql(1);
    });

    it("sets the payload to 0 when the current time is not between the start and end", function(){
        var currentTime = moment('2015-01-18T10:00:00.000Z');
        var msg = messageBuilder(currentTime, startPhase, endPhase, lat, lon);

        expect(msg.payload).to.eql(0);
    });

    it("returns the moon fraction rounded to 2 decimal places", function(){
        var msg = messageBuilder(currentTime, startPhase, endPhase, lat, lon);

        expect(msg.moon).to.eql(0.07);
    });
})
