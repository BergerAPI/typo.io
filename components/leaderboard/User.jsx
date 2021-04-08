import React from "react";
import styles from "../../styles/components/config/Checkbox.module.css";

export class User extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.content}>
        <div>
          <p className={styles.title}>{this.props.title}</p>
          <p className={styles.description}>{this.props.description}</p>
        </div>
      </div>
    );
  }
}
