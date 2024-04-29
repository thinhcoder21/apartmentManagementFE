import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Apis, { endpoints } from "../../../configs/Apis";

const AddService = () => {
    const [loading, setLoading] = useState(false);
    
    const [service, setService] = useState({
        "name": "",
        "type": "",
        "startDate": "",
        "endDate": "",
        "fee": ""
    });

    const changeService = (evt, field) => {
        setService(current => {
            return { ...current, [field]: evt.target.value }
        });
    };

    const addService = async (evt) => {
        evt.preventDefault();

        try {
            let res = await Apis.post(endpoints['admin-add-service'], service);
            if (res.status === 200) {
                toast.success(res.data);
                // Reset form after successful submission
                setService({
                    "name": "",
                    "type": "",
                    "startDate": "",
                    "endDate": "",
                    "fee": ""
                });
            }
        } catch (error) {
            toast.error("Thêm dịch vụ thất bại!");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div>
                <div className="Add_Service_Header">
                    <h4 className="text-primary">Tạo dịch vụ</h4>
                </div>
                <div className="Add_Service_Body">
                    <div className="Add_Service_Name">
                        <Form.Label style={{ width: "20%" }}>Tên dịch vụ</Form.Label>
                        <Form.Control type="text" onChange={(e) => changeService(e, "name")} placeholder="Tên dịch vụ" required />
                    </div>
                    <div className="Add_Service_Type">
                        <Form.Label style={{ width: "20%" }}>Loại</Form.Label>
                        <Form.Control type="text" onChange={(e) => changeService(e, "type")} placeholder="Loại" required />
                    </div>
                    <div className="Add_Service_StartDate">
                        <Form.Label style={{ width: "20%" }}>Ngày bắt đầu</Form.Label>
                        <Form.Control type="date" onChange={(e) => changeService(e, "startDate")} required />
                    </div>
                    <div className="Add_Service_EndDate">
                        <Form.Label style={{ width: "20%" }}>Ngày kết thúc</Form.Label>
                        <Form.Control type="date" onChange={(e) => changeService(e, "endDate")} required />
                    </div>
                    <div className="Add_Service_Fee">
                        <Form.Label style={{ width: "20%" }}>Phí</Form.Label>
                        <Form.Control type="number" onChange={(e) => changeService(e, "fee")} placeholder="Phí" required />
                    </div>
                    <div className="Add_Service_Button">
                        <button type="button">Hủy</button>
                        <button type="button" onClick={(e) => addService(e)} disabled={loading}>{loading ? "Đang thêm..." : "Thêm"}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddService;
