import { drizzle } from 'drizzle-orm/mysql2'
import mysql from "mysql2/promise";

// const poolConnection = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node-complete",
//   password: "1ORACLEJJS!",
// });
// export const db = drizzle(poolConnection);

// Singleton function to ensure only one db instance is created
function singleton<Value>(name: string, value: () => Value): Value {
  const globalAny: any = global;
  globalAny.__singletons = globalAny.__singletons || {};
  
  if (!globalAny.__singletons[name]) {
    globalAny.__singletons[name] = value();
  }
  
  return globalAny.__singletons[name];
}

// Function to create the database connection and apply migrations if needed
function createDatabaseConnection() {
 const poolConnection = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-complete",
  password: "1ORACLEJJS!",
});
  return drizzle(poolConnection);
}

export const db = singleton('db', createDatabaseConnection);
