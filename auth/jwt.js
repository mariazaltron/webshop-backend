const jwt = require("jsonwebtoken");

const secret =
  "dfauivbsduhfb yuabe fhswufhsduiafhdsuih4f6sd4f68dsfds4866584686";

function toJwt(data) {
  return jwt.sign(data, secret, { expiresIn: "2h" });
}

function toData(token) {
  return jwt.verify(token, secret);
}

module.exports = { toData, toJwt };
