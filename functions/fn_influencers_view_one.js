exports = async function(id) {
  // Define the MongoDB service name, database name, and collection name
  var serviceName = "mongodb-atlas";
  var dbName = "FYP-Backend";
  var collName = "influencers";
  
  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);
  
  try {
    // Find a single document by its ID
    const influencer = await collection.findOne({ id });
    
    if (influencer) {
      console.log(`Found influencer with ID ${id}`);
      return influencer;
    } else {
      console.log(`No influencer found with ID ${id}`);
      return { error: "No influencer found with the specified ID" };
    }
  } catch (err) {
    console.error("Failed to retrieve document", err);
    return { error: err.toString() };
  }
};
