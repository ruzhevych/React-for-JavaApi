import { Link } from "react-router-dom";
import { Button, Dropdown, MenuProps, notification, Spin } from "antd";
import {MoreOutlined, PlusOutlined} from "@ant-design/icons";
import defaultProductImage from "../../assets/images/defolt.webp";
import { APP_ENV } from "../../env/index.ts";
import { useDeleteProductMutation, useGetProductsQuery } from "../../services/apiProduct.ts";

const ProductListPage = () => {
    const { data: list, isLoading, error } = useGetProductsQuery();
    const [deleteProduct] = useDeleteProductMutation();

    const handleDelete = async (id: number) => {
        try {
            await deleteProduct(id).unwrap();
            notification.success({
                message: "Продукт видалено",
                description: "Продукт успішно видалено!",
            });
        } catch {
            notification.error({
                message: "Помилка видалення продукту",
            });
        }
    };

    const renderActions = (id: number) => {
        const items: MenuProps["items"] = [
            {
                key: "edit",
                label: <Link to={`edit/${id}`}>Редагувати</Link>,
            },
            {
                key: "delete",
                danger: true,
                label: (
                    <span onClick={() => handleDelete(id)}>Видалити</span>
                ),
            },
        ];

        return (
            <Dropdown menu={{ items }} trigger={["click"]}>
                <Button icon={<MoreOutlined />} shape="circle" />
            </Dropdown>
        );
    };

    return (
        <div className="bg-white min-h-screen p-8 text-white font-sans">
            <h1 className="text-center text-4xl font-bold text-blue-400 my-2">
                Список продуктів
            </h1>

            <div className="flex justify-end mb-6">
                <Link to={"create"} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
                    <PlusOutlined />Додати продукт
                </Link>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                {isLoading ? (
                    <div className="flex justify-center py-10">
                        <Spin size="large" />
                    </div>
                ) : error ? (
                    <p className="text-red-500 text-center py-4">Помилка завантаження даних</p>
                ) : (
                    <table className="w-full text-sm text-left border border-gray-100">
                        <thead className="bg-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-blue-400">Зображення</th>
                            <th scope="col" className="px-6 py-3 text-blue-400">Назва</th>
                            <th scope="col" className="px-6 py-3 text-blue-400">Ціна</th>
                            <th scope="col" className="px-6 py-3 text-center text-blue-400">Дії</th>
                        </tr>
                        </thead>
                        <tbody>
                        {list?.map((product) => (
                            <tr
                                key={product.id}
                                className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700"
                            >
                                <td className="px-6 py-4 font-medium text-gray-800">
                                    <img
                                        src={product.images[0].name ? `${APP_ENV.REMOTE_LARGE_IMAGES_URL}${product.images[0].name }` : defaultProductImage}
                                        alt={product.name} className="w-16 h-16 object-cover"
                                    />
                                </td>
                                <td className="px-6 py-4 text-gray-800">
                                    <Link to={`product/${product.id}`} className="text-gray-800 hover:text-blue-600 hover:underline">
                                        {product.name}
                                    </Link>
                                </td>
                                <td className="px-6 py-4 text-gray-800">{product.price} грн</td>
                                <td className="px-6 py-4 text-center text-gray-800">{renderActions(product.id)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ProductListPage;