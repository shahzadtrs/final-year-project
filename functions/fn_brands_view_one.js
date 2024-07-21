exports = async function(id) {
  // Define the MongoDB service name, database name, and collection name
  var serviceName = "mongodb-atlas";
  var dbName = "FYP-Backend";
  var collName = "brands";
  
  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);
  
  try {
    // Find a single document by its ID
    const brand = await collection.findOne({ id });
    
    if (brand) {
      console.log(`Found brand with ID ${id}`);
      return brand;
    } else {
      console.log(`No brand found with ID ${id}`);
      return { error: "No brand found with the specified ID" };
    }
  } catch (err) {
    console.error("Failed to retrieve document", err);
    return { error: err.toString() };
  }
};
