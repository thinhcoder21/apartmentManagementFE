import React, { useContext, useEffect, useState } from "react";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import cookie from "react-cookies";
import { MyUserContext } from "../../App";
import Apis, { endpoints } from "../../configs/Apis";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Body = () => {
  const [current_user] = useContext(MyUserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      const response = await Apis.get(
        endpoints["user-status"](current_user.id)
      );
      const userStatus = response.data.status;
      if (userStatus === 0) {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleAvatarChange = async () => {
    try {
      if (!avatar) {
        console.log("Vui lòng chọn avatar");
        return;
      }
      const formData = new FormData();
      formData.append("avatar", avatar);
      const response = await Apis.put(
        endpoints["update-avatar"](current_user.id),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-CSRFToken": cookie.load("csrftoken"),
          },
        }
      );
      if (response.status === 200) {
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Chào Mừng Đến Với Trang Chủ
          </h1>
        </div>
      </header>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Update Avatar Modal"
      >
        <h2>Vui Lòng Thay Đổi Avatar</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleAvatarChange}>Cập nhật Avatar</button>
        <button onClick={closeModal}>Đóng</button>
      </Modal>
    </div>
  );
};

export default Body;
