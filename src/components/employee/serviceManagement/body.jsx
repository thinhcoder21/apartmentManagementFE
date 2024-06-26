import { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import Apis, { endpoints } from "../../../configs/Apis";
import { toast } from "react-toastify";

const ManageServicesPage = () => {
    const [serviceName, setServiceName] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');
    const [services, setServices] = useState([]);
    const [editingIndex, setEditingIndex] = useState(-1);

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {
        try {
            const response = await Apis.get(endpoints['load-available-services']);
            setServices(response.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load services");
        }
    };

    const handleAddService = async () => {
        try {
            await Apis.post(endpoints['add-service'], { serviceName, serviceDescription });
            setServiceName('');
            setServiceDescription('');
            loadServices();
            toast.success("Service added successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to add service");
        }
    };

    const handleDeleteService = async (serviceId) => {
        try {
            await Apis.delete(`${endpoints['delete-service']}/${serviceId}`);
            loadServices();
            toast.success("Service deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete service");
        }
    };

    const handleEditService = async (serviceId, newName, newDescription) => {
        try {
            await Apis.put(`${endpoints['update-service']}/${serviceId}`, { serviceName: newName, serviceDescription: newDescription });
            loadServices();
            toast.success("Service updated successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update service");
        }
    };

    return (
        <div>
            <h2>Quản lí dịch vụ</h2>
            <Form>
                <Form.Group controlId="serviceName">
                    <Form.Label>Tên dịch vụ</Form.Label>
                    <Form.Control type="text" placeholder="Enter service name" value={serviceName} onChange={(e) => setServiceName(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="serviceDescription">
                    <Form.Label>thông tin dịch vụ</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Enter service description" value={serviceDescription} onChange={(e) => setServiceDescription(e.target.value)} />
                </Form.Group>
                <Button variant="primary" onClick={handleAddService}>Add Service</Button>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên</th>
                        <th>Thông tin</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service, index) => (
                        <tr key={service.id}>
                            <td>{service.id}</td>
                            <td>
                                {editingIndex === index ?
                                    <input value={service.serviceName} onChange={(e) => handleEditService(service.id, e.target.value, service.serviceDescription)} />
                                    : service.serviceName}
                            </td>
                            <td>
                                {editingIndex === index ?
                                    <input value={service.serviceDescription} onChange={(e) => handleEditService(service.id, service.serviceName, e.target.value)} />
                                    : service.serviceDescription}
                            </td>
                            <td>
                                {editingIndex === index ?
                                    <Button variant="primary" onClick={() => setEditingIndex(-1)}>Save</Button>
                                    :
                                    <>
                                        <Button variant="warning" onClick={() => setEditingIndex(index)}>Edit</Button>
                                        <Button variant="danger" onClick={() => handleDeleteService(service.id)}>Delete</Button>
                                    </>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ManageServicesPage;
