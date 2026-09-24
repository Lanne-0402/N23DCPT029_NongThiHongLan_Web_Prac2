# LAB 2: RESTful API Quản lý Đơn hàng (NodeJS & Express)

- **Họ và tên:** Nông Thị Hồng Lan
- **Mã sinh viên:** N23DCPT029
- **Lớp** D23CQPTUD01-N

## Các công nghệ sử dụng
- Node.js & Express.js
- MongoDB Atlas & Mongoose ODM
- Postman (Kiểm thử API)

## Hướng dẫn cài đặt và chạy Local
1. Cài đặt thư viện: `npm install`
2. Tạo file `.env` với các biến môi trường:
   PORT=5000
   MONGO_URI=<Chuỗi kết nối MongoDB Atlas>
3. Khởi chạy server: `npm run dev`

## Danh sách Endpoints đã hoàn thành
- `POST /api/orders`: Tạo mới đơn hàng
- `GET /api/orders`: Lấy toàn bộ danh sách đơn hàng
- `GET /api/orders/:id`: Xem chi tiết đơn hàng
- `PUT /api/orders/:id`: Cập nhật trạng thái đơn hàng
- `DELETE /api/orders/:id`: Xóa đơn hàng

### Phần Challenge (Bài tập tự làm)
- `GET /api/orders?status=pending`: Lọc theo trạng thái
- `GET /api/orders/search?name=Nguyen`: Tìm kiếm không phân biệt hoa/thường theo tên khách
- `GET /api/orders?sort=asc` hoặc `desc`: Sắp xếp theo tổng tiền đơn hàng