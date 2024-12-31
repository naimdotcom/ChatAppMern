import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

function Profile() {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const [userInfo, setUserInfo] = useState({});

  const handleImageUpload = async (e) => {
    const formdata = new FormData();
    setSelectedImg(URL.createObjectURL(e.target.files[0]));

    formdata.append("image", e.target.files[0]);

    if (!formdata) return;
    await updateProfile(formdata);
  };

  useEffect(() => {
    setUserInfo(authUser ? authUser : {});
  }, [authUser, setUserInfo]);

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl p-4 py-8 mx-auto">
        <div className="p-6 space-y-8 bg-base-300 rounded-xl">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* avatar upload section */}

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg ? selectedImg : userInfo.profilePicture}
                alt="Profile"
                className="object-cover border-4 rounded-full size-32 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
              absolute bottom-0 right-0 
              bg-base-content hover:scale-105
              p-2 rounded-full cursor-pointer 
              transition-all duration-200
              ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
            `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {userInfo.name}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {userInfo?.email}
              </p>
            </div>
          </div>

          <div className="p-6 mt-6 bg-base-300 rounded-xl">
            <h2 className="mb-4 text-lg font-medium">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{userInfo.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
