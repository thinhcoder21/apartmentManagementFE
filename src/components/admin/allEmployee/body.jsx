import { HiPlus } from "react-icons/hi";
import Pagination from "../../util/Pagination";
import { Button, Form, Table } from "react-bootstrap";
import moment from "moment";
import { useEffect, useState } from "react";
import Apis, { endpoints } from "../../../configs/Apis";
import { useNavigate } from "react-router-dom";
import './body.css'

const AllEmployee = () => {
  const [selectedPage, setSelectedPage] = useState("1");
  const [searchRole, setSearchRole] = useState(null);
  const [searchFirstname, setSearchFirstname] = useState(null);
  const [searchLastname, setSearchLastname] = useState(null);
  const [roles, setRoles] = useState([]);
  const [employeeList, setemployeeList] = useState([]);
  const [totalPages, setTotalPages] = useState("1");

  const nav = useNavigate();

  const [loading, setLoading] = useState(false);

  const loadEmployee = async () => {
    try {
      setLoading(true);
      let res = await Apis.get(endpoints["search-employees"]);
      setemployeeList(res.data.content);
      setTotalPages(res.data.totalPages);
      setLoading(false);
      console.log(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const loadEmployeePage = async (pageNumber) => {
    try {
      setLoading(true);
      // let e = endpoints['search-employees'];
      let e = `${endpoints["search-employees"]}`;
      // let pageNumber = document.getElementsByClassName("active").id;
      console.log(pageNumber);
      if (pageNumber !== null && !isNaN(pageNumber)) {
        e += `?pageNumber=${pageNumber - 1}&`;
      } else {
        e += `?`;
      }
      let firstname = searchFirstname;
      let lastname = searchLastname;
      let roleId = searchRole;
      if (firstname !== null) e += `firstname=${firstname}&`;
      if (lastname !== null) e += `lastname=${lastname}&`;
      if (roleId !== null && roleId !== "TẤT CẢ ROLE") e += `roleId=${roleId}`;
      // let url = `/employees/${pageNumber}`
      console.log(e);
      let res = await Apis.get(e);
      setemployeeList(res.data.content);
      // setUrlemployee(e);
      setTotalPages(res.data.totalPages);
      console.log(res.data.totalPages);
      console.log(e);
      // navigate(url);
      setLoading(false);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadEmployeePage();
    loadEmployee();
  }, []);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const handlePageChange = (pageNumber) => {
    // TODO: Xử lý sự kiện khi người dùng chuyển trang
    setSelectedPage(pageNumber);
    loadEmployeePage(pageNumber);
    console.log(`Chuyển đến trang ${pageNumber}`);
  };

  useEffect(() => {
    const loadRole = async () => {
      try {
        let res = await Apis.get(endpoints["roles"]);
        setRoles(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadRole();
  }, []);

  const handleOptionClick = (option) => {
    if (option === "addemployee") {
      nav("/admin/addemployee");
    }
  };

  return (
    <>
      <div>
        <div>
          <div className="Add_employee">
            <button onClick={() => handleOptionClick("addemployee")}>
              <HiPlus /> Thêm 1 nhân viên mới
            </button>
          </div>
          <div className="employee_Search_Group">
            <div className="employee_Search_Input">
              <Form.Control
                className="employee_Search_Lastname"
                defaultValue={searchLastname}
                name="searchFirstname"
                type="Text"
                onChange={(e) => setSearchLastname(e.target.value)}
                placeholder="Nhập họ và tên đệm..."
              />
              <Form.Control
                className="employee_Search_Firstname"
                defaultValue={searchFirstname}
                name="searchLastname"
                type="Text"
                onChange={(e) => setSearchFirstname(e.target.value)}
                placeholder="Nhập tên..."
              />
              <Form.Select
                className="employee_Search_Role"
                value={searchRole}
                name="searchRole"
                onChange={(e) => setSearchRole(e.target.value)}
              >
                <option value={null}>TẤT CẢ ROLE</option>
                {Object.values(roles).map((r) => (
                  <option key={r.roleId} value={r.roleId}>
                    {r.roleName}
                  </option>
                ))}
              </Form.Select>
            </div>
            <button className="employee_Search_Butt" onClick={loadEmployeePage}>
              Tìm kiếm
            </button>
          </div>
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
              {Object.values(employeeList).map((u, index) => {
                let url = `/admin/updateemployee/${u.employeeId}`;
                const dateTimeString = u.birthday;
                const formattedDate =
                  moment(dateTimeString).format("DD-MM-YYYY");
                return (
                  <>
                    <tr key={u.employeeId}>
                      {/* <td>{index + 1}</td> */}
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
                      <td>{u.employeename}</td>
                      <td>{formattedDate}</td>
                      <td>{u.gender === true ? "Nam" : "Nữ"}</td>
                      <td>{u.email}</td>
                      <td>{u.roleId.roleName}</td>
                      <td>
                        <Button
                          variant="success"
                          onClick={(e) => {
                            // handleOptionClickAndUpdateemployee(e, u.employeeId)
                            nav(url);
                          }}
                        >
                          Cập nhật
                        </Button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </Table>
          {/* <div className="Page_Nav">
                                {pages.map((page) => (
                                    <button id={`${page}`} key={page} onClick={() => handlePageChange(page)}
                                        className={page === selectedPage ? 'active' : ''}>
                                        {page}
                                    </button>
                                ))}
                            </div> */}
          <Pagination
            pages={pages}
            selectedPage={selectedPage}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
      {/* <Listemployee handleOptionClick={handleOptionClick} /> */}
    </>
  );
};

export default AllEmployee;
