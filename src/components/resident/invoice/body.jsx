import { useContext, useEffect, useState } from "react";
import { MyUserContext } from "../../../configs/Context";
import { Link, useNavigate } from "react-router-dom";
import Apis, { endpoints } from "../../../configs/Apis";
import "./body.css";

const PaidInvoices = () => {
  const [current_user] = useContext(MyUserContext);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const response = await Apis.get(
          endpoints["load-paid-invoices"](current_user.id)
        );
        setInvoices(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadInvoices();
  }, [current_user.id]);

  const nav = useNavigate();

  const handlePayment = async (invoiceId) => {
    try {
      const response = await Apis.post(endpoints["payment-invoice"](invoiceId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Invoices_Wrapper">
      <div className="Invoices_Content">
        <div className="Invoices_Content_2">
          <div className="Invoices_Content_2_Header">
            <h3>Danh sách các hóa đơn của bạn</h3>
          </div>
          <div className="Invoices_Content_2_Content">
            <div className="Invoices_List">
              <ul>
                {invoices.map((invoice) => (
                  <li key={invoice.id}>
                    <h3>{invoice.fee_id}</h3>
                    <p>
                      Trạng thái:{" "}
                      {invoice.status === 0
                        ? "Chưa thanh toán"
                        : "Đã thanh toán"}
                    </p>
                    <p>Mô tả: {invoice.description}</p>
                    <p>
                      Ngày thanh toán:{" "}
                      {invoice.status === 0
                        ? "Chưa thanh toán"
                        : invoice.date_of_payment}
                    </p>
                    {invoice.status === 0 && (
                      <button onClick={() => handlePayment(invoice.id)}>
                        Thanh toán
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaidInvoices;
