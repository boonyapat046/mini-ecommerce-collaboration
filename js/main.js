document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('searchInput');
    const loader = document.getElementById('loader');
    let allProducts = [];

    // แสดง Loader ขณะโหลดสินค้า
    loader.style.display = 'block';

    // Fetch products from JSON
    fetch('js/products.json')
        .then(response => response.json())
        .then(data => {
            allProducts = data;
            displayProducts(allProducts);
            loader.style.display = 'none';
        })
        .catch(error => {
            console.error('เกิดข้อผิดพลาดในการโหลดสินค้า:', error);
            productList.innerHTML = '<p>เกิดข้อผิดพลาดในการโหลดสินค้า</p>';
            loader.style.display = 'none';
        });

    function displayProducts(products) {
        productList.innerHTML = ''; // Clear previous list
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>ราคา: ${product.price.toLocaleString('th-TH')} บาท</p>
            `;
            productList.appendChild(card);
        });
    }

    // 🔍 Search functionality (รวม logic จากทั้งสองฝั่ง)
    searchInput.addEventListener('keyup', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();

        // ถ้า input ว่าง ให้แสดงสินค้าทั้งหมด
        if (searchTerm === "") {
            displayProducts(allProducts);
            return;
        }

        const filteredProducts = allProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );

        displayProducts(filteredProducts);
    });
});
