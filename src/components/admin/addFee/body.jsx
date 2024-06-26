    import React, { useState } from "react";
    import { Form } from "react-bootstrap";
    import { toast } from "react-toastify";
    import Apis, { endpoints } from "../../../configs/Apis";
    import './body.css';
    
    const AddFee = () => {
        const [loading, setLoading] = useState(false);
        
        const [fee, setFee] = useState({
            "name": "",
            "description": "",
            "price": "",
            "active": ""
        });

            const changeFee = (evt, field) => {
                setFee(current => {
                    return { ...current, [field]: evt.target.value }
                });
            };

        const addFee = async (evt) => {
            evt.preventDefault();

            try {
                let res = await Apis.post(endpoints['admin-add-fee'], fee);
                if (res.status === 200) {
                    toast.success(res.data);
                    // Reset form after successful submission
                    setFee({
                        "name": "",
                        "description": "",
                        "price": "",
                        "active": ""
                    });
                }
            } catch (error) {
                toast.error("Thêm Phí thất bại!");
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        return (
            <div>
                <div>
                    <div className="Add_Fee_Header">
                        <h4 className="text-primary">Tạo Phí</h4>
                    </div>
                    <div className="Add_Fee_Body">
                        <div className="Add_Fee_Name">
                            <Form.Label style={{ width: "20%" }}>Tên Phí</Form.Label>
                            <Form.Control type="text" onChange={(e) => changeFee(e, "name")} placeholder="Tên Phí" required />
                        </div>
                        <div className="Add_Fee_Desctiption">
                            <Form.Label style={{ width: "20%" }}>Mô tả</Form.Label>
                            <Form.Control type="text" onChange={(e) => changeFee(e, "description")} placeholder="Mô tả" required />
                        </div>
                        <div className="Add_Fee_Price">
                            <Form.Label style={{ width: "20%" }}>Gía</Form.Label>
                            <Form.Control type="number" onChange={(e) => changeFee(e, "price")} placeholder="Gía" required />
                        </div>
                        <div className="Add_Fee_Active">
                            <Form.Label style={{ width: "20%" }}>Trạng thái</Form.Label>
                            <Form.Control type="number" onChange={(e) => changeFee(e, "active")} placeholder="Trạng thái" required />
                        </div>
                        <div className="Add_Fee_Button">
                            <button type="button">Hủy</button>
                            <button type="button" onClick={(e) => addFee(e)} disabled={loading}>{loading ? "Đang thêm..." : "Thêm"}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    export default AddFee;
