"use client";

import { useState } from "react";
import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import axios from "axios";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <StudentManagement />
    </QueryClientProvider>
  );
}

function StudentManagement() {
  const [selectedStudent, setSelectedStudent] = useState("학생1");
  const [newStudentInfo, setNewStudentInfo] = useState({
    grade: "",
    name: "",
    gender: "",
  });
  const [courses, setCourses] = useState([
    { id: 1, name: "과목1" },
    { id: 2, name: "과목2" },
    { id: 3, name: "과목3" },
  ]);

  const {
    data: students,
    isLoading,
    isError,
  } = useQuery("students", fetchStudents);

  const addStudentMutation = useMutation(addStudent);
  const deleteStudentMutation = useMutation(deleteStudent);

  const handleStudentChange = () => {
    setSelectedStudent(selectedStudent === "학생1" ? "학생2" : "학생1");
  };

  const handleCourseRegistration = (courseId) => {
    // 수강신청 로직 구현
    console.log(`수강신청 완료 - 학생: ${selectedStudent}, 과목: ${courseId}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudentInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleAddStudent = async () => {
    try {
      await addStudentMutation.mutateAsync(newStudentInfo);
      setNewStudentInfo({ grade: "", name: "", gender: "" }); // 입력값 초기화
    } catch (error) {
      console.error("학생 추가 오류:", error);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await deleteStudentMutation.mutateAsync(studentId);
    } catch (error) {
      console.error("학생 삭제 오류:", error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-400 to-pink-500 min-h-screen flex flex-col justify-center items-center">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-white mb-6">수강신청 페이지</h1>

        {/* 학생 전환 버튼 */}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mb-4"
          onClick={handleStudentChange}
        >
          {`학생 전환 (${selectedStudent})`}
        </button>

        {/* 학생 추가 폼 */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 w-full md:w-3/4 lg:w-2/4">
          <h2 className="text-xl font-bold mb-4">새 학생 추가</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={newStudentInfo.name}
              onChange={handleInputChange}
              placeholder="이름"
              className="border text-black border-gray-300 px-4 py-2 rounded-md"
            />
            <input
              type="text"
              name="grade"
              value={newStudentInfo.grade}
              onChange={handleInputChange}
              placeholder="학년"
              className="border text-black border-gray-300 px-4 py-2 rounded-md"
            />
            <input
              type="text"
              name="gender"
              value={newStudentInfo.gender}
              onChange={handleInputChange}
              placeholder="성별"
              className="border text-black border-gray-300 px-4 py-2 rounded-md"
            />
            <button
              onClick={handleAddStudent}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md col-span-2"
            >
              추가
            </button>
          </div>
        </div>

        {/* 학생 정보 */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 w-full md:w-3/4 lg:w-2/4">
          <h2 className="text-xl font-bold mb-4">{selectedStudent} 정보</h2>

          {/* 과목 목록 */}
          <h3 className="text-lg font-bold mb-2">수강신청할 과목</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => (
              <li
                key={course.id}
                className="bg-gray-200 p-4 rounded-md hover:shadow-xl transition duration-300"
              >
                <h4 className="text-lg font-semibold">{course.name}</h4>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md mt-2"
                  onClick={() => handleCourseRegistration(course.id)}
                >
                  수강신청
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 학생 리스트 */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-3/4 lg:w-2/4">
          <h2 className="text-xl font-bold mb-4">학생 리스트</h2>
          <ul>
            {students &&
              students.map((student) => (
                <li
                  key={student.id}
                  className="flex justify-between items-center border-b border-gray-300 py-2"
                >
                  <span>{student.name}</span>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                    onClick={() => handleDeleteStudent(student.id)}
                  >
                    삭제
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

async function fetchStudents() {
  const response = await axios.get("http://localhost:8080/api/student");
  return response.data;
}

async function addStudent(newStudent) {
  const response = await axios.post(
    "http://localhost:8080/api/student",
    newStudent
  );
  return response.data;
}

async function deleteStudent(studentId) {
  const response = await axios.delete(
    `http://localhost:8080/api/student/${studentId}`
  );
  return response.data;
}
