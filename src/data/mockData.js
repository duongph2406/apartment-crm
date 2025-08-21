// Dữ liệu phòng cố định
export const ROOMS = [
  { id: '102', area: 26, price: 4200000, floor: 1, status: 'available' },
  { id: '201', area: 25, price: 5200000, floor: 2, status: 'occupied' },
  { id: '202', area: 20, price: 4200000, floor: 2, status: 'available' },
  { id: '301', area: 25, price: 5200000, floor: 3, status: 'occupied' },
  { id: '302', area: 20, price: 4200000, floor: 3, status: 'available' },
  { id: '401', area: 25, price: 5200000, floor: 4, status: 'available' },
  { id: '402', area: 20, price: 4200000, floor: 4, status: 'occupied' },
  { id: '501', area: 25, price: 5200000, floor: 5, status: 'available' },
  { id: '502', area: 20, price: 4200000, floor: 5, status: 'available' },
  { id: '601', area: 25, price: 5200000, floor: 6, status: 'occupied' },
  { id: '602', area: 20, price: 4400000, floor: 6, status: 'available' }
];

// Dữ liệu khách thuê mẫu
export const TENANTS = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    phone: '0901234567',
    email: 'nguyenvana@email.com',
    idCard: '123456789',
    roomId: '201',
    moveInDate: '2024-01-15',
    status: 'active'
  },
  {
    id: 2,
    name: 'Trần Thị B',
    phone: '0907654321',
    email: 'tranthib@email.com',
    idCard: '987654321',
    roomId: '301',
    moveInDate: '2024-02-01',
    status: 'active'
  },
  {
    id: 3,
    name: 'Lê Văn C',
    phone: '0912345678',
    email: 'levanc@email.com',
    idCard: '456789123',
    roomId: '402',
    moveInDate: '2024-03-10',
    status: 'active'
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    phone: '0918765432',
    email: 'phamthid@email.com',
    idCard: '789123456',
    roomId: '601',
    moveInDate: '2024-01-20',
    status: 'active'
  }
];

// Dữ liệu hợp đồng mẫu
export const CONTRACTS = [
  {
    id: 1,
    tenantId: 1,
    roomId: '201',
    startDate: '2024-01-15',
    endDate: '2025-01-14',
    monthlyRent: 5200000,
    deposit: 10400000,
    status: 'active'
  },
  {
    id: 2,
    tenantId: 2,
    roomId: '301',
    startDate: '2024-02-01',
    endDate: '2025-01-31',
    monthlyRent: 5200000,
    deposit: 10400000,
    status: 'active'
  },
  {
    id: 3,
    tenantId: 3,
    roomId: '402',
    startDate: '2024-03-10',
    endDate: '2025-03-09',
    monthlyRent: 4200000,
    deposit: 8400000,
    status: 'active'
  },
  {
    id: 4,
    tenantId: 4,
    roomId: '601',
    startDate: '2024-01-20',
    endDate: '2025-01-19',
    monthlyRent: 5200000,
    deposit: 10400000,
    status: 'active'
  }
];

// Dữ liệu hóa đơn mẫu
export const INVOICES = [
  {
    id: 1,
    tenantId: 1,
    roomId: '201',
    month: '2024-12',
    rent: 5200000,
    electricity: 150000,
    water: 80000,
    internet: 200000,
    parking: 100000,
    total: 5730000,
    status: 'paid',
    paidDate: '2024-12-05'
  },
  {
    id: 2,
    tenantId: 2,
    roomId: '301',
    month: '2024-12',
    rent: 5200000,
    electricity: 180000,
    water: 90000,
    internet: 200000,
    parking: 100000,
    total: 5770000,
    status: 'pending'
  },
  {
    id: 3,
    tenantId: 3,
    roomId: '402',
    month: '2024-12',
    rent: 4200000,
    electricity: 120000,
    water: 70000,
    internet: 200000,
    parking: 100000,
    total: 4690000,
    status: 'overdue'
  }
];

// Dữ liệu báo cáo sự cố
export const INCIDENTS = [
  {
    id: 1,
    tenantId: 1,
    roomId: '201',
    title: 'Máy lạnh không hoạt động',
    description: 'Máy lạnh phòng 201 không khởi động được',
    status: 'pending',
    priority: 'high',
    createdDate: '2024-12-20',
    resolvedDate: null
  },
  {
    id: 2,
    tenantId: 2,
    roomId: '301',
    title: 'Vòi nước bị rò rỉ',
    description: 'Vòi nước trong phòng tắm bị rò rỉ nhỏ giọt',
    status: 'resolved',
    priority: 'medium',
    createdDate: '2024-12-18',
    resolvedDate: '2024-12-19'
  }
];

// Dữ liệu phản ánh
export const FEEDBACKS = [
  {
    id: 1,
    tenantId: 1,
    title: 'Đề xuất cải thiện hệ thống thang máy',
    content: 'Thang máy thường xuyên chậm, đề xuất bảo trì định kỳ',
    status: 'pending',
    createdDate: '2024-12-15'
  },
  {
    id: 2,
    tenantId: 3,
    title: 'Góp ý về giờ giấc ra vào',
    content: 'Đề xuất mở cửa sớm hơn vào cuối tuần',
    status: 'reviewed',
    createdDate: '2024-12-10'
  }
];

// Dữ liệu thông báo
export const NOTIFICATIONS = [
  {
    id: 1,
    title: 'Thông báo bảo trì hệ thống điện',
    content: 'Tòa nhà sẽ tạm ngừng điện từ 8h-12h ngày 25/12 để bảo trì',
    type: 'maintenance',
    targetRole: 'all',
    createdDate: '2024-12-20',
    isActive: true
  },
  {
    id: 2,
    title: 'Thông báo tăng giá dịch vụ',
    content: 'Từ tháng 1/2025, giá dịch vụ internet tăng lên 250,000đ/tháng',
    type: 'announcement',
    targetRole: 'all',
    createdDate: '2024-12-18',
    isActive: true
  }
];

// Nội quy và quy định
export const RULES = [
  {
    id: 1,
    title: 'Nội quy chung',
    content: `
1. Giữ gìn vệ sinh chung
2. Không gây ồn ào sau 22h
3. Không nuôi thú cưng
4. Báo trước khi có khách qua đêm
5. Tham gia đầy đủ các cuộc họp cư dân
    `,
    type: 'general'
  },
  {
    id: 2,
    title: 'Quy định về thanh toán',
    content: `
1. Thanh toán tiền thuê trước ngày 5 hàng tháng
2. Phí phạt 50,000đ/ngày nếu trễ hạn
3. Tiền cọc bằng 2 tháng tiền thuê
4. Thông báo trước 30 ngày khi muốn chấm dứt hợp đồng
    `,
    type: 'payment'
  }
];