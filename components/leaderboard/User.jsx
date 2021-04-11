import React from "react";
import styles from "../../styles/components/config/Config.module.css";

export class User extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.content}>
        <img
          style={{
            width: "33px",
            height: "33px",
            margin: "15px",
            borderRadius: "33px",
            backgroundColor: "#FFF"
          }}
          src={this.props.photo}
        />
        <div>
          <p className={styles.title}>{this.props.title}</p>
          <p className={styles.description}>{this.props.description}</p>
        </div>
      </div>
    );
  }
}
