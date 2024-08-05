const socket = io();

const productTableBody = document.querySelector("#productTable tbody");
const productForm = document.querySelector("#productForm");

function renderProducts(products) {
    productTableBody.innerHTML = "";
    products.forEach((product) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.title}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td>${product.status}</td>
            <td>${product.category}</td>
            <td>
                <button class="btn btn-danger btn-sm delete-btn" data-id="${product.id}">Delete</button>
            </td>
        `;
        productTableBody.appendChild(row);
    });

    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", () => {
            const productId = button.getAttribute("data-id");
            socket.emit("deleteProduct", parseInt(productId));
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const products = Array.from(productTableBody.children).map(row => {
        return {
            id: row.cells[0].textContent,
            title: row.cells[1].textContent,
            description: row.cells[2].textContent,
            price: row.cells[3].textContent,
            stock: row.cells[4].textContent,
            status: row.cells[5].textContent,
            category: row.cells[6].textContent
        };
    });
    renderProducts(products);
});

socket.on("updateProducts", (products) => {
    renderProducts(products);
});

productForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(productForm);
    const product = {
        title: formData.get("title"),
        description: formData.get("description"),
        code: formData.get("code"),
        price: parseFloat(formData.get("price")),
        stock: parseInt(formData.get("stock")),
        category: formData.get("category"),
        status: formData.get("status") === "on"
    };
    socket.emit("addProduct", product);
    productForm.reset();
});
