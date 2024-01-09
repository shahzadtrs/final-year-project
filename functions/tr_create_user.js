
exports = async function (arg) {
    // MongoDB connection variables
    const user = arg.user;

    try {
        // Create a custom user data document for the user
        const mdb = context.services.get("mongodb-atlas");
        const usersCollection = mdb.db("FYP-Backend").collection("users");
        const obj = {
            uuid: user.id,
            email: user.data.email
        }

        // if it is a new user then insert a document
        const res = await usersCollection.insertOne(obj);
        if (res) {
            return { status: 200, message: "Document inserted successfully." };
        }
        else {
            return { status: 200, message: "Document not inserted." };
        }

    } catch (e) {
        console.error(`Failed to create custom user data document for user:${e}`);
        throw e;
    }
};
