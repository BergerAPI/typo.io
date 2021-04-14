import React from "react";
import MoonLoader from "react-spinners/MoonLoader";

import { User } from "./User.jsx";
import { db } from "../../util/firebase/firebase.js";
import { Config } from "../../util/config.js";

export class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      dailyUsers: [],
    };
  }

  statisticToHtml(item) {
    var sec = Math.round(((Date.now() - item.timeStamp) / 1000) * 1) / 1;
    var mind = sec % (60 * 60);
    var minutes = Math.floor(mind / 60);

    var secd = mind % 60;
    var seconds = Math.ceil(secd);

    return (
      <User
        title={item.displayName}
        description={
          "WPM: " +
          item.wpm +
          " Accuracy: " +
          item.accuracy +
          "% Time: " +
          Math.round((item.time / 1000) * 1) / 1 +
          "s, " +
          minutes +
          "m " +
          seconds +
          "s ago"
        }
        photo={item.photo}
        badges={[]}
      />
    );
  }

  async componentDidMount() {
    let prevUsers = [];
    let users = [];
    let dailyUsers = [];

    await new Config().loadTheme()

    const snapshot = await db.collection("stats").get();

    snapshot.docs.map((doc, index) => {
      let data = doc.data();

      prevUsers.push({
        wpm: data.wpm,
        accuracy: data.accuracy,
        time: data.time,
        timeStamp: data.timeStamp,
        photo: data.photo,
        displayName: data.displayName,
      });
    });

    prevUsers.sort((a, b) => {
      return -a.accuracy - -b.accuracy;
    });

    prevUsers.sort((a, b) => {
      return -a.wpm - -b.wpm;
    });

    prevUsers.forEach((item, index) => {
      if (index <= 4) users.push(this.statisticToHtml(item));
    });

    prevUsers
      .filter((user) => {
        const today = new Date();
        const date = new Date(user.timeStamp);

        return (
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear()
        );
      })
      .forEach((item, index) => {
        if (index <= 4) dailyUsers.push(this.statisticToHtml(item));
      });

    this.setState({
      users: users,
      dailyUsers: dailyUsers,
    });
  }

  render() {
    let paragraphStyle = {
      display: "flex",
      justifyContent: "center",
      "font-family": "monospace",
      fontSize: "200%",
      color: "var(--text-color)"
    };

    if (this.state.users.length === 0)
      return <MoonLoader color={"#FFF"} loading={true} />;
    else
      return (
        <div
          style={{
            display: "flex",
          }}
        >
          <div>
            <p style={paragraphStyle}>Alltime</p>
            {this.state.users}
          </div>
          <div>
            <p style={paragraphStyle}>Daily</p>
            {this.state.dailyUsers}
          </div>
        </div>
      );
  }
}
