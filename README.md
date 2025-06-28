# Tên dự án: Phone Ecommerce 📱 

#### 📄 Mô Tả:
    Phone Ecommerce là dự án cá nhân xây dựng hệ thống API phục vụ cho website bán điện thoại. Dự án hỗ trợ các chức năng quản lý sản phẩm, đơn hàng, giỏ hàng và người dùng, giúp mô phỏng các nghiệp vụ cơ bản của một website thương mại điện tử.

#### ⚙️ Tính Năng Chính
- Quản lý sản phẩm:
    - Quản lý sản phẩm và biến thể sản phẩm
    - Quản lý thuộc tính và giá trị thuộc tính
    - Quản lý tồn kho theo từng biến thể sản phẩm
    - Tìm kiếm sản phẩm theo: từ khóa, thương hiệu và danh mục sản phẩm 
- Quản lý người dùng:
    - Đăng ký, đăng nhập
    - Phân quyền: User và Admin
    - Xác thực đăng nhập bằng JWT
    - Đổi mật khẩu
    - Quên mật khẩu qua email
- Quản lý giỏ hàng và đơn hàng:
    - Thêm, sửa, xóa sản phẩm trong giỏ hàng
    - Tạo đơn hàng từ giỏ hàng
    - Quản lý địa chỉ người nhận
    - Thanh toán trực tuyến (Tích hợp VNPAY sandbox)

#### 🚀 Công Nghệ Sử Dụng:
- **Node.js**, **Express.js**
- **Database:** MySQL (Sequelize ORM)
- **Xác thực:** JWT (JSON Web Token)
- **Email Service:** Nodemailer

#### 📂 Cấu Trúc Thư mục

    📂 src/
    │
    ├── config/         # Cấu hình server, database, swagger
    ├── controllers/    # Xử lý logic các API
    ├── middleware/     # Middleware: auth
    ├── models/         # Định nghĩa Schema
    ├── routes/         # Định nghĩa các API routes
    ├── services/       # Các xử lý nghiệp vụ
    ├── utils/          # Các hàm tiện ích
    ├── validations/    # Các hàm validate schema bằng thư viện Joi
    |
    └── server.js       # File khởi chạy server

#### ⚡Hướng Dẫn Cài Đặt
    
    1. Clone Project
     - git clone https://github.com/ziolata/PhoneEcomm-BE.git

    2. Cài đặt thư viện
     - npm install

    3. Cấu hình môi trường
    Tạo file .env và cấu hình:
    theo mẫu:
        PORT=port
        HOST=your_host
        DB_HOST=your_db_host
        DB_NAME=your_db_name
        DB_USERNAME=your_db_user_name
        DB_PASS=your_db_pass
        eUser=your_elastic_username
        ePass=your_elastic_password
        JWT_SECRET=your_jwt_secret
        EMAIL=your_email@gmail.com
        PASSMAIL=your_email_password
        CLOUD_NAME=cloudinary_name
        API_KEY=API_key_cloudinary
        API_SECRET=secret_key_cloudinary
        vnp_TmnCode=tmncode_vnpay_sandbox
        vnp_HashSecret=secret_vnpay_sandbox
        vnp_Url=url_vnpay_sandbox
        vnp_ReturnUrl=url_return

    4.Chạy server
      - npm run dev


#### 📚 Tài Liệu API
Dưới đây là hướng dẫn sử dụng và truy cập API của dự án.

Truy cập tài liệu Swagger 
URL: http://phone.ziodev.site/api-docs 

#### Danh sách một số nhóm API chính:
- Auth:
    - POST /api/v1/auth/register: Đăng ký tài khoản
    - POST /api/v1/auth/login: Đăng nhập
    - POST /api/v1/auth/change_pass: Đổi mật khẩu
    - POST /api/v1/auth/forgot-password: Quên mật khẩu
    - POST /api/v1/auth/reset-password/{token}: Đặt lại mật khẩu

- User
    - GET /api/v1/user/me: Lấy thông tin người dùng theo tài khoản đang đăng nhập
    - GET /api/v1/user/:id: Lấy thông tin người dùng theo tham số id
    - GET /api/v1/user/all: Lấy danh sách thông tin người dùng
    - PUT /api/v1/user/update/me: Cập nhật thông tin người dùng theo tài khoản đăng nhập(dành cho người dùng)
    - PUT /api/v1/user/update/:id: Cập nhật thông tin người dùng theo tham số id (dành cho admin)

- Product
    - GET /api/v1/product: Danh sách sản phẩm
    - GET /api/v1/product/:id: Chi tiết sản phẩm
    - PUT /api/v1/product/update/:id: Cập nhật sản phẩm
    - DELETE /api/v1/product/delete/:id: Xóa sản phẩm

- Cart
    - GET /api/v1/cart: Lấy giỏ hàng của người dùng
    - POST /api/v1/cart/add: Thêm sản phẩm vào giỏ
    
- Order
    - POST /api/v1/order/add: Tạo đơn hàng
    - POST /api/v1/order/: Xem đơn hàng được lọc theo đơn hàng của tài khoản
    - GET /api/v1/order/:id: Chi tiết đơn hàng

- Payment
    - POST /api/v1/payment/create_payment
    - GET /api/v1/payment/vnpay_return

##### Quy trình đặt hàng mẫu
1. Đăng ký `/api/v1/auth/register`
2. Đăng nhập `/api/v1/auth/login`
3. Lấy danh sách biến thể sản phẩm `/api/v1/product_variant`
    - Lấy id sản phẩm cần thêm vào giỏ hàng
4. Thêm sản phẩm vào giỏ hàng `/api/v1/cart/add`
    - Điền id vừa lấy từ danh sách biến thể sản phẩm
    - Ví dụ dữ liệu truyền vào: {"product_variant_id":1, "quantity":"2"}
5. Thêm địa chỉ giao hàng `/api/v1/address/add`
    - Ví dụ dữ liệu truyền vào: {

        "name":"Nguyễn Văn A", 

        "address_line_1:"Thôn 1A Phường ABC", 

        "address_line_2":"Đắk Lắk", 

        "address_type":"Home"

    }

6. Kiểm tra địa chỉ đã lưu `/api/v1/address/`
    - Lấy id địa chỉ muốn nhận hàng
7. Tạo đơn hàng `/api/v1/order/add`
    - Ví dụ dữ liệu truyền vào:{

        "discount_code":"abcd",  

        "shipping":{
            "address_id": 1,
            "type": "Post office"
        }

    }
    - Trường discount_code không bắt buộc phải thêm, có thể tạo mã giảm giá tại `/api/v1/discount/add`
8. Lấy danh sách đơn hàng `/api/v1/order/`
    - Danh sách đơn hàng đã được lọc theo tài khoản
    - Lấy id đơn hàng muốn thanh toán
9. Tạo link thanh toán `/api/v1/payment/create_payment` (tích hợp VNPAY Sandbox môi trường test)
    - Ví dụ dữ liệu truyền vào: {
            order_id: 1
    }
    
- Lưu ý khi test
    - Đa số API cần xác thực yêu cầu token:
    - Sử dụng JWT Access Token từ API /api/v1/auth/login
    - Trên Swagger Điền Token vào nút Authorize ở góc phải màn hình
#### 📫 Tác Giả & Liên hệ
**Tác giả:** ziolata  

**Email:** [ziolata3@gmail.com](mailto:ziolata3@gmail.com)

**GitHub:** [https://github.com/ziolata/](https://github.com/ziolata)
