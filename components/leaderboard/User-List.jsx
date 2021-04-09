import React from "react";
import MoonLoader from "react-spinners/MoonLoader";

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
    const snapshot = await db.collection("stats").get();

    snapshot.docs.map((doc) => {
      let data = doc.data();
      prevUsers.push({
        wpm: data.wpm,
        accuracy: data.accuracy,
        time: data.time,
      });
    });

    prevUsers.sort((a, b) => {
      return -a.accuracy - -b.accuracy;
    });

    prevUsers.sort((a, b) => {
      return -a.wpm - -b.wpm;
    });

    prevUsers.forEach((item) =>
      users.push(
        <User
          title={item.wpm}
          description={
            "Accuracy: " +
            item.accuracy +
            "% Time: " +
            Math.round((item.time / 1000) * 1) / 1 +
            "s"
          }
        />
      )
    );

    this.setState({
      users: users,
    });
  }

  render() {
    return (
      <>
        {this.state.users}

        {(() => {
          if (this.state.users.length === 0) {
            return <MoonLoader color={"#FFF"} loading={true} />;
          }
        })()}
      </>
    );
  }
}
