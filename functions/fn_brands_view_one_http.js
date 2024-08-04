exports = async function(req, res) {
  

  // Parse the request body to get the ID
  const { id } = JSON.parse(req.body.text());

  // Define the MongoDB service name, database name, and collection name
  const serviceName = "mongodb-atlas";
  const dbName = "FYP-Backend";
  const collName = "brands";
  
  // Get a collection from the context
  const collection = context.services.get(serviceName).db(dbName).collection(collName);
  
  try {
    // Find a single document by its ID
    const brand = await collection.findOne({ id });
    
    if (brand) {
      console.log(`Found brand with ID ${id}`);
      res.setStatusCode(200);
      res.setHeader("Content-Type", "application/json");
      res.setBody(JSON.stringify(brand));
    } else {
      console.log(`No brand found with ID ${id}`);
      res.setStatusCode(404); // Not Found
      res.setHeader("Content-Type", "application/json");
      res.setBody(JSON.stringify({ error: "No brand found with the specified ID" }));
    }
  } catch (err) {
    console.error("Failed to retrieve document", err);
    res.setStatusCode(500); // Internal Server Error
    res.setHeader("Content-Type", "application/json");
    res.setBody(JSON.stringify({ error: err.toString() }));
  }
};
