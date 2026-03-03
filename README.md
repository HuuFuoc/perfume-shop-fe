# 🌸 Perfume Shop — Frontend

Giao diện frontend thương mại điện tử hiện đại cho cửa hàng nước hoa cao cấp, xây dựng với **React 19**, **TypeScript** và **Vite**. Hỗ trợ phân quyền theo vai trò, kiến trúc component rõ ràng và tích hợp API liền mạch.

---

## 🚀 Công nghệ sử dụng

| Danh mục      | Công nghệ                     |
| ------------- | ----------------------------- |
| Framework     | React 19 + TypeScript         |
| Công cụ build | Vite 7                        |
| Giao diện     | Tailwind CSS 3                |
| Quản lý state | Redux Toolkit                 |
| Lấy dữ liệu   | TanStack React Query v5       |
| HTTP Client   | Axios                         |
| Điều hướng    | React Router DOM v7           |
| Thông báo     | React Toastify                |
| Lưu trữ file  | AWS S3 (`@aws-sdk/client-s3`) |
| Quản lý gói   | pnpm                          |

---

## ✨ Tính năng

- 🔐 **Phân quyền theo vai trò** — Layout và trang riêng biệt cho `ADMIN` và `USER`
- 🛡️ **Route bảo vệ & khách** — Tự động chuyển hướng người dùng chưa xác thực hoặc không có quyền
- 🛍️ **Danh mục sản phẩm** — Xem danh sách nước hoa tại `/perfumes`
- 📦 **Upload file lên AWS S3** — Tải ảnh sản phẩm trực tiếp lên S3
- ⚡ **Trạng thái loading toàn cục** — Loading overlay quản lý bởi Redux
- 🔔 **Thông báo Toast** — Phản hồi tức thì qua React Toastify
- 📱 **Thiết kế responsive** — Giao diện tương thích di động với Tailwind CSS
- 🔄 **Lazy loading** — Tách code theo trang để tải nhanh lần đầu

---

## 📁 Cấu trúc dự án

```
src/
├── app/
│   ├── api/            # Axios base service (GET, POST, PUT, DELETE)
│   ├── enums/          # Mã HTTP status, vai trò người dùng
│   ├── exceptions/     # Xử lý ngoại lệ HTTP
│   ├── interface/      # Interface dùng chung cho response
│   ├── screens/        # Màn hình UI toàn cục (Loading)
│   └── store/          # Redux store & loading slice
├── components/
│   └── common/         # Component dùng lại (ScrollTopButton, …)
├── consts/             # Hằng số toàn app (routes, API paths, domain)
├── contexts/           # React contexts (AuthContext)
├── layouts/
│   ├── admin/          # Layout admin
│   ├── main/           # Layout công khai (Header, Footer)
│   └── user/           # Layout người dùng đã đăng nhập
├── pages/
│   ├── admin/          # Trang dashboard admin
│   ├── auth/           # Đăng nhập, 404, Không có quyền
│   ├── public/         # Trang landing
│   └── user/           # Trang chủ, chi tiết nước hoa, giới thiệu
├── providers/          # QueryProvider (React Query)
├── routes/
│   ├── protected/      # Route yêu cầu xác thực & phân quyền
│   └── unprotected/    # Route công khai / khách
├── services/           # Tầng gọi API (perfume, …)
├── types/              # Model TypeScript cho request/response
└── utils/              # Helper, local storage, upload S3
```

---

## 🗺️ Danh sách Route

| Đường dẫn          | Quyền truy cập | Mô tả                    |
| ------------------ | -------------- | ------------------------ |
| `/`                | Công khai      | Trang chào mừng          |
| `/perfumes`        | Công khai      | Danh sách nước hoa       |
| `/about`           | Công khai      | Trang giới thiệu         |
| `/login`           | Chỉ khách      | Trang đăng nhập          |
| `/app`             | USER / ADMIN   | Trang chủ người dùng     |
| `/admin/dashboard` | Chỉ ADMIN      | Bảng điều khiển admin    |
| `/unauthorized`    | Tất cả         | Trang lỗi 403            |
| `*`                | Tất cả         | Trang không tìm thấy 404 |

---

## ⚙️ Hướng dẫn cài đặt

### Yêu cầu

- **Node.js** ≥ 18
- **pnpm** ≥ 8 — cài bằng lệnh `npm install -g pnpm`

### Cài đặt

```bash
# Clone repository
git clone https://github.com/HuuFuoc/perfume-shop-fe.git
cd perfume-shop-fe

# Cài đặt dependencies
pnpm install
```

### Biến môi trường

Tạo file `.env` tại thư mục gốc của dự án:

```env
VITE_BACKEND_URL=http://localhost:5000/api
```

| Biến               | Mô tả                        |
| ------------------ | ---------------------------- |
| `VITE_BACKEND_URL` | URL gốc của backend REST API |

### Chạy ứng dụng

```bash
# Khởi động server phát triển
pnpm dev

# Build cho môi trường production
pnpm build

# Xem trước bản build production
pnpm preview

# Chạy ESLint
pnpm lint
```

Server phát triển sẽ chạy tại **http://localhost:5173**.

---

## 🏗️ Tổng quan kiến trúc

```
┌─────────────────────────────────┐
│          React App              │
│  ┌──────────┐  ┌─────────────┐  │
│  │  Redux   │  │ React Query │  │
│  │  Store   │  │   Cache     │  │
│  └──────────┘  └─────────────┘  │
│         ┌──────────────┐        │
│         │  Axios Base  │        │
│         │   Service    │        │
│         └──────┬───────┘        │
└────────────────┼────────────────┘
                 │
         ┌───────▼────────┐
         │  Backend API   │
         │  (REST)        │
         └────────────────┘
```

- **Redux Toolkit** — Quản lý trạng thái UI toàn cục (loading, v.v.)
- **TanStack React Query** — Xử lý cache dữ liệu từ server, refetch nền và mutation
- **Axios BaseService** — HTTP client thống nhất với interceptor, gắn token và xử lý lỗi
- **AuthContext** — Lưu vai trò người dùng hiện tại và cung cấp helper chuyển hướng

---

## 📜 Giấy phép

Dự án được thực hiện trong khuôn khổ môn học **SDN302** tại Đại học FPT.
