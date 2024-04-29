import React, { useState, useEffect } from "react";
import { Form, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import moment from 'moment';
import Apis, { endpoints } from "../../../configs/Apis";
import Pagination from "../../util/Pagination";

const AllService = () => {
    const [selectedPage, setSelectedPage] = useState('1');
    const [searchTitle, setSearchTitle] = useState('');
    const [serviceList, setServiceList] = useState([]);
    const [totalPages, setTotalPages] = useState('1');
    const [loading, setLoading] = useState(false);

    const nav = useNavigate();

    const loadService = async (pageNumber = 1) => {
        try {
            setLoading(true);
            const res = await Apis.get(`${endpoints['search-services']}?pageNumber=${pageNumber - 1}&title=${searchTitle}`);
            setServiceList(res.data.content);
            setTotalPages(res.data.totalPages);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadService();
    }, []);

    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    const handlePageChange = (pageNumber) => {
        setSelectedPage(pageNumber);
        loadService(pageNumber);
    };

    const handleOptionClick = () => {
        nav('/admin/addservice');
    };

    return (
        <>
            <div>
                <div>
                    <div className="Add_Service">
                        <button onClick={handleOptionClick}><HiPlus /> Tạo dịch vụ mới</button>
                    </div>
                    <div className="Service_Search_Group">
                        <div className="Service_Search_Input">
                            <Form.Control
                                defaultValue={searchTitle}
                                name="searchTitle"
                                type="text"
                                onChange={(e) => setSearchTitle(e.target.value)}
                                placeholder="Nhập tiêu đề dịch vụ..."
                            />
                        </div>
                        <button className="Service_Search_Butt" onClick={loadService}>Tìm kiếm</button>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Tiêu đề</th>
                                <th>Mô tả</th>
                                <th>Ngày tạo</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {serviceList.map(service => (
                                <tr key={service.serviceId}>
                                    <td>{service.name}</td>
                                    <td>{service.type}</td>
                                    <td>{moment(service.startDate).format('DD-MM-YYYY')}</td>
                                    <td>
                                        <button
                                            variant="success"
                                            onClick={() => nav(`/admin/updateservice/${service.serviceId}`)}
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

export default AllService;
