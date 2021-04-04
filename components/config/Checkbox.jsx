import React from "react";
import styles from "../../styles/components/config/Checkbox.module.css";

export class Checkbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activated: "false",
    };
  }

  componentDidMount() {
    this.setState({ activated: localStorage.getItem(this.props.item) });
  }

  render() {
    return (
      <div className={styles.content}>
        <div>
          <p className={styles.title}>{this.props.title}</p>
          <p className={styles.description}>{this.props.description}</p>
        </div>

        <div className={styles.box}>
          <p
            className={
              this.state.activated == "true" ? styles.offBox : undefined
            }
            onClick={() => {
              this.setState({ activated: "false" });
              localStorage.setItem(this.props.item, "false");
            }}
          >
            Disable
          </p>
          <p
            className={
              this.state.activated != "true" ? styles.offBox : undefined
            }
            onClick={() => {
              this.setState({ activated: "true" });
              localStorage.setItem(this.state.item, "true");
            }}
          >
            Activate
          </p>
        </div>
      </div>
    );
  }
}
