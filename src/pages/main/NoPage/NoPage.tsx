import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function NoPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);
  return <>404</>;
}
