import { Form, Button, Table, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import Apis, { authApi, endpoints } from "../../../configs/Apis";
import { toast } from "react-toastify";

const ItemCategory = () => {
    const [selectedUserId, setSelectedUserId] = useState('');
    const [ItemCategoryName, setItemCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editCategoryId, setEditCategoryId] = useState('');
    const [editCategoryName, setEditCategoryName] = useState('');

    useEffect(() => {
        loadItemCategories();
    }, [selectedUserId]);

    const loadItemCategories = async () => {
        try {
            setLoading(true);
            let res = await Apis.get(endpoints['Item-categories'], { params: { userId: selectedUserId } });
            setCategories(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const addItemCategory = async (evt) => {
        evt.preventDefault();

        try {
            if (ItemCategoryName === '') {
                toast.warning("Vui lòng nhập tên vật phẩm");
                return;
            }

            const requestData = {
                userId: selectedUserId,
                ItemCategoryName: ItemCategoryName
            };

            const res = await authApi().post(endpoints['add-Item-categories'], requestData);

            if (res.status === 200) {
                toast.success(res.data);
                setItemCategoryName('');
                loadItemCategories();
            }
        } catch (error) {
            toast.error("Thêm danh mục vật phẩm thất bại!");
            console.log(error);
        }
    };

    const handleEditCategory = (categoryId, categoryName) => {
        setEditCategoryId(categoryId);
        setEditCategoryName(categoryName);
        setShowEditModal(true);
    };

    const handleSaveEdit = async () => {
        try {
            const res = await authApi().post(endpoints['update-Item-categories'], {
                ItemCategoryId: editCategoryId,
                ItemCategoryName: editCategoryName
            });

            if (res.status === 200) {
                toast.success(res.data);
                setShowEditModal(false);
                loadItemCategories();
            }
        } catch (error) {
            toast.error("Cập nhật danh mục vật phẩm thất bại!");
            console.log(error);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            const res = await authApi().delete(endpoints['delete-Item-categories'], {
                data: { ItemCategoryId: categoryId }
            });

            if (res.status === 200) {
                toast.success(res.data);
                loadItemCategories();
            }
        } catch (error) {
            toast.error("Xóa danh mục vật phẩm thất bại!");
            console.log(error);
        }
    };

    return (
        <>
            {/* Hiển thị danh sách người dùng và thêm mới danh mục */}
            {/* Form thêm danh mục */}
            {/* Table hiển thị danh sách danh mục */}
            {/* Modal chỉnh sửa danh mục */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa danh mục</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Tên danh mục</Form.Label>
                        <Form.Control type="text" value={editCategoryName} onChange={(e) => setEditCategoryName(e.target.value)} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Hủy</Button>
                    <Button variant="primary" onClick={handleSaveEdit}>Lưu</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ItemCategory;
