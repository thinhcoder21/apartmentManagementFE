
import { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import Pagination from "../../util/Pagination"
import Apis, { authApi, endpoints } from "../../../configs/Apis";
import { toast } from "react-toastify";

const ItemCategory = () => {
    const [ItemCategoryName, setItemCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const [editingIndex, setEditingIndex] = useState(-1);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [editCategoryName, setEditCategoryName] = useState('');
    const [loading, setLoading] = useState(false);
    const [totalCategoryItemPages, setTotalCategoryItemPages] = useState('1');
    const [ItemCategories, setItemCategories] = useState([]);
    const [selectedPage, setSelectedPage] = useState('1');

    const handleEdit = (index, categoryId) => {
        setEditingIndex(index);
        setSelectedCategoryId(categoryId)
    };

    const handleCancel = () => {
        setEditingIndex(-1);
    };

    useEffect(() => {
        loadItemCategories();
        console.log(ItemCategoryName);
    }, [])

    useEffect(() => {
        const loadItemCategories = async () => {
            try {
                let res = await Apis.get(endpoints['Item-categories'])
                setItemCategories(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        loadItemCategories();
    }, [])
    const addItemCategory = (evt) => {
        evt.preventDefault();

        const process = async () => {
            try {
                setLoading(true)
                if (ItemCategoryName === '') {
                    toast.warning("Vui lòng nhập tên vật phẩm");
                    setLoading(false);
                    return
                }
                let res = await authApi().post(endpoints['add-Item-categories'], {
                    "ItemCategoryName": ItemCategoryName
                });
                if (res.status === 200) {
                    toast.success(res.data)
                    handleOptionClick("Itemcategory");
                    loadItemCategories();
                }
                setLoading(false);
            } catch (error) {
                if (error.request.responseText === "Thêm danh mục vật phẩm thất bại!")
                    toast.error(error.request.responseText);
                else
                    toast.error(error.request.responseText);
                console.log(error);
            }
        }
        process();
    }
    const categoryItemPages = Array.from({ length: totalCategoryItemPages }, (_, index) => index + 1);
    const handleCategoryItemPageChange = (pageNumber) => {
        // TODO: Xử lý sự kiện khi người dùng chuyển trang
        setSelectedPage(pageNumber);
        loadItemCategoriesPage(pageNumber);
        console.log(`Chuyển đến trang ${pageNumber}`);
    };

    const loadItemCategories = async () => {
        try {
            setLoading(true);
            let res = await Apis.get(endpoints['search-Item-categories'])
            setCategories(res.data.content);
            setTotalCategoryItemPages(res.data.totalPages);
            setLoading(false);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const loadItemCategoriesPage = async (pageNumber) => {
        try {
            setLoading(true);
            let e = endpoints['search-Item-categories'];
            // let pageNumber = document.getElementsByClassName("active").id;
            console.log(pageNumber)
            if (pageNumber !== null) {
                e = `${e}?pageNumber=${pageNumber - 1}`
            }
            // let url = `/admin?=${pageNumber}`
            let res = await Apis.get(e);
            setCategories(res.data.content);
            setTotalCategoryItemPages(res.data.totalPages);
            // navigate(url);
            setLoading(false);
            console.log(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    const handleOptionClick = (option) => {
        // setSelectedOption(option);
    };

    const updateItemCategory = (evt, categoryName) => {
        evt.preventDefault();

        const process = async () => {
            try {
                setLoading(true)
                console.log(selectedCategoryId, editCategoryName)
                let res = await authApi().post(endpoints['update-Item-categories'], {
                    "ItemCategoryId": selectedCategoryId,
                    "ItemCategoryName": editCategoryName === '' ? categoryName : editCategoryName
                });
                if (res.status === 200) {
                    toast.success(res.data)
                    handleOptionClick("Itemcategory");
                    loadItemCategories();
                }
                console.log(res.data);
                setEditCategoryName('');
                setEditingIndex(-1);
                setLoading(false);
            } catch (error) {
                if (error.request.responseText === "Danh mục vật phẩm không tồn tại!")
                    toast.error(error.request.responseText);
                else
                    toast.error(error.request.responseText);
                console.log(error);
            }
        }
        process();
    }

    useEffect(() => {
        loadItemCategories();
        loadItemCategoriesPage();
    }, [])

    return (
        <>
            <div>
                <div>
                    <div className="Item_Category_Header">
                        <h4 className="text-primary">Thông tin danh mục vật phẩm</h4>
                    </div>
                    <div className="Item_Catagory">
                        <Form.Label style={{ width: "78%" }}>Thêm danh mục vật phẩm</Form.Label>
                        <div className="Add_Item_Category">
                            <Form.Control type="text" defaultValue={ItemCategoryName} onChange={(e) => setItemCategoryName(e.target.value)} placeholder="Tên danh mục vật phẩm" required />
                            <Button variant="secondary" onClick={(e) => {
                                addItemCategory(e);
                                setItemCategoryName(''); // Xóa nội dung input
                            }}>Thêm</Button>
                        </div>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên danh mục</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.values(categories).map((c, index) => (
                                <tr key={c.categoryId}>
                                    <td style={{ width: '20%' }}>{c.categoryId}</td>
                                    <td style={{ width: '40%' }}>
                                        {editingIndex === index ? (
                                            <input className="category_name"
                                                type="text"
                                                defaultValue={c.categoryName}
                                                onChange={(e) => setEditCategoryName(e.target.value)}
                                            />
                                        ) : (
                                            c.categoryName
                                        )}
                                    </td>
                                    <td style={{ width: '30%' }}>
                                        {editingIndex === index ? (
                                            <>
                                                <Button style={{ marginRight: '0.5rem' }} variant="success" onClick={(e) => updateItemCategory(e, c.categoryName)}>
                                                    Cập nhật
                                                </Button>
                                                <Button style={{ marginRight: '0.5rem' }} variant="warning" onClick={handleCancel}>
                                                    Hủy
                                                </Button>
                                            </>
                                        ) : (
                                            <Button style={{ marginRight: '0.5rem' }} variant="primary" onClick={() => handleEdit(index, c.categoryId)}>
                                                Sửa
                                            </Button>
                                        )}
                                        <Button variant="danger">Xóa</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {/* <div className="Page_Nav">
                                {categoryItemPages.map((page) => (
                                    <button id={`${page}`} key={page} onClick={() => handleCategoryItemPageChange(page)}
                                        className={page === selectedPage ? 'active' : ''}>
                                        {page}
                                    </button>
                                ))}
                            </div> */}
                    <Pagination pages={categoryItemPages}
                        selectedPage={selectedPage}
                        handlePageChange={handleCategoryItemPageChange} />
                </div>
            </div>
        </>
    )
}

export default ItemCategory;
