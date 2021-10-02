import { useEffect, useState } from "react";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import Preloader from "../../components/UI/Preloader/Preloader";
import styles from "./Rankings.module.css";
import numberGenerator from "../../helpers/numberGenerator";

export default function Rankings(props) {
  console.log("[Rankings rendered]");

  const [fetchedUsers, setFetchedUsers] = useState([]);

  const generatorObj = numberGenerator();

  useEffect(() => {
    document.title = props.title || "Smart Brain";
    let arrOfUsers = [];
    fetch(
      "https://smart-brain-8a35a-default-rtdb.asia-southeast1.firebasedatabase.app/users.json"
    )
      .then((res) => res.json())
      .then((data) => {
        for (const user in data) {
          arrOfUsers.push({
            id: user,
            username: data[user].username,
            email: data[user].email,
            points: data[user].points,
          });
        }
        arrOfUsers.sort((a, b) => b.points - a.points);
        arrOfUsers = arrOfUsers.filter((user, index) => index < 10);
        setFetchedUsers(arrOfUsers);
      });
    return () => {
      arrOfUsers = [];
    };
  }, [props.title]);

  return (
    <section className="pa4">
      <main className="overflow-hidden">
        <table className="w-100 mw8 center" cellSpacing="0">
          <thead>
            <tr className="stripe-dark">
              <th className="fw6 tl pa3 bg-white">Top</th>
              <th className="fw6 tl pa3 bg-white">Username</th>
              <th className={"fw6 tl pa3 bg-white ".concat(styles.emailCol)}>
                Email
              </th>
              <th className="fw6 tl pa3 bg-white">Points</th>
            </tr>
          </thead>
          <tbody className="lh-copy">
            {!fetchedUsers.length && (
              <tr>
                <th
                  style={{ position: "relative", height: "560px" }}
                  colSpan="4"
                >
                  <Backdrop>
                    <Preloader>Please wait...</Preloader>
                  </Backdrop>
                </th>
              </tr>
            )}
            {fetchedUsers &&
              fetchedUsers.map((user) => (
                <tr className="stripe-dark" key={user.id}>
                  <th className="pa3 tl">{generatorObj.next().value}</th>
                  <td className="pa3">@{user.username}</td>
                  <td className={"pa3 ".concat(styles.EmailCol)}>
                    {user.email}
                  </td>
                  <td className="pa3">{user.points}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </main>
    </section>
  );
}
