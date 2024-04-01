"use client";

import { useParams } from "next/navigation";

export default function ProfilePage() {
  const { user_id } = useParams();

  return <div>Profile ID: {user_id}</div>;
}
