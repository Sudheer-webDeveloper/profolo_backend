const express = require("express");
const cors = require("cors");
const { getDocs, addDoc, updateDoc, deleteDoc, doc } = require("firebase/firestore/lite"); // Import Firestore functions
const { Post } = require("./config"); // Import Post collection reference

const app = express();
app.use(express.json({ limit: "10mb" })); // Increase payload size limit to handle larger data
app.use(cors());

// Route to get all posts
app.get("/", async (req, res) => {
  try {
    const querySnapshot = await getDocs(Post);

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.send({ status: 200, data: data });
  } catch (error) {
    console.log(error, "in sending all posts");
    res.status(400).send({
      status: 400,
      msg: "Failed to give all posts",
      error: error.message,
    });
  }
});

// Route to create a new post
app.post("/create", async (req, res) => {
  try {
    const data = req.body;
    const docRef = await addDoc(Post, data); // Use addDoc to add a new document to Firestore
    res.send({ status: 200, msg: "Post Added Successfully", id: docRef.id });
  } catch (error) {
    console.log("Error adding post:", error);
    res
      .status(400)
      .send({ status: 400, msg: "Failed to add post", error: error.message });
  }
});

// Route to update an existing post
app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const postDoc = doc(Post, id);
    await updateDoc(postDoc, data); 
    res.send({ status: 200, msg: "Post updated successfully" });
  } catch (error) {
    console.log("Error updating post:", error);
    res.status(400).send({ status: 400, msg: "Failed to update post", error: error.message });
  }
});

// Route to delete a post
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const postDoc = doc(Post, id); // Get reference to the specific document
    await deleteDoc(postDoc); // Delete the document
    res.send({ status: 200, msg: "Post deleted successfully" });
  } catch (error) {
    console.log("Error deleting post:", error);
    res.status(400).send({ status: 400, msg: "Failed to delete post", error: error.message });
  }
});

app.listen(8080, () => console.log("Server running on port 8080")); 
