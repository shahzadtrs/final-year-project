exports = async function() {
  // Define the MongoDB service name, database name, and collection name
  var serviceName = "mongodb-atlas";
  var dbName = "FYP-Backend";
  var collName = "brands";
  
  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);
  
  try {
    // Find all documents in the collection
    const brands = await collection.find({}).toArray();
    console.log(`Found ${brands.length} brands`);
    return brands;
  } catch (err) {
    console.error("Failed to retrieve documents", err);
    return { error: err.toString() };
  }
};
