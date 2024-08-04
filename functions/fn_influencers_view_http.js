exports = async function(req, res) {
  // Define the MongoDB service name, database name, and collection name
  const serviceName = "mongodb-atlas";
  const dbName = "FYP-Backend";
  const collName = "influencers";
  
  // Get a collection from the context
  const collection = context.services.get(serviceName).db(dbName).collection(collName);
  
  try {
    // Find all documents in the collection
    const influencers = await collection.find({}).toArray();
    console.log(`Found ${influencers.length} influencers`);

    // Send the list of influencers as the response
    res.setStatusCode(200);
    res.setHeader("Content-Type", "application/json");
    res.setBody(JSON.stringify(influencers));
  } catch (err) {
    console.error("Failed to retrieve documents", err);
    
    // Send an error response
    res.setStatusCode(500); // Internal Server Error
    res.setHeader("Content-Type", "application/json");
    res.setBody(JSON.stringify({ error: err.toString() }));
  }
};
