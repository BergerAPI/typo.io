import React from "react";
import styles from "../../styles/components/config/Checkbox.module.css";

import { User } from "./User.jsx";
import { db } from "../../util/firebase/firebase.js";

export class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }

  async componentDidMount() {
    let prevUsers = [];
    let users = [];
    const dbRef = db.ref("stats");

    await dbRef
      .once("value")
      .then((snap) => {
        let keys = snap.val();

        var objectKeys = Object.keys(snap.val());
        for (let x = 0; x < objectKeys.length; x++) {
          var currentKey = objectKeys[x];
          var userData = keys[currentKey];

          if (x <= 4) {
            prevUsers.push({
              key: x,
              value: {
                wpm: userData.wpm,
                accuracy: userData.accuracy,
                time: userData.time,
              },
            });
          }
        }
      })
      .then(() => {
        prevUsers.sort((a, b) => {
          return -a.key - -b.key;
        });

        prevUsers.forEach((item) =>
          users.push(
            <User
              title={item.value.wpm}
              description={
                "Accuracy: " +
                item.value.accuracy +
                "% Time: " +
                Math.round((item.value.time / 1000) * 1) / 1 +
                "s"
              }
            />
          )
        );
      })
      .then(() => {
        this.setState({
          users: users,
        });
      });
  }

  render() {
    return <>{this.state.users}</>;
  }
}
