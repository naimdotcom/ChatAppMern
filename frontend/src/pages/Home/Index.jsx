import React, { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";

function Home() {
  const { authUser } = useAuthStore();

  useEffect(() => {
    console.log(authUser);
  }, []);
  return <div>Home</div>;
}

export default Home;
