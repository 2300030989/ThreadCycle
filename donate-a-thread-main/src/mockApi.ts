// Mock API Utility to make the app work on GitHub Pages without a backend
// Data is stored in the browser's localStorage

const STORAGE_KEY_USERS = 'mock_users';
const STORAGE_KEY_PICKUPS = 'mock_pickups';

const getFromStorage = (key: string) => JSON.parse(localStorage.getItem(key) || '[]');
const saveToStorage = (key: string, data: any) => localStorage.setItem(key, JSON.stringify(data));

export const mockApi = {
  signup: async (userData: any) => {
    const users = getFromStorage(STORAGE_KEY_USERS);
    const newUser = { ...userData, id: Date.now() };
    users.push(newUser);
    saveToStorage(STORAGE_KEY_USERS, users);
    return { data: { token: 'mock-token', user: newUser } };
  },

  login: async (credentials: any) => {
    const users = getFromStorage(STORAGE_KEY_USERS);
    const user = users.find((u: any) => u.email === credentials.email && u.password === credentials.password);
    if (!user) throw new Error('Invalid credentials');
    return { data: { token: 'mock-token', user } };
  },

  createPickup: async (pickupData: any) => {
    const pickups = getFromStorage(STORAGE_KEY_PICKUPS);
    const newPickup = { ...pickupData, id: Math.floor(Math.random() * 10000), status: 'Scheduled', createdAt: new Date().toISOString() };
    pickups.push(newPickup);
    saveToStorage(STORAGE_KEY_PICKUPS, pickups);
    return { data: newPickup };
  },

  getPickups: async () => {
    return { data: getFromStorage(STORAGE_KEY_PICKUPS) };
  }
};
