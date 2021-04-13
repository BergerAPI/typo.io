import React from "react";
import styles from "../../styles/components/config/Config.module.css";
import { Config } from "../../util/config";

export class Checkbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activated: false,
    };
    this.config = new Config()
  }

  componentDidMount() {
    this.config.load()
    this.setState({ activated: this.config.get(this.props.item) });
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
              this.state.activated ? styles.offBox : undefined
            }
            onClick={() => {
              this.setState({ activated: false });
              this.config.set(this.props.item, false);
            }}
          >
            Disable
          </p>
          <p
            className={
              !this.state.activated ? styles.offBox : undefined
            }
            onClick={() => {
              this.setState({ activated: true });
              this.config.set(this.props.item, true);
            }}
          >
            Activate
          </p>
        </div>
      </div>
    );
  }
}
