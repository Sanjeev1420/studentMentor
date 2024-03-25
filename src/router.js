import express from 'express'
import Controller from "./controller.js"

const router = express.Router()
router.post('/create_mentor' , Controller.createMentor)
router.post('/create_student' , Controller.createStudent)
router.post('/assign_student_to_mentor' , Controller.assignStudentToMentor)
router.post('/assign_or_change_mentor' , Controller.assignOrChangeMentor)
router.get('/list_students_for_mentor' , Controller.listStudentsForMentor )
router.get('/previous_mentor_for_student' , Controller.previousMentorForStudent )

export default router;

