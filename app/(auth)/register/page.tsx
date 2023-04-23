import { UserSignupForm } from "@/components/user-signup-form";

export const metadata = {
  title: "Sign Up",
  description: "Create an account to get started.",
};

export default function RegisterPage() {
  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="hidden h-full bg-black lg:block">
        <div className="flex flex-col items-center justify-center h-full mx-auto max-w-lg">
          <p className="text-white text-xl font-mono font-semibold">
            “Every great developer you know got there by solving problems they
            were unqualified to solve until they actually did it.” 
            <br /> 
            <br /> 
            - Patrick McKenzie.
          </p>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Enter your email below to create your account
            </p>
          </div>
          <UserSignupForm />
        </div>
      </div>
    </div>
  );
}
