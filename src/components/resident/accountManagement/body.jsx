import React, { useState, useEffect, useContext } from "react";
import { Table } from "react-bootstrap";
import moment from "moment";
import { MyUserContext } from "../../../configs/Context";
import "./body.css";

function CurrentUserPage() {
  const currentUser = useContext(MyUserContext);
  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        setLoading(true);
        // Simulating API call or fetching data from context
        const userData = [
          {
            id: currentUser.id,
            lastname: currentUser.lastname,
            firstname: currentUser.firstname,
            username: currentUser.username,
            birthday: currentUser.birthday,
            gender: currentUser.gender,
            email: currentUser.email,
            avatar: currentUser.link_image, // Assuming link_image contains the avatar URL
          },
        ];
        setUserList(userData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    loadCurrentUser();
  }, [currentUser]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Thông tin người dùng</h1>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <div className="profile-container">
          <div className="profile-avatar">
            <img src={userList[0].avatar} alt="avatar" className="avatar-img" />
          </div>
          <div className="profile-details">
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td className="profile-label">Họ và tên đệm:</td>
                  <td>{userList[0].lastname}</td>
                </tr>
                <tr>
                  <td className="profile-label">Tên:</td>
                  <td>{userList[0].firstname}</td>
                </tr>
                <tr>
                  <td className="profile-label">Tài khoản/Số điện thoại:</td>
                  <td>{userList[0].username}</td>
                </tr>
                <tr>
                  <td className="profile-label">Ngày sinh:</td>
                  <td>{moment(userList[0].birthday).format("DD-MM-YYYY")}</td>
                </tr>
                <tr>
                  <td className="profile-label">Giới tính:</td>
                  <td>{userList[0].gender === true ? "Nam" : "Nữ"}</td>
                </tr>
                <tr>
                  <td className="profile-label">Email:</td>
                  <td>{userList[0].email}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrentUserPage;
