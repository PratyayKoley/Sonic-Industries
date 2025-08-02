"use client";

import CategoriesDashboard from "./CategoriesDashboard/page";
import ProductDashboard from "./ProductsDashboard/page";
import DealsDashboard from "./DealsDashboard/page";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import { Boxes, LogOut, LayoutGrid, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

const AdminDashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
    prof_image_url: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<
    "products" | "categories" | "deals"
  >("products");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.replace("/login");
  };

  const links = [
    {
      label: "Products",
      onClick: () => setActiveTab("products"),
      icon: <Boxes className="h-5 w-5 shrink-0 text-neutral-700" />,
    },
    {
      label: "Categories",
      onClick: () => setActiveTab("categories"),
      icon: <LayoutGrid className="h-5 w-5 shrink-0 text-neutral-700" />,
    },
    {
      label: "Deals",
      onClick: () => setActiveTab("deals"),
      icon: <Tag className="h-5 w-5 shrink-0 text-neutral-700" />,
    },
    {
      label: "Logout",
      onClick: handleLogout,
      icon: <LogOut className="h-5 w-5 shrink-0 text-neutral-700" />,
    },
  ];
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/verify-token`,
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
        router.replace("/login");
      }
    };

    verifyToken();
  }, [router]);

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
                  <Image
                    src={user?.prof_image_url || ""}
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
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
        {activeTab === "products" && <ProductDashboard />}
        {activeTab === "categories" && <CategoriesDashboard />}
        {activeTab === "deals" && <DealsDashboard />}
      </div>
    </div>
  );
};

export default AdminDashboard;
