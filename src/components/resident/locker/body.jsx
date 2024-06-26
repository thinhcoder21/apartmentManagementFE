import Apis, { endpoints } from "../../../configs/Apis";
import { MyUserContext } from "../../../configs/Context";
import cookie from "react-cookies";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

const Locker = () => {
  const [current_user] = useContext(MyUserContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const response = await Apis.get(endpoints['load-locker-by-userID'](current_user.id));
        setItems(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadItems();
  }, [current_user.id]);

  const nav = useNavigate();

  return (
    <div className="Item_Wrapper">
      {/* Other content */}
      <div className="Item_Content">
        <div className="Item_Content_2">
          <div className="Item_Content_2_Header">
            <h3>Danh sách các vật phẩm trong tủ đồ của bạn</h3>
          </div>
          <div className="Item_Content_2_Content">
            <div className="Item_List">
              <ul>
                {items.map((item) => (
                  <li key={item.id} className="card">
                    <h3>Tên vật phẩm: {item.name}</h3>
                    <p>Mô tả: {item.description}</p>
                    <p>Thời gian nhận: {item.received_time}</p>
                    <p>Thời gian trả: {item.id_status === 0 ? 'Chưa nhận' : item.received_time}</p>
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
export default Locker;
