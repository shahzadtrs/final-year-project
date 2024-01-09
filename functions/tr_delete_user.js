exports = async function({user}) {
    
      // Create a custom user data document for the user
      const mdb = context.services.get("mongodb-atlas");
      const usersCollection = mdb.db("FYP-Backend").collection("users");
    
       const deletedUser = await usersCollection.deleteOne({ uuid: user.id })


};