import { enrollment } from "../model/enrollment.js";
import { course } from "../model/course.js";
import { Transaction } from "mongodb";

export const getPopularCourses = async (req, res) => {
  try {
    const results = await enrollment.aggregate([
      {
        $group: {
          _id: "$course",
          totalEnrolled: { $sum: 1 },
        },
      },
      { $sort: { totalEnrolled: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "course",
          localField: "_id",
          foreignField: "_id",
          as: "courseDetails",
        },
      },
      { $unwind: "$courseDetails" },
      {
        $project: {
          _id: 0,
          courseId: "$courseDetails._id",
          title: "$courseDetails.title",
          category: "$courseDetails.category",
          totalEnrolled: 1,
        },
      },
    ]);

    return res
      .status(200)
      .json({ message: "courses fetched successfully", results });
  } catch (error) {
    return res.status.json({ message: "Error fetching popular courses" });
  }
};

export const getTutorEarnings = async (req, res) => {
  try {
    const tutorId = req.user.id;

    const result = await Transaction.aggregate([
      { $match: { status: "success" } },
      {
        $lookup: {
          from: "courses",
          localFiled: "course",
          foreignField: "_id",
          as: "courseDetails",
        },
      },
      { $unwind: "$courseDetails" },
      { $match: { "courseDetails.tutor": tutorId } },
      {
        $group: {
          _id: "$course",
          totalEarnings: { $sum: "$amount" },
          title: { $first: "$courseDetails.title" },
        },
      },
      { $sort: { totalEarnings: -1 } },
    ]);

    return res
      .status(200)
      .json({ message: "Total earnings fetched successfully", result });
  } catch (error) {
    return res.status.json({ message: "Error fetching earnings" });
  }
};

export const getStudentProgress = async (req, res) => {
  try {
    const studentId = req.user._id;

    const result = await enrollment.aggregate([
      { $match: { student: studentId } },
      {
        $lookup: {
          from: "courses",
          localField: "course",
          foreignField: "_id",
          as: "courseDetails",
        },
      },
      { $unwind: "$courseDetails" },
      {
        $project: {
          _id: 0,
          courseId: "$courseDetails._id",
          title: "$courseDetails.title",
          progress: 1,
          isComplete: 1,
        },
      },
    ]);

    return res
      .status(200)
      .json({ message: "Student progress fetched", result });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching student progress summary" });
  }
};
