import AuthLayout, { AuthForm } from "./AuthLayout";

export default function Login() {
  const handleLogin = ({ email, password }) => {
    // TODO: panggil API login di sini
    console.log("login", { email, password });
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to see your tasks, notes, and projects - and pick up right where you left off."
      footer={<>Don't have an account? <a href="/register">Sign up</a></>}
    >
      <AuthForm
        buttonLabel="Log In"
        autoComplete="current-password"
        onSubmit={handleLogin}
      />
    </AuthLayout>
  );
}