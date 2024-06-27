import React, { useContext, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { MyUserContext } from "../../../configs/Context";
import { authApi, endpoints } from "../../../configs/Apis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Key, Lock } from "@mui/icons-material";
import "./body.css"; // Import CSS file for styling

function ChangePasswordPage() {
  const [current_user] = useContext(MyUserContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const nav = useNavigate();

  const passwordChange = async (e) => {
    e.preventDefault();
    try {
      if (newPassword !== confirmPassword) {
        toast.error("Mật khẩu KHÔNG khớp!");
        return;
      }

      const res = await authApi().post(endpoints["change-password"], {
        username: current_user?.username,
        currentPassword: currentPassword,
        newPassword: newPassword,
      });

      if (res.data === "Đổi mật khẩu thành công!") {
        toast.success("Đổi mật khẩu thành công!");
        nav("/");
      }
    } catch (error) {
      if (error.request.responseText === "Người dùng không tồn tại!") {
        toast.error(error.request.responseText);
      } else if (
        error.request.responseText ===
        "Mật khẩu hiện tại và mật khẩu cũ không khớp!"
      ) {
        toast.error(error.request.responseText);
      } else {
        toast.error("Đã xảy ra lỗi khi đổi mật khẩu!");
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Đổi mật khẩu</h1>
      <Form onSubmit={passwordChange}>
        <InputGroup className="mb-3">
          <InputGroup.Text>
            <Lock />
          </InputGroup.Text>
          <Form.Control
            type="password"
            placeholder="Mật khẩu hiện tại"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>
            <Key />
          </InputGroup.Text>
          <Form.Control
            type="password"
            placeholder="Mật khẩu mới"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>
            <Key />
          </InputGroup.Text>
          <Form.Control
            type="password"
            placeholder="Xác nhận mật khẩu mới"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </InputGroup>
        <button type="submit" className="change-password-btn">
          Lưu thay đổi
        </button>
      </Form>
    </div>
  );
}

export default ChangePasswordPage;
