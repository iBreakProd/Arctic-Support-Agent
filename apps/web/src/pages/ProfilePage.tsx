import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppShell } from "@/components/layout/AppShell";
import { ProfileForm } from "@/components/profile/ProfileForm";

export function ProfilePage() {
  return (
    <ProtectedRoute>
      <AppShell>
        <main className="lg:pl-24 min-h-screen bg-grid-pattern p-4 md:p-8 lg:pr-8 relative">
          <div className="fixed top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0" />
          <div className="fixed bottom-20 left-40 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none z-0" />
          <div className="relative z-10 max-w-5xl mx-auto pt-24 lg:pt-12">
            <div className="mb-12 border-b border-neutral-border pb-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-xs uppercase tracking-[0.3em] text-primary">Personalized</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-none tracking-tighter mb-4">
                HYDRATION
                <br />
                <span className="text-outline">PROFILE</span>
              </h1>
              <p className="max-w-xl text-gray-400 text-lg md:text-xl font-light leading-relaxed border-l-2 border-primary pl-6">
                Set your activity level, climate, and goals. The AI uses this to tailor hydration advice just for you.
              </p>
            </div>
            <ProfileForm />
          </div>
        </main>
      </AppShell>
    </ProtectedRoute>
  );
}
