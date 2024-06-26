import React, { useState, useEffect } from "react";
import { Form, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import Apis, { endpoints } from "../../../configs/Apis";
import Pagination from "../../util/Pagination";
import "./body.css"
const AllFee = () => {
    const [selectedPage, setSelectedPage] = useState('1');
    const [searchTitle, setSearchTitle] = useState('');
    const [feeList, setFeeList] = useState([]);
    const [totalPages, setTotalPages] = useState('1');
    const [loading, setLoading] = useState(false);

    const nav = useNavigate();

    const loadFee = async (pageNumber = 1) => {
        try {
            setLoading(true);
            const res = await Apis.get(`${endpoints['search-Fees']}?pageNumber=${pageNumber - 1}&title=${searchTitle}`);
            setFeeList(res.data.content);
            setTotalPages(res.data.totalPages);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadFee();
    }, []);

    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    const handlePageChange = (pageNumber) => {
        setSelectedPage(pageNumber);
        loadFee(pageNumber);
    };

    const handleOptionClick = () => {
        nav('/addFee');
    };

    return (
        <>
            <div>
                <div>
                    <div className="Add_Fee">
                        <button onClick={handleOptionClick}><HiPlus /> Tạo phí mới</button>
                    </div>
                    <div className="Fee_Search_Group">
                        <div className="Fee_Search_Input">
                            <Form.Control
                                defaultValue={searchTitle}
                                name="searchTitle"
                                type="text"
                                onChange={(e) => setSearchTitle(e.target.value)}
                                placeholder="Nhập tên phí..."
                            />
                        </div>
                        <button className="Fee_Search_Butt" onClick={loadFee}>Tìm kiếm</button>
                    </div>
                    <Table striped bordered hover className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên</th>
                                <th>Mô tả</th>
                                <th>Gía</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feeList.map(Fee => (
                                <tr key={Fee.FeeId}>
                                    <td>{Fee.name}</td>
                                    <td>{Fee.description}</td>
                                    <td>{Fee.price}</td>
                                    <td>{Fee.active}</td>
                                    <td>
                                        <button
                                            variant="success"
                                            onClick={() => nav(`/admin/updateFee/${Fee.FeeId}`)}
                                        >
                                            Cập nhật
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Pagination
                        pages={pages}
                        selectedPage={selectedPage}
                        handlePageChange={handlePageChange}
                    />
                </div>
            </div>
        </>
    );
};

export default AllFee;
