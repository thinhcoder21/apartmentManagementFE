import { Avatar } from "@mui/material";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import * as classes from "../../../utils/styles";
import DetailUser from "../detailUser/detailUser";
import ImageUpload from "../../util/img/ImageUpload";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import ReactPaginate from "react-paginate";
import Select from "@mui/material/Select";
import Swal from "sweetalert2";
import {
  deleteUser,
  getUserUnit,
  updateUser,
} from "../../../redux/actions/adminActions";
import {
  DELETE_USER,
  SET_ERRORS,
  UPDATE_USER,
} from "../../../redux/actionTypes";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
  },
};

const Body = () => {
  const dispatch = useDispatch();
  const [unit, setUnit] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [inputType, setInputType] = useState("text");
  const units = useSelector((state) => state.admin.allUnit);

  // paging
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [nextPage, setNextPage] = useState(0);
  const itemsPerPage = 12;
  const store = useSelector((state) => state);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  useEffect(() => {
    if (!unit) dispatch({ type: "RESET_USERS" });
  }, [unit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError({});
    dispatch(getUserUnit(nextPage, itemsPerPage));
  };

  const users = useSelector((state) => state.admin.users.retObj);
  users?.sort((a, b) => a.maUs.localeCompare(b.maUs));
  const dataPagine = useSelector((state) => state.admin.user);

  useEffect(() => {
    if (!units) return;
    if (!unit) return;
    dispatch(getUserUnit( nextPage, itemsPerPage));
  }, [nextPage, units]);

  useEffect(() => {
    if (users?.length !== 0 || users?.length === 0) {
      setLoading(false);
    }
  }, [users]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  //Begin edit
  const [selectedUser, setSelectedUser] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState({
    id: "",
    maSv: "",
    ho: "",
    ten: "",
    phai: "",
    ngaySinh: "",
    noiSinh: "",
    diaChi: "",
    trangThai: null,
    sdt: "",
    email: "",
    hinhAnh: "",
  });

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleUploadSuccess = (url) => {
    setValue(() => ({
      ...value,
      hinhAnh: url,
    }));
  };

  const handleUploadError = () => {
    toast.error("load image error!");
  };
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    setModalMode("edit");
    setValue({
      id: user.id,
      maSv: user.maUs,
      ho: "",
      ten: "",
      phai: "",
      ngaySinh: "",
      noiSinh: "",
      diaChi: "",
      trangThai: user.trangThai,
      sdt: "",
      email: user.email,
      hinhAnh: "",
    });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedValue = {};

    if (value.ho !== "") {
      updatedValue.ho = value.ho;
    } else {
      updatedValue.ho = selectedUser.ho;
    }
    if (value.ten !== "") {
      updatedValue.ten = value.ten;
    } else {
      updatedValue.ten = selectedUser.ten;
    }
    if (value.phai !== "") {
      updatedValue.phai = value.phai;
    } else {
      updatedValue.phai = selectedUser.phai;
    }
    if (value.ngaySinh !== "") {
      updatedValue.ngaySinh = value.ngaySinh;
    } else {
      updatedValue.ngaySinh = selectedUser.ngaySinh;
    }
    if (value.noiSinh !== "") {
      updatedValue.noiSinh = value.noiSinh;
    } else {
      updatedValue.noiSinh = selectedUser.noiSinh;
    }
    if (value.diaChi !== "") {
      updatedValue.diaChi = value.diaChi;
    } else {
      updatedValue.diaChi = selectedUser.diaChi;
    }
    if (value.sdt !== "") {
      updatedValue.sdt = value.sdt;
    } else {
      updatedValue.sdt = selectedUser.sdt;
    }
    if (value.hinhAnh !== "") {
      updatedValue.hinhAnh = value.hinhAnh;
    } else {
      updatedValue.hinhAnh = selectedUser.hinhAnh;
    }

    dispatch(updateUser({ ...selectedUser, ...updatedValue }));
    dispatch({ type: UPDATE_USER, payload: false });
  };

  useEffect(() => {
    if (!store.admin.updatedUser) return;
    setError({});
    closeModal();
    dispatch(getUserUnit(selectedUser, nextPage, itemsPerPage));
  }, [dispatch, store.admin.updatedUser]);
  const handleModalError = () => {
    setError({});
    closeModal();
  };

  // End Edit

  // Begin view
  const [modalMode, setModalMode] = useState(null);
  const handleOpenViewModal = (user) => {
    setSelectedUser(user);
    setModalMode("view");
    setIsModalOpen(true);
  };
  // End view

  // Begin delete
  const [checkedValue, setCheckedValue] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    setCheckedValue((prevState) =>
      isChecked
        ? [...prevState, value]
        : prevState.filter((item) => item !== value)
    );
  };

  const dltSubject = (e) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(checkedValue));
      }
    });
  };

  useEffect(() => {
    if (store.admin.userDeleted) {
      setCheckedValue([]);
      dispatch({ type: DELETE_USER, payload: false });
    }
  }, [store.admin.userDeleted]);

  useEffect(() => {
    if (!store.errors) return;
    dispatch(getUserUnit(nextPage, itemsPerPage));
  }, [store.errors]);

  // End Delete

  //Paging
  useEffect(() => {
    if (!dataPagine || !dataPagine.totalPages) return;
    setPageCount(Math.ceil(dataPagine.totalRetObjs / itemsPerPage));
  }, [dataPagine, itemOffset]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % dataPagine.totalRetObjs;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1 - 1);
  };

  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <div className="flex mt-4">
        <Link to="/admin/adduser" className="btn btn-primary">
          <button
            className="items-center gap-[9px] mr-4 w-[88px] h-[53px] hover:bg-[#04605E] block py-2 font-bold text-white rounded-lg px-4 
           bg-[#157572] focus:outline-none focus:shadow-outline "
          >
            Thêm
          </button>
        </Link>

        {users && (
          <button
            onClick={dltSubject}
            className={
              "items-center gap-[9px] mr-4 w-[88px] h-[53px] block py-2 font-bold text-[#7D1711] bg-[#FDD1D1] border border: 1.11647px solid #FD9999 rounded-lg px-4" +
              (checkedValue && checkedValue.length
                ? " hover:bg-[#FD9999] focus:#FD9999 focus:shadow-outline"
                : "")
            }
            disabled={!(users && checkedValue?.length > 0)}
          >
            Xóa
          </button>
        )}
      </div>

      {/* modal edit */}

      {modalMode === "edit" && (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={openModal}
          style={modalStyles}
          ariaHideApp={false}
        >
          <div className={classes.Form1}>
            <form className={classes.Form2} onSubmit={handleFormSubmit}>
              {/* item */}
              <div className={classes.FormItem}>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Mã Người dùng:</h1>
                  <input
                    placeholder={selectedUser.maUs}
                    disabled
                    className={classes.InputStyle}
                    type="text"
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}> Họ:</h1>
                  <input
                    placeholder={selectedUser.ho}
                    className={classes.InputStyle}
                    type="text"
                    value={value.ho}
                    onChange={(e) => setValue({ ...value, ho: e.target.value })}
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Tên :</h1>
                  <input
                    placeholder={selectedUser.ten}
                    className={classes.InputStyle}
                    type="text"
                    value={value.ten}
                    onChange={(e) =>
                      setValue({ ...value, ten: e.target.value })
                    }
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Giới tính :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.phai || selectedUser.phai}
                    onChange={(e) =>
                      setValue({ ...value, phai: e.target.value })
                    }
                    className={classes.InputStyle}
                  >
                    <MenuItem value="Nam">Nam</MenuItem>
                    <MenuItem value="Nữ">Nữ</MenuItem>
                  </Select>
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Ngày Sinh :</h1>

                  <input
                    placeholder={format(
                      new Date(selectedUser.ngaySinh),
                      "MM/dd/yyyy"
                    )}
                    className={classes.InputStyle}
                    type={inputType}
                    value={value.ngaySinh}
                    onChange={(e) =>
                      setValue({ ...value, ngaySinh: e.target.value })
                    }
                    onFocus={() => setInputType("date")}
                    onBlur={() => setInputType("text")}
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Nơi Sinh :</h1>
                  <input
                    placeholder={selectedUser.noiSinh}
                    className={classes.InputStyle}
                    type="text"
                    value={value.noiSinh}
                    onChange={(e) =>
                      setValue({ ...value, noiSinh: e.target.value })
                    }
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Địa Chỉ :</h1>
                  <input
                    placeholder={selectedUser.diaChi}
                    className={classes.InputStyle}
                    type="text"
                    value={value.diaChi}
                    onChange={(e) =>
                      setValue({ ...value, diaChi: e.target.value })
                    }
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Số Điện thoại :</h1>
                  <input
                    placeholder={selectedUser.sdt}
                    className={classes.InputStyle}
                    type="text"
                    value={value.sdt}
                    onChange={(e) =>
                      setValue({ ...value, sdt: e.target.value })
                    }
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Email :</h1>
                  <input
                    placeholder={selectedUser.email}
                    disabled
                    className={classes.InputStyle}
                    type="text"
                  />
                </div>
              </div>

              <div className="flex items-center gap-x-6">
                <div className="w-[180px] h-[180px] bg-[#DDDEEE] bg-opacity-50 rounded-full">
                  <Avatar
                    src={value.hinhAnh || selectedUser.hinhAnh}
                    style={{ width: 180, height: 180 }}
                  />
                </div>

                <div className="flex flex-col gap-y-5">
                  <h1 className="pb-2 text-sm font-medium text-left">
                    Hình ảnh sinh viên:
                  </h1>
                  <ImageUpload
                    onUploadSuccess={handleUploadSuccess}
                    onUploadError={handleUploadError}
                  />
                </div>
              </div>

              {/* buton */}
              <div className={classes.WrapButton}>
                <button className={classes.adminFormSubmitButton} type="submit">
                  Lưu
                </button>
                <Link to="/admin/user" className="btn btn-primary">
                  <button
                    className={classes.adminFormClearButton}
                    type="button"
                    onClick={() => handleModalError()}
                  >
                    Hủy
                  </button>
                </Link>
              </div>
              <div className="mt-5">
                {error?.message ? (
                  <p className="text-red-500">{error?.message}</p>
                ) : null}
              </div>
            </form>
          </div>
        </ReactModal>
      )}

      {/* pagination */}
      {users?.length > 0 && (
        <div className="flex items-center justify-center w-full mt-2 mb-1">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            className="pagination"
          />
        </div>
      )}
    </div>
  );
};

export default Body;