import CategoriesDashboard from "./CategoriesDashboard/CategoriesDashboard";
import ProductDashboard from "./ProductsDashboard.tsx/ProductDashboard";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import { User, Boxes, LogOut, LayoutGrid } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
    prof_image_url: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<
    "products" | "categories" | "profile"
  >("products");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

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
      onClick: () => setActiveTab("profile"),
      icon: (
        <User className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Logout",
      onClick: handleLogout,
      icon: (
        <LogOut className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/verify-token`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.data.valid) {
          throw new Error("Token invalid");
        }

        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          setUser(res.data.user);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
      }
    };

    verifyToken();
  }, [navigate]);

  return (
    <div className="flex h-screen">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {/* {open ? <Logo /> : < />} */}
            <div className="mt-8 flex flex-col gap-2 cursor-pointer">
              {links.map((link, idx) => (
                <div key={idx} onClick={link.onClick}>
                  <SidebarLink
                    link={{
                      label: link.label,
                      icon: link.icon,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              className="cursor-pointer"
              link={{
                label: `${user?.firstName} ${user?.lastName}`,
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
