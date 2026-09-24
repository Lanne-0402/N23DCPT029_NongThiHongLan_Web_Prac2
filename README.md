# BÀI THỰC HÀNH 2: XÂY DỰNG RESTFUL API QUẢN LÝ ĐƠN HÀNG (ORDERS API)

- **Họ và tên:** Nông Thị Hồng Lan
- **Mã sinh viên:** N23DCPT029
- **Đường dẫn Live API (Render):** [https://n23dcpt029-nongthihonglan-web-prac2.onrender.com](https://n23dcpt029-nongthihonglan-web-prac2.onrender.com/)

---
> Do dịch vụ sử dụng gói Free của Render, máy chủ sẽ tự động chuyển sang chế độ ngủ (Spin down) nếu không có yêu cầu truy cập trong vòng 15 phút. Lần truy cập đầu tiên có thể mất từ **30 đến 50 giây** để hệ thống khởi động lại.
---

## 1. Kiểm thử nhanh trực tiếp trên trình duyệt (Các phương thức GET)

Thầy có thể nhấp trực tiếp vào các đường liên kết dưới đây để kiểm tra phản hồi JSON từ máy chủ:

### A. Kiểm tra trạng thái máy chủ (Health Check)
* [Kiểm tra Server đang hoạt động](https://n23dcpt029-nongthihonglan-web-prac2.onrender.com/)
  * **Endpoint:** `GET /`
  * **Kết quả kỳ vọng:** Dòng chữ `"API Quan ly Don hang dang hoat dong..."`

### B. Các chức năng cơ bản
* [Lấy toàn bộ danh sách đơn hàng](https://n23dcpt029-nongthihonglan-web-prac2.onrender.com/api/orders)
  * **Endpoint:** `GET /api/orders`

### C. Bài tập tự làm (Challenge)
* **Yêu cầu 1: Lọc đơn hàng theo trạng thái**
  * [Lọc các đơn hàng đang chờ xử lý (`status=pending`)](https://n23dcpt029-nongthihonglan-web-prac2.onrender.com/api/orders?status=pending)
  * [Lọc các đơn hàng đã xác nhận (`status=confirmed`)](https://n23dcpt029-nongthihonglan-web-prac2.onrender.com/api/orders?status=confirmed)
* **Yêu cầu 2: Tìm kiếm theo tên khách hàng (Regex không phân biệt hoa/thường)**
  * [Tìm kiếm khách hàng có tên chứa chữ "Nguyen"](https://n23dcpt029-nongthihonglan-web-prac2.onrender.com/api/orders/search?name=Nguyen)
  * [Tìm kiếm khách hàng có tên chứa chữ "Thi"](https://n23dcpt029-nongthihonglan-web-prac2.onrender.com/api/orders/search?name=Thi)
* **Yêu cầu 3: Sắp xếp theo tổng tiền đơn hàng (`totalAmount`)**
  * [Sắp xếp giá trị đơn hàng tăng dần (`sort=asc`)](https://n23dcpt029-nongthihonglan-web-prac2.onrender.com/api/orders?sort=asc)
  * [Sắp xếp giá trị đơn hàng giảm dần (`sort=desc`)](https://n23dcpt029-nongthihonglan-web-prac2.onrender.com/api/orders?sort=desc)
* **Tính năng mở rộng kết hợp:**
  * [Lọc đơn hàng `pending` và sắp xếp giảm dần theo tổng tiền](https://n23dcpt029-nongthihonglan-web-prac2.onrender.com/api/orders?status=pending&sort=desc)

---

## 2. Kiểm thử toàn diện qua Postman

### 1. Kiểm tra đơn hàng (GET)
- **URL:** `https://n23dcpt029-nongthihonglan-web-prac2.onrender.com/api/orders`
- **Method:** `GET`

