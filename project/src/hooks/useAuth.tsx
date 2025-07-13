import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { Student } from '../types';

interface AuthContextType {
  user: Student | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('student_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock authentication - in real app, this would call your API
    if (email === 'hemanth@srmap.edu.in' && password === 'password123') {
      const mockUser: Student = {
        id: '1',
        rollNumber: 'AP21110010234',
        name: 'Hemanth Kumar',
        email: 'hemanth@srmap.edu.in',
        phone: '+91 9876543210',
        program: 'B.Tech',
        branch: 'Computer Science and Engineering',
        semester: 6,
        academicYear: '2024-25',
        cgpa: 8.45,
        profilePicture: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
        hostelRoom: 'Block A - 205',
        transportRoute: 'Route 7'
      };
      
      setUser(mockUser);
      localStorage.setItem('student_user', JSON.stringify(mockUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('student_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};