require('dotenv').config()
  
 export const WEB_SERVER_SETTINGS = {
    PORT:process.env.PORT || 4000,
   
}
export  const MAILGUN = {
    DOMAIN:"sandbox68319bc8077e4c75b22e1560235a7157.mailgun.org",
    API_KEY:"58044988af59a383f338f96f767ccc24-20ebde82-7def717d"

}

// module.exports = {
//     WEB_SERVER_SETTINGS
// }
