import { useEffect, useState } from "react";
import Apis, { endpoints } from "../../../configs/Apis";
import './body.css';

const AdminInvoicesPage = () => {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        const loadInvoices = async () => {
            try {
                const response = await Apis.get(endpoints['load-invoices']);
                setInvoices(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        loadInvoices();
    }, []);

    return (
        <div>
            <h1>Quản lý hóa đơn</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên người dùng</th>
                        <th>Dịch vụ</th>
                        <th>Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map(invoice => (
                        <tr key={invoice.id}>
                            <td>{invoice.id}</td>
                            <td>{invoice.User.name}</td>
                            <td>{invoice.Service.name}</td>
                            <td>{invoice.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminInvoicesPage;
