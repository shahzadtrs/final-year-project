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

    // Convert the 'followers' field to a number and sort the brands
    brands.forEach(brand => {
      brand.followers = parseInt(brand.followers.replace(/,/g, ''), 10);
    });
    
    // Sort by number of followers in descending order
    brands.sort((a, b) => b.followers - a.followers);
    
    // Get the top 5 brands
    const top5Brands = brands.slice(0, 5);
    
    return top5Brands;
  } catch (err) {
    console.error("Failed to retrieve documents", err);
    return { error: err.toString() };
  }
};
