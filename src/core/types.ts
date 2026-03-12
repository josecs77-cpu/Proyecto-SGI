export interface School {
  id: string;
  name: string;
  address: string;
  contactEmail: string;
  contactPhone: string;
  createdAt: string;
  updatedAt: string;
}

export interface Staff {
  id: string;
  schoolId: string;
  firstName: string;
  lastName: string;
  role: 'teacher' | 'admin' | 'principal';
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Enrollment {
  id: string;
  schoolId: string;
  studentFirstName: string;
  studentLastName: string;
  enrollmentDate: string;
  gradeLevel: string;
  status: 'active' | 'inactive' | 'graduated';
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
}
