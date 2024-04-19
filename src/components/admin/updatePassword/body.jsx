import React, { useState } from "react";

function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }

    try {
      // Gửi yêu cầu đổi mật khẩu tới server ở đây
      // await changePasswordAPI(currentPassword, newPassword);
      setSuccessMessage("Đổi mật khẩu thành công.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setError("");
    } catch (error) {
      setError("Đã xảy ra lỗi khi đổi mật khẩu.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Đổi mật khẩu</h1>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {successMessage && (
        <div className="text-green-600 mb-4">{successMessage}</div>
      )}
      <div className="flex flex-col space-y-4 max-w-md">
        <input
          type="password"
          placeholder="Mật khẩu hiện tại"
          className="border border-gray-300 p-2 rounded"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu mới"
          className="border border-gray-300 p-2 rounded"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Xác nhận mật khẩu mới"
          className="border border-gray-300 p-2 rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          onClick={handleChangePassword}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Đổi mật khẩu
        </button>
      </div>
    </div>
  );
}

export default ChangePasswordPage;
