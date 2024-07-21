exports = async function() {
  // Define the MongoDB service name, database name, and collection name
  var serviceName = "mongodb-atlas";
  var dbName = "FYP-Backend";
  var collName = "influencers";
  
  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);
  
  try {
    // Find all documents in the collection
    const influencers = await collection.find({}).toArray();
    console.log(`Found ${influencers.length} influencers`);

    // Convert the 'followers' field to a number and sort the influencers
    influencers.forEach(influencer => {
      influencer.followers = parseInt(influencer.followers.replace(/,/g, ''), 10);
    });
    
    // Sort by number of followers in descending order
    influencers.sort((a, b) => b.followers - a.followers);
    
    // Get the top 5 influencers
    const top5Influencers = influencers.slice(0, 5);
    
    return top5Influencers;
  } catch (err) {
    console.error("Failed to retrieve documents", err);
    return { error: err.toString() };
  }
};
