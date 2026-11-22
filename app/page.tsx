import RequireAuth from "@/components/auth/RequireAuth";
import Homepage from "@/components/homepage/Homepage";

export default function Home() {
  return (
    <RequireAuth desktopOnly>
      <main className="max-w-full overflow-hidden">
        <Homepage />
      </main>
    </RequireAuth>
  );
}
