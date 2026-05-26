import Link from "next/link";
import { AuthCard } from "../../components/auth/AuthCard";
import { GoogleAuthButton } from "../../components/auth/GoogleAuthButton";
import { Button } from "../../components/ui/Button";

export default function SignupPage() {
  return (
    <AuthCard
      title="Create your account"
      subtitle="Start your journey with Lumina today"
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/login"
            className="cursor-default font-medium text-violet-400 transition-colors hover:text-violet-300"
          >
            Log in
          </Link>
        </>
      }
    >
      <div className="space-y-4">
        <GoogleAuthButton label="Sign up with Google" />

        <Link href="/signup/email" className="block">
          <Button variant="outline" size="lg" className="w-full">
            Continue with Email
          </Button>
        </Link>
      </div>
    </AuthCard>
  );
}
