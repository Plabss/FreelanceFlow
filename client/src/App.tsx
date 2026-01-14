import { useAuth } from './hooks/useAuth';

function App() {
  const { user, isAuthenticated, login, logout } = useAuth();

  // Simulate a fake login response from the backend
  const handleSimulateLogin = () => {
    const fakeData = {
      access_token: 'fake-jwt-token-12345',
      user: {
        id: 'user-123',
        name: 'Test User',
        email: 'test@example.com',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    };
    login(fakeData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 space-y-6">
      <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg w-96 text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Redux Auth Test</h1>
        
        {/* Status Indicator */}
        <div className={`p-3 rounded-lg mb-4 font-semibold ${isAuthenticated ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          Status: {isAuthenticated ? 'LOGGED IN ✅' : 'LOGGED OUT ❌'}
        </div>

        {/* User Data Display */}
        {isAuthenticated && user && (
          <div className="text-left bg-gray-50 dark:bg-gray-700 p-3 rounded text-sm mb-4">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p className="truncate"><strong>Token:</strong> {localStorage.getItem('token')?.substring(0, 10)}...</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-x-4">
          {!isAuthenticated ? (
            <button 
              onClick={handleSimulateLogin}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
              Simulate Login
            </button>
          ) : (
            <button 
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      <p className="text-gray-500 text-sm">
        Try refreshing the page after login. The state should persist!
      </p>
    </div>
  );
}

export default App;