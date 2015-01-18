/**
 * Copyright 2013,2014 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function(RED) {
    "use strict";
    var buildMessage = require("./lib/message_builder");
    var moment = require("moment")

    function SunNode(n) {
        RED.nodes.createNode(this,n);
        this.lat = n.lat;
        this.lon = n.lon;
        this.start = n.start;
        this.end = n.end;

        var node = this;
        var previousPayload = null;

        this.tick = setInterval(function() {
            var currentTime = moment();
            var msg = buildMessage(
                currentTime, node.start, node.end, node.lat, node.lon
            )

            if (msg.payload == 1) {
                node.status({fill:"yellow",shape:"dot",text:"day"});
            } else {
                node.status({fill:"blue",shape:"dot",text:"night"});
            }

            if (previousPayload === null) {
                previousPayload = msg.payload;
            }

            if (previousPayload !== msg.payload) {
                previousPayload = msg.payload;
                node.send([msg, msg]);
            } else {
                node.send(msg)
            }
        }, 60000);

        this.on("close", function() {
            clearInterval(this.tick);
        });
    }

    RED.nodes.registerType("sunrise",SunNode);
}
