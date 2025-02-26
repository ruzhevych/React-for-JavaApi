import { useDeleteCategoryMutation, useGetCategoriesQuery } from "../../services/apiCategory.ts";
import { Link } from "react-router-dom";
import { Button, Dropdown, MenuProps, notification, Spin } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import {APP_ENV} from "../../env";

const CategoryListPage = () => {
    const { data: list, isLoading, error } = useGetCategoriesQuery();
    const [deleteCategory] = useDeleteCategoryMutation();

    const handleDelete = async (id: number) => {
        try {
            await deleteCategory(id).unwrap();
            notification.success({
                message: "Категорія видалена",
                description: "Категорія успішно видалена!",
            });
        } catch {
            notification.error({
                message: "Помилка видалення категорії",
            });
        }
    };

    const renderActions = (id: number) => {
        const items: MenuProps["items"] = [
            { key: "edit", label: <Link to={`edit/${id}`}>Редагувати</Link> },
            { key: "delete", danger: true, label: <span onClick={() => handleDelete(id)}>Видалити</span> },
        ];

        return (
            <Dropdown menu={{ items }} trigger={["click"]}>
                <Button icon={<EditOutlined />} shape="default" className="bg-transparent border-none text-white hover:text-purple-500" />
            </Dropdown>
        );
    };

    return (
        <div className="bg-white min-h-screen p-8 text-white font-sans">
            <h1 className="text-center text-4xl font-bold text-blue-400 my-2">
                Список категорій
            </h1>

            <div className="flex justify-end mb-6">
                <Link to="create" className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
                    <PlusOutlined /> Додати категорію
                </Link>
            </div>

            <div className="bg-gray-100 overflow-hidden rounded-lg">
                {isLoading ? (
                    <div className="flex justify-center py-10">
                        <Spin size="large" className="text-blue-400" />
                    </div>
                ) : error ? (
                    <p className="text-red-500 text-center py-4">Помилка завантаження даних</p>
                ) : (
                    <table className="w-full text-sm text-left border border-gray-100">
                        <thead className="bg-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-blue-400">Зображення</th>
                            <th className="px-6 py-3 text-blue-400">Назва</th>
                            <th className="px-6 py-3 text-blue-400">Опис</th>
                            <th className="px-6 py-3 text-center text-blue-400">Дії</th>
                        </tr>
                        </thead>
                        <tbody>
                        {list?.map((category) => (
                            <tr key={category.id} className="odd:bg-gray-100 even:bg-gray-200">
                                <td className="px-6 py-4 text-gray-800">
                                    <img src={`${APP_ENV.REMOTE_MEDIUM_IMAGES_URL}${category.image}`}
                                         alt={category.name} className="w-16 h-16 object-cover"/>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-800">{category.name}</td>
                                <td className="px-6 py-4 text-gray-800">{category.description}</td>
                                <td className="px-6 py-4 text-center text-gray-800">{renderActions(category.id)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default CategoryListPage;