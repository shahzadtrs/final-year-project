exports = async function(req, res) {
  // Define the MongoDB service name, database name, and collection name
  const serviceName = "mongodb-atlas";
  const dbName = "FYP-Backend";
  const collName = "brands";
  
  // Get a collection from the context
  const collection = context.services.get(serviceName).db(dbName).collection(collName);
  
  try {
    // Find all documents in the collection
    const brands = await collection.find({}).toArray();
    console.log(`Found ${brands.length} brands`);

    // Convert the 'followers' field to a number and sort the brands
    brands.forEach(brand => {
      brand.followers = parseInt(brand.followers.replace(/,/g, ''), 10);
    });
    
    // Sort by number of followers in descending order
    brands.sort((a, b) => b.followers - a.followers);
    
    // Get the top 5 brands
    const top5Brands = brands.slice(0, 5);
    
    // Send the top 5 brands as the response
    res.setStatusCode(200);
    res.setHeader("Content-Type", "application/json");
    res.setBody(JSON.stringify(top5Brands));
  } catch (err) {
    console.error("Failed to retrieve documents", err);
    res.setStatusCode(500);
    res.setHeader("Content-Type", "application/json");
    res.setBody(JSON.stringify({ error: err.toString() }));
  }
};
