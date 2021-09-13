import { useEffect } from "react";

export default function Profile(props) {
  useEffect(() => {
    document.title = props.title || "Smart Brain";
  }, [props.title]);

  return <div>Profile page</div>;
}
