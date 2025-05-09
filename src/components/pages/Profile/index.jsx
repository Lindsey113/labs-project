/**
 * TODO: Ticket 3:
 * Implement authentication using Auth0:
 * - Get the user data from Auth0
 * - Create and style the component
 * - Display the data
 * - Make this page a protected Route
 */
import { useAuth0 } from "@auth0/auth0-react"
import { LoggingButtons } from "../../../auth/LoggingButtons";
const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) return <div>Loading...</div>;


  return isAuthenticated && (
    <div className="flex justify-center m-14">
      <div className="flex-c p-10 bg-white shadow-xl">
        <img src={user.picture} alt={user.name} />
        <h2 className="pt-3 text-lg font-semibold">{user.nickname}</h2>
        <p className="text-gray pb-3">{user.email}</p>
        <LoggingButtons />
      </div>
    </div>
  );
};

export default Profile;
