import React, { useEffect, useState } from "react";
import axios from "axios";
import "../pages/Home.css";
import { Link } from "react-router-dom";

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // 시작시 유저들 가져오기
    getUsers();
  }, []);

  const getUsers = async () => {
    const result = await axios.get("http://localhost:8080/users");
    setUsers(result.data);
  };

  return (
    <div className="container">
      <table className="table border shadow my-4">
        <thead className="center">
          <tr>
            <th scope="col">#</th>
            <th scope="col">이름</th>
            <th scope="col">유저네임</th>
            <th scope="col">이메일</th>
            <th scope="col">액션</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button className="btn btn-outline-secondary mx-2">보기</button>
                <Link
                  to={`/edituser/${user.id}`}
                  className="btn btn-outline-warning mx-2"
                >
                  수정
                </Link>
                <button className="btn btn-outline-danger mx-2">삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Home;
