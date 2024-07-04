import { MongoClient, ServerApiVersion, Db } from "mongodb";

const { MONGO_URI, DB_NAME } = process.env;
console.log(MONGO_URI, DB_NAME);


/**
 * @param strDbName in case scaling for microservice pass db name from micro services
 * @returns {Promise<{ db: Db; client: MongoClient }> }
 * 
*/
export default async function createMongoConnect(
  strDbName = ""
  ): Promise<{ db: Db; client: MongoClient }> {
    try {
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(MONGO_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const db = client.db(strDbName ?? DB_NAME);
    return { db, client }; //close client after query
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}
