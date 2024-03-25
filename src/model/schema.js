import mongoose from "./index.js";

const mentorSchema = new mongoose.Schema({
    name: String,
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
  });
  
  const studentSchema = new mongoose.Schema({
    name: String,
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' }
  });
  
export const Mentor = mongoose.model('Mentor', mentorSchema);
export const Student = mongoose.model('Student', studentSchema);