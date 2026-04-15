import useLogout from "../../features/auth/hooks/useLogout";

function Profile() {
  const {logout} = useLogout();
  return (
    <div className="profileContainer">
      <div>Profile</div>
      <button className="profile__logout_button" onClick={()=>logout()}>
        logout
      </button>
    </div>
  );
}
export default Profile;
