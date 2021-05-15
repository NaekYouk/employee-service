require("ts-node/register");

const { Index } = require("../../../server");

global.server = new Index();
global.server.start();
