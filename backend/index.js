require("dotenv").config();
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const config = require("./config.json");

mongoose.connect(config.connectionString);

const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

const User = require("./models/user.model");
const Note = require("./models/notes.model");
const Group = require("./models/group.model");
const Feedback = require("./models/feedback");

const port = 8080;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.listen(port, () => {
  console.log(`Server Working fine at ${port}`);
});

app.get("/", (req, res) => {
  res.json({ data: "Hello" });
});

//create account
app.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ error: true, message: "Full Name is required" });
  }
  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }
  const isUser = await User.findOne({ email: email });
  if (isUser) {
    return res
      .status(400)
      .json({ error: true, message: "User Already exists" });
  }
  const user = new User({
    name,
    email,
    password,
  });
  await user.save();
  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 3600,
  });
  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration Successful",
  });
});

// Login
app.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  if (!email)
    return res.status(400).json({ error: true, message: "Email is required" });
  if (!password)
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });

  const userInfo = await User.findOne({ email: email });

  if (!userInfo)
    return res.status(400).json({ error: true, message: "User not found" });
  if (userInfo.email == email && userInfo.password == password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "3600m",
    });

    return res.json({
      error: false,
      email,
      accessToken,
      message: "Login Successfull Successful",
    });
  } else {
    return res
      .status(400)
      .json({ error: true, message: "Invalid Credentials" });
  }
});

//get User

app.get("/getUser", authenticateToken, async (req, res) => {
  const { user } = req.user;
  const isUser = await User.findOne({ _id: user._id });
  if (!isUser) return res.sendStatus(401);
  return res.json({
    user: {
      name: isUser.name,
      email: isUser.email,
      _id: isUser._id,
      createdOn: isUser.createdOn,
    },
    message: "",
  });
});

//add notes
app.post("/add", authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;

  if (!title)
    return res.status(400).json({ error: true, message: "Title is required" });
  if (!content)
    return res
      .status(400)
      .json({ error: true, message: "Content is required" });

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });
    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note added Succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

app.put("/edit/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags, isPinned } = req.body;
  const { user } = req.user;
  if (!title && !content && !tags) {
    return res
      .status(400)
      .json({ error: true, message: "No changes provided" });
  }
  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note)
      return res.status(404).json({ error: true, message: "Note not found" });
    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned) note.isPinned = isPinned;
    await note.save();
    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

//getall

