exports = async function(checkboxList){
    // Get the MongoDB Atlas service
    const mdb = context.services.get("mongodb-atlas");
    const usersCollection = mdb.db("FYP-Backend").collection("users");

    // Find the current user by their UUID
    const currentUser = await usersCollection.findOne({ uuid: context.user.id });

    // Update the user's role using the value from checkboxList[0]
    const updateCurrentUser = await usersCollection.updateOne(
        { uuid: context.user.id }, // Filter to find the correct user
        { $set: { role: checkboxList } } // Update the role field
    );

    return updateCurrentUser; // Optionally return the result of the update operation
};
