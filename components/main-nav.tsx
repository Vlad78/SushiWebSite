"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Category, ResponseWrapper } from "@/types";
import style from "./styles/main-nav.module.scss";
import Image from "next/image";

const MainNav: React.FC<ResponseWrapper<Category>> = ({ data }) => {
  const pathname = usePathname();

  const size = { height: 40, width: 40 };

  const routes = data.map((e) => {
    return {
      href: e.attributes.url,
      label: e.attributes.title,
      // img: e.attributes.img.data?.[0].attributes.formats.thumbnail.url,
      active: pathname === e.attributes.url,
    };
  });

  return (
    <nav
      className={`${
        style["main-nav-container"] + " " + style["main-nav-mask"]
      }  p-6 space-x-4 lg:space-x-6`}
    >
      {routes.map((route) => (
        <Link href={route.href} key={route.href}>
          <div
            className={`${style["main-nav-button"]} ${cn(
              "font-medium transition-colors hover:text-black",
              route.active ? "text-black bg-orange-200" : "bg-white text-neutral-500"
            )}`}
            key={route.href}
          >
            <div style={size} className="flex items-center">
              {/* {route.img && <Image src={route.img} alt={route.label} {...size} />} */}
            </div>
            <span>{route.label}</span>
          </div>
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
