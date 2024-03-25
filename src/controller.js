import mongoose from "mongoose";
import { Student } from "./model/schema.js";
import { Mentor } from "./model/schema.js";

const createMentor = async (req, res) => {
  try {
    await Mentor.create(req.body);
    res.status(200).send({ message: "Mentor created successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const createStudent = async (req, res) => {
  try {
    await Student.create(req.body);
    res.status(200).send({ message: "Student created successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const assignStudentToMentor = async (req, res) => {
  try {
    const { mentorId, studentIds } = req.body;
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }
    const students = await Student.find({ _id: { $in: studentIds } });
    mentor.students.push(...students);
    await mentor.save();
    await Student.updateMany(
      { _id: { $in: studentIds } },
      { mentor: mentor._id }
    );
    res
      .status(200)
      .send({ message: "Students assigned to mentor successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const assignOrChangeMentor = async (req, res) => {
  try {
    const student = await Student.findById(req.query.studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    student.mentor = req.query.mentorId;
    await student.save();
    res.status(200).send({ message: "Mentor assigned/changed for student successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const listStudentsForMentor = async (req, res) => {
    try {
        const mentorId = req.query.mentorId;
        const students = await Student.find({ mentor: mentorId });
        res.status(200).send({ students });
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
};

const previousMentorForStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.query.studentId).populate(
      "mentor"
    );
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ previous_mentor: student.mentor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createMentor,
  createStudent,
  assignStudentToMentor,
  assignOrChangeMentor,
  listStudentsForMentor,
  previousMentorForStudent,
};
