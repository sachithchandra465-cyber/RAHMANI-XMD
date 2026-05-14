const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUJKZm81QVNLcmpBSk0wS05xT1NXUWVxaVBtejRvQXd5OWV5ekFyb3luaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaDhZTkRHaVFUQ0x1aWFNM2xSTExCMWJwVzdoWFdSOVVZd2oxLzZlUDBVVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxQ1RYT1g2R0VCaEQ3akRnL2xNTVFMNklaL2JaQVZCV2NUYkhDZWh6QVc0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ6Q2JjTzdONDhhY0pDQWVEdFZnUXFLM245THZOMnovd2dMcC93dDAxRVVzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklCUC9jYmtmdmhHK1pGd0ZLbVZubU1KNHJFK25sTUtJczlBR0xPRW9SWEE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklWYzdmNkcvZHlwUmtiQXFRaXQ1eS8xQTZtejNWa0RHWWI0S052WDNOZ289In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0xVekZGN3I3Y2hNNGVsMWExK0xidDQvbWxiWDRpTlRCUlJBOUV3d0tHST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaHFERzIrMnJnOEtwR2dGb0NTd2xKejJCRCtCTE5kSDJJN0w4SUE4MzlHMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFYK3ZYMFNua082RGhkT1lPdWNHc3RwKzg2eFJibm1LR1A2MGszMmNuVEJZbkVlUWF1SjNmaUpIQzhDQ1JOVjRibkxFZ2FBTFhWcUs5UlF1T21OVGhRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODksImFkdlNlY3JldEtleSI6IjB4UC9COU04RDVsVU50WmZCR3dSYUNRU1V0N2c2dlJickFCS0N3Q1FUSFE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTQ3NjAyMjAwNTJAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQUNEREU1NTcxN0QxMUNEMThGNjUxNUQ0MzFFQTQzQjIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc3ODc2MzQxMH0seyJrZXkiOnsicmVtb3RlSmlkIjoiOTQ3NjAyMjAwNTJAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQUNDODBGRkU1RDZEMkQzRENFRkM1Q0VBRUM0NDY0RDUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc3ODc2MzQxNH0seyJrZXkiOnsicmVtb3RlSmlkIjoiOTQ3NjAyMjAwNTJAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQUNERjZBRTZFMzVBNjlFMDExN0FCQTkwMEYzRTZENzcifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc3ODc2MzQ0MH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiNmUtcF9TNi1SWkdHcFo4djM0SVlkQSIsInBob25lSWQiOiI0NjU5MTFmOC1mNmY1LTRhZDctOWM1Yi0zMWI3YzI1YmYwM2UiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiblU5UitPQ3Mzb0FlbnJQNTRPbllvYUhGT3ZjPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik4ranNLckpHRWpHbjQ1MkdTNHdEcWc1WHhLST0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJCQlFYOVpTSCIsIm1lIjp7ImlkIjoiOTQ3NjAyMjAwNTI6MzJAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiI0MTI4ODIwODQ5ODg5ODozMkBsaWQiLCJuYW1lIjoic2FjaGl0aCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSnZybWJVR0VQbU1sOUFHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiOEVDaDM3T3k1YUVPK1l0ZHM3THU3UlBhSUE4VE0yMEdBYUtkYnI4dml6OD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiNWcxSjB2dVhYRHpxZ2p0Q1locTVpVHNpQWljZ0c1N1Y3cllCekw5a2NLd05wa0FrME9TNzRRL2EvSVpRakNTVUJMNUNka1hkQ0hDeGtpcytYc1M4RFE9PSIsImRldmljZVNpZ25hdHVyZSI6IkkyckRIUkpDWkljVW02ak5lNU1IRVJMdUpYcVVIanF2UlhOclBLaWlGdGMvQ21HOStSNmlNY3FqUlBtRGN5Z2Q2Nzk4SmNjejQ5L3VhWkxWNEFuK2lBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTQ3NjAyMjAwNTI6MzJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZkJBb2QrenN1V2hEdm1MWGJPeTd1MFQyaUFQRXpOdEJnR2luVzYvTDRzLyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FrSUJRZ1MifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzc4NzYzNDAxLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUxUcCJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "",
    NUMERO_OWNER: process.env.NUMERO_OWNER || " ",
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT: process.env.BOT_NAME || 'BMW_MD',
    URL: process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY: process.env.HEROKU_APY_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    ETAT: process.env.PRESENCE || '',
    DP: process.env.STARTING_BOT_MESSAGE || "yes",
    GEMINI_KEY: process.env.GEMINI_KEY || "AIzaSyDrYfq1NMRljtz3ukHM74rUVhI9KPqnQU8",
    ANTIDELETE1: process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL: process.env.ANTICALL || 'no',
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ: process.env.AUTO_READ || 'yes',
    CHATBOT: process.env.CHATBOT || "yes",
    AUTO_BIO: process.env.AUTO_BIO || "yes",
    AUTO_REACT: process.env.AUTO_REACT || "",
    PM_CHATBOT: process.env.PM_CHATBOT || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway"
        : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
