// Mock data cho hệ thống CRM
export const mockUsers = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'Quản trị viên',
    email: 'admin@apartment.com',
    phone: '0123456789'
  },
  {
    id: 2,
    username: 'manager',
    password: 'manager123',
    role: 'manager',
    name: 'Nguyễn Văn A',
    email: 'manager@apartment.com',
    phone: '0987654321'
  },
  {
    id: 3,
    username: 'tenant1',
    password: 'tenant123',
    role: 'tenant',
    name: 'Trần Thị B',
    email: 'tenant1@gmail.com',
    phone: '0369852147',
    roomId: 101
  }
];

export const mockRooms = [
  {
    id: 101,
    roomNumber: '101',
    floor: 1,
    type: '1PN',
    area: 45,
    price: 8000000,
    status: 'occupied', // occupied, available, maintenance
    description: 'Phòng 1 phòng ngủ, đầy đủ nội thất',
    tenantId: 3
  },
  {
    id: 102,
    roomNumber: '102',
    floor: 1,
    type: '2PN',
    area: 65,
    price: 12000000,
    status: 'available',
    description: 'Phòng 2 phòng ngủ, view đẹp'
  },
  {
    id: 201,
    roomNumber: '201',
    floor: 2,
    type: '1PN',
    area: 45,
    price: 8500000,
    status: 'maintenance',
    description: 'Phòng đang bảo trì'
  }
];

export const mockTenants = [
  {
    id: 1,
    name: 'Trần Thị B',
    phone: '0369852147',
    email: 'tenant1@gmail.com',
    idCard: '123456789012',
    address: 'Hà Nội',
    roomId: 101,
    moveInDate: '2024-01-15',
    deposit: 16000000,
    status: 'active'
  }
];

export const mockContracts = [
  {
    id: 1,
    tenantId: 1,
    roomId: 101,
    startDate: '2024-01-15',
    endDate: '2025-01-14',
    monthlyRent: 8000000,
    deposit: 16000000,
    status: 'active',
    terms: 'Hợp đồng thuê phòng 12 tháng'
  }
];

export const mockInvoices = [
  {
    id: 1,
    tenantId: 1,
    roomId: 101,
    month: '2024-12',
    rent: 8000000,
    electricity: 150000,
    water: 80000,
    internet: 200000,
    parking: 300000,
    other: 0,
    total: 8730000,
    status: 'paid',
    dueDate: '2024-12-05',
    paidDate: '2024-12-03'
  },
  {
    id: 2,
    tenantId: 1,
    roomId: 101,
    month: '2025-01',
    rent: 8000000,
    electricity: 180000,
    water: 90000,
    internet: 200000,
    parking: 300000,
    other: 50000,
    total: 8820000,
    status: 'pending',
    dueDate: '2025-01-05'
  }
];

export const mockIncidents = [
  {
    id: 1,
    tenantId: 1,
    roomId: 101,
    title: 'Máy lạnh không hoạt động',
    description: 'Máy lạnh phòng 101 không chạy từ sáng nay',
    status: 'pending',
    priority: 'high',
    reportDate: '2024-12-20',
    category: 'equipment'
  }
];

export const mockFeedbacks = [
  {
    id: 1,
    tenantId: 1,
    title: 'Đề xuất cải thiện wifi',
    content: 'Tốc độ wifi trong tòa nhà còn chậm, đề xuất nâng cấp',
    status: 'pending',
    submitDate: '2024-12-18',
    type: 'suggestion'
  }
];

export const mockNotifications = [
  {
    id: 1,
    title: 'Thông báo bảo trì thang máy',
    content: 'Thang máy sẽ được bảo trì vào ngày 25/12/2024',
    type: 'maintenance',
    targetRole: 'all',
    createdDate: '2024-12-20',
    isActive: true
  }
];

export const mockRules = [
  {
    id: 1,
    title: 'Quy định về giờ giấc',
    content: 'Không gây ồn sau 22h00 và trước 6h00',
    category: 'noise',
    isActive: true
  },
  {
    id: 2,
    title: 'Quy định về khách',
    content: 'Khách qua đêm phải đăng ký với ban quản lý',
    category: 'visitors',
    isActive: true
  }
];

export const mockExpenses = [
  {
    id: 1,
    description: 'Bảo trì thang máy',
    amount: 5000000,
    category: 'maintenance',
    date: '2024-12-15',
    status: 'paid'
  },
  {
    id: 2,
    description: 'Tiền điện chung',
    amount: 2000000,
    category: 'utilities',
    date: '2024-12-10',
    status: 'paid'
  }
];