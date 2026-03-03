export const UserRole = {
  CUSTOMER: "Customer",
  MANAGER: "Manager",
  STAFF: "Staff",
  CONSULTANT: "Consultant",
  ADMIN: "Admin",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
