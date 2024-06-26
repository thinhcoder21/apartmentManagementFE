import React, { useState, useEffect } from "react";
import { Form, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import moment from 'moment';
import Apis, { endpoints } from "../../../configs/Apis";
import Pagination from "../../util/Pagination";
import './body.css'

const AllSurvey = () => {
    const [selectedPage, setSelectedPage] = useState('1');
    const [searchTitle, setSearchTitle] = useState('');
    const [surveyList, setSurveyList] = useState([]);
    const [totalPages, setTotalPages] = useState('1');
    const [loading, setLoading] = useState(false);

    const nav = useNavigate();

    const loadSurvey = async (pageNumber = 1) => {
        try {
            setLoading(true);
            const res = await Apis.get(`${endpoints['search-surveys']}?pageNumber=${pageNumber - 1}&title=${searchTitle}`);
            setSurveyList(res.data.content);
            setTotalPages(res.data.totalPages);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadSurvey();
    }, []);

    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    const handlePageChange = (pageNumber) => {
        setSelectedPage(pageNumber);
        loadSurvey(pageNumber);
    };

    const handleOptionClick = () => {
        nav('/addsurvey');
    };

    return (
        <>
            <div>
                <div>
                    <div className="Add_Survey">
                        <button onClick={handleOptionClick}><HiPlus /> Tạo khảo sát mới</button>
                    </div>
                    <div className="Survey_Search_Group">
                        <div className="Survey_Search_Input">
                            <Form.Control
                                defaultValue={searchTitle}
                                name="searchTitle"
                                type="text"
                                onChange={(e) => setSearchTitle(e.target.value)}
                                placeholder="Nhập tiêu đề khảo sát..."
                            />
                        </div>
                        <button className="Survey_Search_Butt" onClick={loadSurvey}>Tìm kiếm</button>
                    </div>
                    <Table striped bordered hover className="data-table">
                        <thead>
                            <tr>
                                <th>Tiêu đề</th>
                                <th>Mô tả</th>
                                <th>Ngày tạo</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {surveyList.map(survey => (
                                <tr key={survey.surveyId}>
                                    <td>{survey.title}</td>
                                    <td>{survey.description}</td>
                                    <td>{moment(survey.createdAt).format('DD-MM-YYYY')}</td>
                                    <td>
                                        <button
                                            variant="success"
                                            onClick={() => nav(`/admin/updatesurvey/${survey.surveyId}`)}
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

export default AllSurvey;
