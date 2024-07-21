exports = async function(influencers){
  console.log(JSON.stringify(influencers));
  
  // Define the MongoDB service name, database name, and collection name
  var serviceName = "mongodb-atlas";
  var dbName = "FYP-Backend";
  var collName = "influencers";
  
  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);
  
  // Create an array of bulk operations
  const bulkOperations = influencers.map(influencer => ({
    updateOne: {
      filter: { title: influencer.title },
      update: { $set: influencer },
      upsert: true
    }
  }));
  
  try {
    // Perform bulkWrite operation
    const result = await collection.bulkWrite(bulkOperations);
    return result;
  } catch (err) {
    console.error("Failed to insert or update documents", err);
    return { error: err.toString() };
  }
};
