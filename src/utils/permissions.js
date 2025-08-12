// Hệ thống phân quyền
export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  TENANT: 'tenant'
};

export const PERMISSIONS = {
  // Quản lý phòng
  VIEW_ROOMS: 'view_rooms',
  CREATE_ROOM: 'create_room',
  EDIT_ROOM: 'edit_room',
  DELETE_ROOM: 'delete_room',
  
  // Quản lý khách thuê
  VIEW_TENANTS: 'view_tenants',
  CREATE_TENANT: 'create_tenant',
  EDIT_TENANT: 'edit_tenant',
  DELETE_TENANT: 'delete_tenant',
  
  // Quản lý hợp đồng
  VIEW_CONTRACTS: 'view_contracts',
  CREATE_CONTRACT: 'create_contract',
  EDIT_CONTRACT: 'edit_contract',
  DELETE_CONTRACT: 'delete_contract',
  
  // Quản lý hóa đơn
  VIEW_INVOICES: 'view_invoices',
  CREATE_INVOICE: 'create_invoice',
  EDIT_INVOICE: 'edit_invoice',
  DELETE_INVOICE: 'delete_invoice',
  
  // Báo cáo sự cố
  VIEW_INCIDENTS: 'view_incidents',
  CREATE_INCIDENT: 'create_incident',
  EDIT_INCIDENT: 'edit_incident',
  DELETE_INCIDENT: 'delete_incident',
  
  // Phản ánh
  VIEW_FEEDBACKS: 'view_feedbacks',
  CREATE_FEEDBACK: 'create_feedback',
  EDIT_FEEDBACK: 'edit_feedback',
  DELETE_FEEDBACK: 'delete_feedback',
  
  // Quản lý thông báo
  VIEW_NOTIFICATIONS: 'view_notifications',
  CREATE_NOTIFICATION: 'create_notification',
  EDIT_NOTIFICATION: 'edit_notification',
  DELETE_NOTIFICATION: 'delete_notification',
  
  // Nội quy & Quy định
  VIEW_RULES: 'view_rules',
  CREATE_RULE: 'create_rule',
  EDIT_RULE: 'edit_rule',
  DELETE_RULE: 'delete_rule',
  
  // Quản lý chi phí
  VIEW_EXPENSES: 'view_expenses',
  CREATE_EXPENSE: 'create_expense',
  EDIT_EXPENSE: 'edit_expense',
  DELETE_EXPENSE: 'delete_expense',
  
  // Quản lý tài khoản
  VIEW_ACCOUNTS: 'view_accounts',
  CREATE_ACCOUNT: 'create_account',
  EDIT_ACCOUNT: 'edit_account',
  DELETE_ACCOUNT: 'delete_account',
  
  // Quản lý hệ thống
  VIEW_SYSTEM: 'view_system',
  EDIT_SYSTEM: 'edit_system'
};

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    // Admin có tất cả quyền
    ...Object.values(PERMISSIONS)
  ],
  [ROLES.MANAGER]: [
    // Manager có thể thêm tài khoản, tạo khách thuê, tạo hợp đồng và hóa đơn
    PERMISSIONS.VIEW_ROOMS,
    PERMISSIONS.CREATE_ROOM,
    PERMISSIONS.EDIT_ROOM,
    
    PERMISSIONS.VIEW_TENANTS,
    PERMISSIONS.CREATE_TENANT,
    PERMISSIONS.EDIT_TENANT,
    
    PERMISSIONS.VIEW_CONTRACTS,
    PERMISSIONS.CREATE_CONTRACT,
    PERMISSIONS.EDIT_CONTRACT,
    
    PERMISSIONS.VIEW_INVOICES,
    PERMISSIONS.CREATE_INVOICE,
    PERMISSIONS.EDIT_INVOICE,
    
    PERMISSIONS.VIEW_INCIDENTS,
    PERMISSIONS.EDIT_INCIDENT,
    
    PERMISSIONS.VIEW_FEEDBACKS,
    PERMISSIONS.EDIT_FEEDBACK,
    
    PERMISSIONS.VIEW_NOTIFICATIONS,
    PERMISSIONS.CREATE_NOTIFICATION,
    PERMISSIONS.EDIT_NOTIFICATION,
    
    PERMISSIONS.VIEW_RULES,
    
    PERMISSIONS.VIEW_EXPENSES,
    PERMISSIONS.CREATE_EXPENSE,
    PERMISSIONS.EDIT_EXPENSE,
    
    PERMISSIONS.VIEW_ACCOUNTS,
    PERMISSIONS.CREATE_ACCOUNT,
    PERMISSIONS.EDIT_ACCOUNT
  ],
  [ROLES.TENANT]: [
    // Tenant chỉ có thể xem thông tin liên quan đến mình
    PERMISSIONS.VIEW_CONTRACTS,
    PERMISSIONS.VIEW_INVOICES,
    PERMISSIONS.CREATE_INCIDENT,
    PERMISSIONS.VIEW_INCIDENTS,
    PERMISSIONS.CREATE_FEEDBACK,
    PERMISSIONS.VIEW_FEEDBACKS,
    PERMISSIONS.VIEW_NOTIFICATIONS,
    PERMISSIONS.VIEW_RULES
  ]
};

export const hasPermission = (userRole, permission) => {
  if (!userRole || !permission) return false;
  return ROLE_PERMISSIONS[userRole]?.includes(permission) || false;
};

export const canAccess = (userRole, requiredPermissions) => {
  if (!userRole || !requiredPermissions) return false;
  if (typeof requiredPermissions === 'string') {
    return hasPermission(userRole, requiredPermissions);
  }
  return requiredPermissions.some(permission => hasPermission(userRole, permission));
};