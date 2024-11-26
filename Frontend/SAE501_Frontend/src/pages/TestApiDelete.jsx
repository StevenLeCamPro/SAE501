import Api from "../components/Api";

function TestApiDelete({ id, onDelete }) {
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }

        try {
            await Api("user", "delete", id);
            alert("User deleted successfully");
            if (onDelete) {
                onDelete(id);
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Error deleting user.");
        }
    };

    return <button onClick={handleDelete}>Supprimer</button>;
}

export default TestApiDelete;