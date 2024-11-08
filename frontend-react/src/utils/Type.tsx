export interface AuthContextType {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

export interface AuthProps {
  children: React.ReactNode
}

export interface MahasiswaInterface {
  id: string;
  name: string;
  nim: string;
  jurusan: string;
  angkatan: string;
}
