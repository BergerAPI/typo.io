import React from "react";
import styles from "../../styles/components/config/Config.module.css";

export class User extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let list = [];
    this.props.badges.forEach((badge) => {
      list.push(<p style={{color: "black" }}>{badge}</p>);
    });

    return (
      <div className={styles.content}>
        <img
          style={{
            width: "33px",
            height: "33px",
            margin: "15px",
            borderRadius: "33px",
            backgroundColor: "#FFF",
          }}
          src={this.props.photo}
        />
        <div>
          <p className={styles.title} style={{display: "flex", marginLeft: "3px"}}>
            {this.props.title}
            <div style={{ borderRadius: "3px", backgroundColor: "yellow" }}>
              {list}
            </div>
          </p>
          <p className={styles.description}>{this.props.description}</p>
        </div>
      </div>
    );
  }
}
