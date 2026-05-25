import { PublicNavbar } from "../components/layout/PublicNavbar";
import { Footer } from "../components/layout/Footer";
import { Hero } from "../components/landing/Hero";
import { Features } from "../components/landing/Features";
import { AuthRedirect } from "../components/auth/AuthRedirect";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <AuthRedirect />
      <PublicNavbar />
      <main className="flex-1">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
