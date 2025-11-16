import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-primary-700 text-center mb-2 md:text-4xl">
          LOGIN
        </h1>
        <p className="text-gray-600 text-center mb-4">Enter your name</p>
        <LoginForm />
      </div>
    </div>
  );
}
