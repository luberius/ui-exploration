import { Outlet, NavLink } from "react-router";

export default function ModulesLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <main>
        <Outlet />
      </main>
    </div>
  );
}
