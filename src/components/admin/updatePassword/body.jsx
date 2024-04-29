import { Form, InputGroup } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { MyUserContext } from "../../../App";
import { authApi, endpoints } from "../../../configs/Apis";
import { toast } from "react-toastify";
import cookie from "react-cookies";
import { useNavigate } from "react-router-dom";
import { Key, Lock, Visibility, VisibilityOff } from "@mui/icons-material";


function ChangePasswordPage() {
  const [current_user] = useContext(MyUserContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const nav = useNavigate();

  const passwordChange = (evt) => {
    const process = async () => {
      try {
        console.log(currentPassword, newPassword);
        let res = await authApi().post(endpoints["change-password"], {
          username: current_user?.username,
          currentPassword: currentPassword,
          newPassword: newPassword,
        });

        if (res.data === "Đổi mật khẩu thành công!") {
          toast.success("Đổi mật khẩu thành công!");
          nav("/");
          console.log(res.data);
        }
      } catch (error) {
        if (error.request.responseText === "Người dùng không tồn tại!") {
          toast.error(error.request.responseText);
          console.log(error.request.responseText);
        } else if (
          error.request.responseText ===
          "Mật khẩu hiện tại và mật khẩu cũ không khớp!"
        ) {
          toast.error(error.request.responseText);
          console.log(error.request.responseText);
        } else {
          toast.error(error.request.responseText);
          console.log(error.request.responseText);
        }
      }
    };
    if (newPassword === confirmPassword) process();
    else {
      toast.error("Mật khẩu KHÔNG khớp!");
    }
  };
  useEffect(() => {
    let client = cookie.load("socket");
    console.log("Client", client?.connected);
    if (current_user && client) {
      cookie.remove("socket");
    }
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Đổi mật khẩu</h1>
      <Form onSubmit={(e) => passwordChange(e)}>
        <InputGroup className="mb-3">
          <InputGroup.Text>
            <Lock />
          </InputGroup.Text>
          <Form.Control
            placeholder="Password"
            aria-label="Password"
            aria-describedby="basic-addon1"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </InputGroup>
        <div className="Separate"></div>
        <InputGroup className="mb-3">
          <InputGroup.Text>
            <Key />
          </InputGroup.Text>
          <Form.Control
            placeholder="New Password"
            aria-label="New Password"
            aria-describedby="basic-addon1"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </InputGroup>
        <div className="Separate"></div>
        <InputGroup className="mb-3">
          <InputGroup.Text>
            <Key />
          </InputGroup.Text>
          <Form.Control
            placeholder="Confirm Password"
            aria-label="Confirm Password"
            aria-describedby="basic-addon1"
            required
            value={setConfirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </InputGroup>
          <button type="submit" className="ChangePassword_Butt">
            Lưu thay đổi
          </button>
      </Form>
    </div>
  );
}

export default ChangePasswordPage;
