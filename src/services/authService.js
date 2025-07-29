// Mock authentication service for development
// Replace with actual API calls in production

const mockUsers = [
  {
    id: 1,
    email: 'admin@cravekitchen.com',
    password: 'password123',
    name: 'Admin User',
    role: 'vendor',
  },
];

export const authService = {
  login: async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token: 'mock-jwt-token-' + Date.now(),
    };
  },

  register: async (userData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      role: 'vendor',
    };
    
    mockUsers.push(newUser);
    
    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
      token: 'mock-jwt-token-' + Date.now(),
    };
  },

  forgotPassword: async (email) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return { message: 'Password reset email sent' };
  },

  resetPassword: async (token, newPassword) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { message: 'Password reset successfully' };
  },

  refreshToken: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      token: 'mock-jwt-token-' + Date.now(),
    };
  },
}; 