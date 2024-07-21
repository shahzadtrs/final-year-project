exports = async function(brands){
  console.log(JSON.stringify(brands));
  
  // Define the MongoDB service name, database name, and collection name
  var serviceName = "mongodb-atlas";
  var dbName = "FYP-Backend";
  var collName = "brands";
  
  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);
  
  try {
    // Insert the array of brands into the collection using insertMany
    const result = await collection.insertMany(brands);
    console.log(`Inserted ${result.insertedCount} documents`);
    return result;
  } catch (err) {
    console.error("Failed to insert documents", err);
    return { error: err.toString() };
  }
};
