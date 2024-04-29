import React, { useState, useEffect } from "react";
import Apis, { endpoints } from "../../../configs/Apis";
import { Button, Form, Table } from "react-bootstrap";
import moment from "moment";

function CurrentUserPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState([]);

  const loadCurrentUser = async () => {
    try {
      setLoading(true);
      let res = await Apis.get(endpoints["current-user"]);
      setUserList([res.data]); // Chỉ set thông tin của người dùng hiện tại
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCurrentUser();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Thông tin người dùng</h1>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              {/* <th>#</th> */}
              <th>Ảnh đại diện</th>
              <th>Họ và tên đệm</th>
              <th>Tên</th>
              <th>Tài khoản/Số điện thoại</th>
              <th>Ngày sinh</th>
              <th>Giới tính</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(userList).map((u, index) => {
              const dateTimeString = u.birthday;
              const formattedDate = moment(dateTimeString).format("DD-MM-YYYY");
              return (
                <tr key={u.userId}>
                  {/* Các cột thông tin của người dùng hiện tại */}
                  <td>
                    <div
                      style={{
                        width: "90px",
                        height: "90px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={u.avatar}
                        alt="avatar"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "45px",
                        }}
                      />
                    </div>
                  </td>
                  <td>{u.lastname}</td>
                  <td>{u.firstname}</td>
                  <td>{u.username}</td>
                  <td>{formattedDate}</td>
                  <td>{u.gender === true ? "Nam" : "Nữ"}</td>
                  <td>{u.email}</td>
                  <td>{u.roleId.roleName}</td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default CurrentUserPage;
