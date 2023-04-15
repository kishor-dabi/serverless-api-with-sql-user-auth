
require('dotenv').config();

module.exports = {
  development: {
    // username: 'postgres',
    // password: "root",
    // database: 'database_development',
    // host: '127.0.0.1',
    // dialect: 'postgres',
    username: process.env.DB_USERNAME,//'vootkidsdev',
    password: process.env.DB_PASSOWRD,//"VkD3v!23",
    database: process.env.DATABASE,//'vootkids_stg',
    // host: 'vootkids-nonprod.ckfzae7ccjlf.ap-south-1.rds.amazonaws.com',
    host: process.env.DB_HOST,//'vootkids-nonprod.czlqhbm4w8ju.ap-southeast-1.rds.amazonaws.com',
    dialect: 'mysql',
    // use_env_variable: 'postgres://postgres:root@127.0.0.1:5432/database_development',
  }
  
};