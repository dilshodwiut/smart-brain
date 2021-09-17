import { useEffect, useState } from "react";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import Preloader from "../../components/UI/Preloader/Preloader";

export default function Rankings(props) {
  console.log("[Rankings rendered]");

  useEffect(() => {
    document.title = props.title || "Smart Brain";
  }, [props.title]);

  const [fetchedUsers, setFetchedUsers] = useState([]);

  function* numberGenerator() {
    let num = 1;
    while (true) {
      yield num;
      num++;
    }
  }

  const generatorObj = numberGenerator();

  useEffect(() => {
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
      // that doesn't work for some reason
      // for (let i = 0; i < arrOfUsers.length; i++ ) {
      //   arrOfUsers.pop()
      // };
      arrOfUsers = [];
    };
  }, []);

  return (
    <div className="pa4">
      <div className="overflow-auto">
        <table className="w-100 mw8 center" cellSpacing="0">
          <thead>
            <tr className="stripe-dark">
              <th className="fw6 tl pa3 bg-white">Top</th>
              <th className="fw6 tl pa3 bg-white">Username</th>
              <th className="fw6 tl pa3 bg-white">Email</th>
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
                  <td className="pa3">{user.email}</td>
                  <td className="pa3">{user.points}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
