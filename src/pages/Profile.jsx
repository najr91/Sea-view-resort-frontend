import { useAuth } from "../context/AuthContext";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { ProfileInfo } from "../components/profile/ProfileInfo";

function Profile() {
  const { user, profileImage } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <ProfileHeader user={user} profileImage={profileImage} />

        <div className="mt-8">
          <ProfileInfo user={user} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
