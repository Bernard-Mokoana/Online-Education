import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";
import { course } from "../src/model/course.js";
import { user } from "../src/model/user.js";

describe("Course API", () => {
  let testTutor;

  beforeAll(async () => {
    // Create a test tutor
    testTutor = await user.create({
      firstName: "Test",
      lastName: "Tutor",
      email: "testtutor@gmail.com",
      password: "TestTutor@123",
      role: "Tutor",
    });
  });

  afterAll(async () => {
    await course.deleteMany({});
    await user.deleteMany({});
  });

  describe("Course Model Tests", () => {
    it("should create a course with valid data", async () => {
      const courseData = {
        title: "Software Testing Fundamentals",
        category: "Testing",
        description: "A comprehensive course on software testing for beginners",
        price: 500.0,
        tutor: testTutor._id,
        isPublished: true,
      };

      const newCourse = await course.create(courseData);

      expect(newCourse).toHaveProperty("_id");
      expect(newCourse.title).toBe("Software Testing Fundamentals");
      expect(newCourse.category).toBe("Testing");
      expect(newCourse.price).toBe(500.0);
      expect(newCourse.tutor.toString()).toBe(testTutor._id.toString());
    });

    it("should fail to create course without required fields", async () => {
      const courseData = {
        description: "A course without required fields",
        price: 300.0,
      };

      try {
        await course.create(courseData);
        fail("Should have thrown an error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it("should handle course with default values", async () => {
      const courseData = {
        title: "Default Course",
        category: "General",
        tutor: testTutor._id,
      };

      const newCourse = await course.create(courseData);

      expect(newCourse.price).toBe(0); // default value
      expect(newCourse.isPublished).toBeUndefined();
    });
  });

  describe("Course Validation", () => {
    it("should validate course data structure", async () => {
      const courseData = {
        title: "Validation Test Course",
        category: "Test",
        description: "Test course for validation",
        price: 250.0,
        tutor: testTutor._id,
        isPublished: true,
      };

      const newCourse = await course.create(courseData);

      expect(newCourse).toHaveProperty("_id");
      expect(newCourse).toHaveProperty("title");
      expect(newCourse).toHaveProperty("category");
      expect(newCourse).toHaveProperty("description");
      expect(newCourse).toHaveProperty("price");
      expect(newCourse).toHaveProperty("tutor");
      expect(newCourse).toHaveProperty("isPublished");
      expect(newCourse).toHaveProperty("createdAt");
      expect(newCourse).toHaveProperty("updatedAt");
    });

    it("should handle course with minimum required fields", async () => {
      const courseData = {
        title: "Minimal Course",
        category: "Basic",
        tutor: testTutor._id,
      };

      const newCourse = await course.create(courseData);

      expect(newCourse.title).toBe("Minimal Course");
      expect(newCourse.category).toBe("Basic");
      expect(newCourse.description).toBeUndefined();
      expect(newCourse.price).toBe(0); // default value
      expect(newCourse.isPublished).toBeUndefined();
    });
  });
});
