const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "usercourse",
  }]
});

const CourseModel = mongoose.model("course", courseSchema);

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
  }]
});

const UserCourseModel = mongoose.model("usercourse", userSchema);

module.exports={
    CourseModel,
    UserCourseModel
}