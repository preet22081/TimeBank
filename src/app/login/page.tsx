export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-2xl font-semibold">Login</h1>
      <form className="mt-4 w-80 flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
        />
        <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        Don&apos;t have an account? <a href="/register" className="text-blue-600">Register</a>
      </p>
    </div>
  );
}
