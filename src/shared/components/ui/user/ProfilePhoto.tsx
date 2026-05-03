import { useAuth } from "@/features/auth/hooks/useAuth";
import type { UserDoc } from "@/features/auth/types/user.types";

import { memo, useState } from "react";

interface ProfilePhotoProps {
  anotherUser?: UserDoc | null;
}

export const ProfilePhoto = memo(({ anotherUser }: ProfilePhotoProps) => {
  const { user } = useAuth();

  const [imageError, setImageError] = useState(false);

  const targetUser = anotherUser || user;

  if (targetUser?.photoURL && !imageError) {
    return (
      <img
        src={targetUser.photoURL}
        alt="Profile"
        className="w-8 h-8 rounded-full object-cover shrink-0"
        onError={() => setImageError(true)}
      />
    );
  }

  return (
    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium shrink-0">
      {targetUser?.username?.charAt(0).toUpperCase()}
    </div>
  );
});
