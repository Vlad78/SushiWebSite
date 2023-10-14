"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import cartIcon from "@/public/profile @100.webp";
import usePreviewModal from "../hooks/use-preview-modal";
import AuthModal from "./modal-auth";
import { useRouter } from "next/navigation";
import { useFetchUser, useUser } from "../lib/authContext";

type ImgParams = {
  imgParams: {
    width: number;
    height: number;
    quality: number;
    priority: boolean;
  };
};

const ProfileIcon: React.FC<ImgParams> = ({ imgParams }) => {
  const modal = usePreviewModal();
  const router = useRouter();
  const { loading, user } = useUser();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <>
        <Image src={cartIcon} alt="profile" {...imgParams}></Image>
        <p>profil</p>
      </>
    );
  }

  return (
    <button
      onClick={() => {
        if (user) {
          return router.push("/profile");
        } else {
          return modal.onOpen(
            <div className="flex flex-col m-2 pt-8">
              <AuthModal />
            </div>
          );
        }
      }}
      disabled={loading}
    >
      <Image src={cartIcon} alt="profile" {...imgParams}></Image>
      {loading || user ? "" : <span>?</span>}
      <p>profil</p>
    </button>
  );
};

export default ProfileIcon;
