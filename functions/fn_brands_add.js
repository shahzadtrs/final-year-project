exports = async function(brands){
  console.log(JSON.stringify(brands));
  
  // Define the MongoDB service name, database name, and collection name
  var serviceName = "mongodb-atlas";
  var dbName = "FYP-Backend";
  var collName = "brands";
  
  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);
  
  // Create an array of bulk operations
  const bulkOperations = brands.map(brand => ({
    updateOne: {
      filter: { title: brand.title },
      update: { $set: brand },
      upsert: true
    }
  }));
  
  try {
    // Perform bulkWrite operation
    const result = await collection.bulkWrite(bulkOperations);
    console.log(`Matched ${result.matchedCount} documents and modified ${result.modifiedCount} documents`);
    console.log(`Upserted ${result.upsertedCount} documents`);
    return result;
  } catch (err) {
    console.error("Failed to insert or update documents", err);
    return { error: err.toString() };
  }
};
