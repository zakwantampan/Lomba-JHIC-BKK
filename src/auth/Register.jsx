import AuthLayout, { AuthForm } from "./AuthLayout";

export default function Register() {
  const handleRegister = ({ email, password }) => {
    // TODO: panggil API register di sini
    console.log("register", { email, password });
  };

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Access your tasks, notes, and projects anytime, anywhere - and keep everything flowing in one place."
      footer={<>Already have an account? <a href="/login">Log in</a></>}
    >
      <AuthForm
        buttonLabel="Get Started"
        autoComplete="new-password"
        onSubmit={handleRegister}
      />
    </AuthLayout>
  );
}