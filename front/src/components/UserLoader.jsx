import { useEffect, useState } from "react";
import { useUser } from "../context/userContext";
import useApi from "../hooks/useApi";
import Loader from "./Loader";
import Error from "./Error";
import { Link } from "react-router-dom";

export default function UserLoader({ children }) {
  const { setUser } = useUser();
  const api = useApi();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getUser() {
      try {
        const res = await api.getLoggedInUser();
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    getUser();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-96 flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-screen h-96 flex flex-col justify-center items-center">
        <Error
          title="Uh oh, something went wrong"
          description="Sorry! There was a problem with your request"
        />
        <Link
          className="p-3 rounded-lg bg-[#ff9500] text-white font-bold mt-8"
          to="/login"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return children;
}
