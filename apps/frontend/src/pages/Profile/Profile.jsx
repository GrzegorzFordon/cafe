import useLogout from "../../features/auth/hooks/useLogout";

function Profile() {
  const { logout } = useLogout();
  return (
    <div className="flex flex-col size-full max-w-lg shadow max-h-1/3  gap-24 rounded bg-pink-900 justify-center items-center">
      <div className="font-bold text-black">Profile</div>
      <button
        className="bg-gray-500 hover:bg-gray-700 text-black rounded px-4 py-2"
        onClick={() => logout()}
      >
        logout
      </button>
    </div>
  );
}
export default Profile;
