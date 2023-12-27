import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  //"/user/:id" 의 값이 "/user/123" 이면 id의 값으로 123을 받음
  const { id } = useParams(); // pathVariable 에 id값을 받기

  const Navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  const { name, username, email } = user; // 유저객의 속성을 구조할당분해

  const onInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // 수정 전 유저 데이터 가져오기
  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/users/${id}`);
    setUser(result.data);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (name == "" || username == "" || email == "") {
      alert("입력창에 내용을 입력해주세요");
      return;
    }

    // 기존 사용자 정보를 수정
    await axios.put(`http://localhost:8080/users/${id}`, user);
    // 수정 완료후 홈으로
    Navigate("/");
  };

  //페이지 시작시 유저데이터를 받아 user에 저장
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">수정 하기</h2>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                이름
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="이름 입력"
                name="name"
                value={name}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                유저네임
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="유저네임 입력"
                name="username"
                value={username}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                이메일
              </label>
              <input
                type="text"
                id="email"
                className="form-control"
                placeholder="이메일 입력"
                name="email"
                value={email}
                onChange={onInputChange}
              />
            </div>
            {/* 수정 및 취소 버튼 */}
            <div className="mb-3 text-center">
              <button
                type="submit"
                className="btn btn-outline-primary px-3 mx-2"
              >
                수정 완료
              </button>
              <Link
                to="/"
                type="submit"
                className="btn btn-outline-danger px-3 mx-2"
              >
                취소
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
