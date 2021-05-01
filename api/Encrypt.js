const crypto = require("crypto");

const encrypt =(password)=>{
  return(
    crypto
    .createHmac("sha256", "Listen to radio is wonderful ")
    .update(password) // Hashes the password
    .digest("hex") // Encoding type
    );
}

module.exports={
  encrypt
}