app.get("/getAll/", authenticateToken, async (req, res) => {
  const { user } = req.user;

  try {
    const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });
    return res.json({
      error: false,
      notes,
      message: "All notes retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

//delete note

app.delete("/delete/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { user } = req.user;
  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note)
      return res.status(404).json({ error: true, message: "Note not found" });
    await Note.deleteOne({ _id: noteId, userId: user._id });
    return res.json({
      error: false,
      message: "Note deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

//handling isPinned

app.put("/pin/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { isPinned } = req.body;
  const { user } = req.user;
  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }
    note.isPinned = isPinned;
    await note.save();
    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

//search API

app.get("/search", authenticateToken, async (req, res) => {
  const { user } = req.user;
  const { query } = req.query;

  if (!query)
    return res
      .status(400)
      .json({ error: true, message: "Search query is required" });
  try {
    const matchingNotes = await Note.find({
      userId: user._id,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
        { tags: { $regex: new RegExp(query, "i") } },
      ],
    });
    return res.json({
      error: false,
      notes: matchingNotes,
      message: "Notes Retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Could not Fetch the Data",
    });
  }
});

//Api to create new group
app.post("/createGroup", authenticateToken, async (req,res) => {
  const { name } = req.body;
  const { user } = req.user;
  console.log(user);

  if(!name) return res.status(400).json({ message: "Group name  is required"});

  try{
    const group = new Group({
      name,
      members : [user._id],
      createdBy : user._id,
    });

    await group.save();

    return res.json({
      message: "Group created succesfully",
      group,
    });
  }catch(err){
    return res.json({ message: "Internal server error"});
  }
});

//Api to create new note in group
app.post("/groups/:groupId/notes", authenticateToken, async (req, res) => {
  const { groupId } = req.params;
  const { title, content, tags } = req.body;
  const { user } = req.user;

  
  if (!title || !content) return res.status(400).json({ message: "Title and content are required" });

  try {
    
    const group = await Group.findById(groupId);
    if (!group) return res.status(400).json({ message: "Group Not Found" });

    const note = {
      title,
      content,
      tags: tags || [],
      createdBy: user._id,
      createdAt: new Date(),
      updatesAt: new Date(),
      lastUpdatesBy: user.name,
    };

    group.notes.push(note);
    await group.save();

    return res.json({
      message: "Note added successfully",
      note,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});


//Api to delete note from group
app.delete("/groups/:groupId/notes/:noteId", authenticateToken, async (req, res) => {
  const { groupId, noteId } = req.params;
  const { user } = req.user;

  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const noteIndex = group.notes.findIndex((note) => note._id.toString() === noteId);
    if (noteIndex === -1) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (group.notes[noteIndex].createdBy.toString() !== user._id.toString()) {
      return res.status(403).json({ message: "Only the creator can delete this note" });
    }

    group.notes.splice(noteIndex, 1);

    await group.save();

    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error during note deletion:", error);
    return res.status(500).json({ message: "Internal Server error" });
  }
});



//Edit Api for note in group
app.put("/groups/:groupId/notes/:noteId", authenticateToken, async (req,res)=> {
  const { groupId, noteId } = req.params;
  const { title, content, tags } = req.body;
  const { user } = req.user;

  try{
    const group = await Group.findById(groupId);
    if(!group) return res.status(404).json({ message: "Group not found" });

    const note = group.notes.id(noteId);
    if(!note) return res.status(404).json({ message: "Note not found" });

    if(title) note.title = title;
    if(content) note.content = content;
    if(tags) note.tags = tags;

    note.updatesAt = new Date();
    note.lastUpdatesBy = user.name;

    await group.save();

    return res.json({ message: "Note updated succesfully" });
  }catch(err){
    return res.status(500).json({ message: "Internal Server error" });
  }
});

//Api to search users from database
app.get("/searchUsers", authenticateToken, async (req, res)=>{
  const { query } = req.query;
  const  { user } = req.user;

  if(!query) return res.status(400).json({ message: "Search query is empty"});

  try{
    const users = await User.find({
      name: { $regex: query, $options: "i"},
      _id: { $ne: user._id },
    })

    return res.json({ 
      message: "Users found",
      users,
    })

  }catch(err){
    return res.status(500).json({ message: "Internal Server error" });
  }

});

//Api to add members in group
app.post("/groups/:groupId/addMember", authenticateToken, async (req,res)=>{
    const { groupId } = req.params;
    const { userId } = req.body;
    const { user } = req.user;

    console.log(req.params);

    if(!user) return res.status(404).json({ message: "User id is required" });

    try{
      const group = await Group.findById(groupId);
      if(!group) return res.status(404).json({ message : "Group not found" });

      if(group.members.includes(userId)){
        return res.status(400).json({
          message: "User already added"
        });
      }

      group.members.push(userId);
      await group.save();

      return res.json({ message: "Member added succesfully" });

    }catch(err){
      return res.status(500).json({ message: "Internal server error" });
    }
});

//To get all groups
app.get("/groups", authenticateToken, async (req, res)=>{
  const { user } = req.user;
  try{
    const groups = await Group.find({ members: user._id});


    return res.json({ message: "Groups fetched succesfully",
    groups,
  });
  }catch(err){
    return res.status(500).json({ message: "Internal Server error"});
  }
});

//Api to save feedback
app.post("/submitFeedback", authenticateToken, async (req,res)=>{
  const { user } = req.user;
  const { feedback, userId } = req.body;

  try{
    const newFeedback = new Feedback({
      feedbackText : feedback,
      userId: userId,
    }); 

    await newFeedback.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "businessmymemos@gmail.com",
        pass: "soyj bibt zrrh iqsd",
      },
    });

    const mailOptions = {
      from: "mymemosbusiness@gmail.com",
      to: user.email,
      subject: "Feedback Recieved - Thank You!",
      text: `Hii ${user.name || "User"}, \n\nThank You for you feedback!\n\nFeedback:"${feedback}"\n\nWe appreiciate your input and will use it to imporve our servies.\n\nBest Regards,\nTeam My-memos`
    };

    await transporter.sendMail(mailOptions);

    res.json({success: true,  message: "Feedback submitted and email sent successfully" });
  }catch(err){
    console.log(err);
    res.status(500).json({ success: false,  message: "Error submitting feedback, could be an internal Server error"});
  }
});

//Api to get all notes from a group
app.get("/NotesOfgroup/:groupId", authenticateToken, async (req,res)=>{
  const id = req.params.groupId;
  try{
    const group = await Group.findById(id);
    if(!group) res.json({ message: "Group Not Found"});

    const notes = group.notes;
    if(!notes) res.json({ message: "Notes not found" });

    res.json({ 
      message: "Notes fetched successfully",
    notes,
  })
  }catch(err){
    res.status(500).json({ message: "Internal Server error" });
  }
});

app.get("/getIndiUser/:userid", authenticateToken, async (req,res)=>{
  const id = req.params.userid;

  try{
    const response = await User.findById(id);
    console.log(response);

    res.json({ 
      message: "user fetched succesfully",
      response,
    })
  }catch(err){
    res.status(500).json({ message: "Internal Server error" });
  }
});

//Api to get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users); 
  } catch (err) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

//Api to get group members
app.get("/getMembers/:groupId" , authenticateToken, async (req,res) => {
      const { groupId } = req.params;
      try{
        const group = await Group.findById(groupId);

        if(!group) res.status(404).json({ message: "Group not found" });

        const members = group.members;
        const name = group.name;
        res.json({
          message: "Members Fetched sucessfully",
          members,
          name,
        })
      }catch(err){
        res.status(500).json({ message: "Ineternal Server error" });
      }
});

//Get group member details
app.get("/members/:id", async (req, res) => {
  try {
    const member = await User.findById(req.params.id);
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch member details" });
  }
});


//Api to remove member from the group
app.delete('/removeMember/:groupId/:memberId', async (req, res) => {
  const { groupId, memberId } = req.params;

  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    if (!group.members.includes(memberId)) {
      return res.status(404).json({ message: 'Member not found in the group' });
    }

    group.members = group.members.filter(member => member !== memberId);

    await group.save();

    res.status(200).json({ message: 'Member removed successfully', group });
  } catch (error) {
    console.error('Error removing member:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//Api to delete group
app.delete('/deleteGroup/:id', async (req, res) => {
  try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: 'Invalid group ID' });
      }

      const result = await Group.deleteOne({ _id: id });

      if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'Group not found' });
      }

      res.status(200).json({ message: 'Group deleted successfully' });
  } catch (error) {
      console.error('Error deleting group:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
  }
});

//Api to pin notes for group
app.put("/group/pin/:groupId/:noteId", authenticateToken, async (req, res) => {
  const groupId = req.params.groupId;
  const noteId = req.params.noteId;
  const { isPinned } = req.body;

  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: true, message: "Group not found" });
    }

    const note = group.notes.find((n) => n._id.toString() === noteId);
    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    note.isPinned = isPinned;
    await group.save();

    return res.json({
      error: false,
      group,
      message: "Note updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

app.post("/api/users", async (req, res) => {
  const { ids } = req.body;
  const users = await User.find({ _id: { $in: ids } }).select("_id name");
  res.json(users);
});




module.exports = app;
