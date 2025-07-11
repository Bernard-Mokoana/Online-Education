import { course } from "../model/course.js";

const createCourse = async (req, res) => {
  const { title, category, description, price } = req.body;

  if (!title || !category || !description || !price) {
    return res.status(401).json({ message: "All fields are required" });
  }

  try {
    const Course = await course.findOne(title);
    res.status(401).json({ message: "Course already exists", course: Course });

    const newCourse = await course.create({
      title,
      category,
      description,
      price,
      tutor: req.user._id,
    });

    return res
      .status(201)
      .json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to create a course", error: error.message });
  }
};

const getCourse = async (req, res) => {
  try {
    const courses = await course
      .find({ isPublished: true })
      .populate("tutor", "firstName", "lastName");
    return res.status(200).json({ message: "courses fetched successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch courses", error: error.message });
  }
};

const getCourseById = async (req, res) => {
  const { courseId } = req.params._id;

  try {
    const courses = await course
      .findById(courseId)
      .populate("tutor", "firstName", "lastName");

    if (!courses) {
      return res.status(404).json({ message: "courses not found" });
    }

    return res
      .status(200)
      .json({ message: "Courses found successfully", courses });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch course", error: error.message });
  }
};

const updateCourse = async (req, res) => {
  const { courseId } = req.params.id;
  const { title, category, description, price, isPublished } = req.body;

  try {
    const courses = await course.findById(courseId);

    if (!courses) return res.status(404).json({ message: "Courses not found" });

    if (!courses.tutor.equals(req.user._id)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    course.title = title ?? course.title;
    course.category = category ?? course.category;
    course.description = description ?? course.description;
    course.price = price ?? course.price;
    course.isPublished = isPublished ?? course.isPublished;

    const update = await course.save();
    return res
      .status(201)
      .json({ message: "Updated successfully", course: update });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to update", error: error.message });
  }
};

const deleteCourse = async (req, res) => {
  const { courseId } = req.params.id;

  try {
    const Course = await course.findById(courseId);
    if (!Course) return res.status(404).json({ message: "Course not found" });

    if (!course.tutor.equals(req.user._id)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await course.deleteOne();
    return res.status(201).json({ message: "Course deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete the course" });
  }
};

export { createCourse, getCourse, getCourseById, updateCourse, deleteCourse };
