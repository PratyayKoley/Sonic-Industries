import CategoriesDashboard from "./CategoriesDashboard";
import ProductDashboard from "./ProductDashboard";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import { User, Boxes, LogOut, LayoutGrid } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const AdminDashboard = () => {
  const location = useLocation();
  const user = location.state?.user;
  const [activeTab, setActiveTab] = useState<"products" | "categories">(
    "products"
  );

  const links = [
    {
      label: "Products",
      onClick: () => setActiveTab("products"),
      icon: (
        <Boxes className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Categories",
      onClick: () => setActiveTab("categories"),
      icon: (
        <LayoutGrid className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <User className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <LogOut className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div className="flex h-screen">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {/* {open ? <Logo /> : < />} */}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <div key={idx} onClick={link.onClick}>
                  <SidebarLink
                    link={{
                      label: link.label,
                      href: link.href ?? "#",
                      icon: link.icon,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: `${user?.firstName} ${user?.lastName}`,
                href: "#",
                icon: (
                  <img
                    src={user?.prof_image_url}
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-neutral-900">
        {activeTab === "products" && <ProductDashboard />}
        {activeTab === "categories" && <CategoriesDashboard />}
      </div>
    </div>
  );
};

export default AdminDashboard;
