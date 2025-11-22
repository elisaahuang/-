document.addEventListener('DOMContentLoaded', () => {
    // 檢查目前在哪個頁面
    const path = window.location.pathname;
    const isLoginPage = path.includes('index.html') || path === '/'; // 假設根目錄是登入頁
    const isProductsPage = path.includes('products.html');
    const isDetailPage = path.includes('product_detail.html');
    const isUploadPage = path.includes('upload.html');
    document.addEventListener('DOMContentLoaded', () => {
    // 檢查目前在哪個頁面
    const path = window.location.pathname;
    const isLoginPage = path.includes('login.html') || path === '/';
    const isProductsPage = path.includes('products.html');
    const isDetailPage = path.includes('product_detail.html'); // 新增詳細頁檢查

    // ... (保持登入頁邏輯不變)

    // 商品列表頁和詳細頁的共用邏輯
    if (isProductsPage || isDetailPage||isUploadPage) { // 將 isDetailPage 加入判斷
        const logoutBtn = document.getElementById('logout-btn-real');

        // 如果未登入，強制跳轉回登入頁面
        if (localStorage.getItem('isLoggedIn') !== 'true') {
            window.location.href = 'login.html';
            return;
        }

        // 登出事件處理 (保持不變)
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'login.html'; 
        });
        
        // (如果您之前有加入商品輪播邏輯，請確保它只在 products.html 中執行，
        //  或使用 try-catch 包裹，避免在詳細頁報錯。)
    }
});
    // --- 分類下拉選單邏輯 (在 app.js 內) ---
    const dropbtn = document.querySelector('.dropbtn');
    const dropdown = document.querySelector('.dropdown');

    if (dropbtn) {
        dropbtn.addEventListener('click', () => {
            // 切換 'active' 類別，然後在 CSS 中定義 active 狀態的樣式
            dropdown.classList.toggle('active'); 
        });

        // 點擊選單外部時關閉選單
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && dropdown.classList.contains('active')) {
                dropdown.classList.remove('active');
            }
        });
    }
    // --- 結束下拉選單邏輯 ---
    // 登入頁面的邏輯
    if (isLoginPage) {
        const loginForm = document.getElementById('login-form');
        const loginMessage = document.getElementById('login-message');
        
        // 如果已經登入，直接跳轉到商品列表頁，避免重複登入
        if (localStorage.getItem('isLoggedIn') === 'true') {
            window.location.href = 'products.html';
            return;
        }

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // --- 模擬後端驗證 (測試帳號: test/12345) ---
            if (username === 'test' && password === '12345') {
                localStorage.setItem('isLoggedIn', 'true');
                loginMessage.textContent = '登入成功，正在跳轉...';
                
                // 登入成功後跳轉到商品列表頁
                window.location.href = 'products.html'; 
            } else {
                loginMessage.textContent = '帳號或密碼錯誤。 (測試帳號: test/12345)';
            }
        });
    }

    // 商品列表頁的邏輯
    if (isProductsPage) {
        const logoutBtn = document.getElementById('logout-btn-real');

        // 如果未登入，強制跳轉回登入頁面
        if (localStorage.getItem('isLoggedIn') !== 'true') {
            window.location.href = 'index.html';
            return;
        }

        // 登出事件處理
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // 清除登入狀態
            localStorage.removeItem('isLoggedIn');
            console.log('User logged out.');

            // 登出後跳轉回登入頁面
            window.location.href = 'index.html'; 
        });
    }
});