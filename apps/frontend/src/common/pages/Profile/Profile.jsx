import useLogout from "../../../features/auth/hooks/useLogout";

function Profile() {
  const { logout } = useLogout();
  return (
    <div className="flex size-full max-h-72 max-w-xl flex-col items-center justify-center gap-2 bg-pink-200 text-2xl font-bold text-black">
      <div className="font-bold text-black">Profile</div>
      <button
        className="cursor-pointer rounded bg-gray-500 px-4 py-2 text-black hover:bg-gray-700"
        onClick={() => logout()}
      >
        logout
      </button>
    </div>
  );
}
export default Profile;
