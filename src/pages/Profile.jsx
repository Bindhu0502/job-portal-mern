import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../api/api";
import Loader from "../components/common/Loader";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileInfo from "../components/profile/ProfileInfo";
import ResumeCard from "../components/profile/ResumeCard";
import EditProfileModal from "../components/profile/EditProfileModal";
import ChangePasswordModal from "../components/profile/ChangePasswordModal";

import "../styles/profile.css";

function Profile() {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [showEdit, setShowEdit] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get("/users/profile");

      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);

      toast.error("Unable to load profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="profile-page">

      <div className="profile-container">

        <ProfileHeader
          user={user}
          refreshProfile={fetchProfile}
        />

        <ProfileInfo
          user={user}
          onEdit={() => setShowEdit(true)}
          onPassword={() =>
            setShowPassword(true)
          }
        />

        <ResumeCard
          user={user}
          refreshProfile={fetchProfile}
        />

      </div>

      {showEdit && (
        <EditProfileModal
          user={user}
          refreshProfile={fetchProfile}
          closeModal={() =>
            setShowEdit(false)
          }
        />
      )}

      {showPassword && (
        <ChangePasswordModal
          closeModal={() =>
            setShowPassword(false)
          }
        />
      )}

    </div>
  );
}

export default Profile;