"use client";

import React from "react";
import { useFetchUser, useUser } from "@/lib/authContext";
import Container from "../../../components/ui/container";

const ProfilePage = () => {
  // const { loading, user } = useFetchUser();
  const { loading, user } = useUser();
  return (
    <Container>
      <div>ProfilePage</div>
      <div>{loading.toString()}</div>
      <div>{user?.phoneNumber}</div>
    </Container>
  );
};

export default ProfilePage;
