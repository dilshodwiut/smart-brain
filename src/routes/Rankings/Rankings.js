import React, { useEffect, useState, useCallback } from "react";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import Preloader from "../../components/UI/Preloader/Preloader";
import styles from "./Rankings.module.css";
import numberGenerator from "../../helpers/numberGenerator";

function Rankings(props) {
  console.log("[Rankings rendered]");

  const [fetchedUsers, setFetchedUsers] = useState([]);

  const generatorObj = numberGenerator();

  const fetchTopUsers = useCallback(async function (url) {
    let arrOfUsers = [];
    const response = await fetch(url);
    const data = await response.json();
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
  }, []);

  useEffect(() => {
    document.title = props.title || "Smart Brain";

    fetchTopUsers(
      "https://smart-brain-8a35a-default-rtdb.asia-southeast1.firebasedatabase.app/users.json"
    );
  }, [props.title, fetchTopUsers]);

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
            {fetchedUsers.length
              ? fetchedUsers.map((user) => (
                  <tr className="stripe-dark" key={user.id}>
                    <th className="pa3 tl">{generatorObj.next().value}</th>
                    <td className="pa3">@{user.username}</td>
                    <td className={"pa3 ".concat(styles.emailCol)}>
                      {user.email}
                    </td>
                    <td className="pa3">{user.points}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </main>
    </section>
  );
}

export default React.memo(Rankings);
