import LoginForm from "../_components/LoginForm";

export default function LoginPage() {
  return (
    <div className=" flex items-center justify-center px-4 grow">
      <div className="w-full max-w-md bg-black text-white rounded-lg shadow-2xl p-8">
        <h1 className="text-2xl font-semibold mb-6">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
