import { enrollment } from "../model/enrollment.js";
import { lessons } from "../model/lessons.js";

export const enrollInCourse = async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    const Lesson = await lessons.find({ course: courseId });
    Lesson.map((lesson) => ({
      lesson: lesson._id,
      completed: false,
    }));

    const Enrollment = await enrollment.create({
      user: userId,
      course: courseId,
      progress,
    });

    return res
      .status(201)
      .json({ message: "Student enrolled successfully", Enrollment });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error enrolling a student", error: error.message });
  }
};

export const getUserEnrollments = async (req, res) => {
  try {
    const Enrollment = await enrollment
      .find({ user: req.params.userId })
      .populate("course")
      .populate("progress.lesson");

    return res
      .status(200)
      .json({ message: "Fetch a student enrollments", Enrollment });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching a student enrollments" });
  }
};

export const markLessonComplete = async (req, res) => {
  const { enrollmentId, lessonId } = req.body;

  try {
    const Enrollment = await enrollment.findById(enrollmentId);
    if (!Enrollment)
      return res.status(404).json({ message: "Enrollment not found" });

    const lessonProgress = Enrollment.progress.find(
      (p) => p.lesson.toString() === lessonId
    );
    if (!lessonProgress)
      return res.status(404).json({ message: "Lesson not found in progress" });

    lessonProgress.completed = true;
    lessonProgress.completedAt = new Date();

    await Enrollment.save();
    return res
      .status(201)
      .json({ message: "Lesson marked as completed", Enrollment });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error marking lesson complete", error: error.message });
  }
};

export const deleteEnrollment = async (req, res) => {
  try {
    await enrollment.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Enrollment deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting an enrollment", error: error.message });
  }
};
