import React from "react";
import styles from "../../styles/components/config/Config.module.css";
import { Config } from "../../util/config";

export class Mode extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: props.values,
      currentValue: props.values[0],
    };
    this.config = new Config()
  }

  componentDidMount() {
    this.config.load()

    this.setState({ currentValue: this.config.get(this.props.item) });
  }

  render() {
    let valueList = this.state.values.map((value) => {
      return (
        <p
          className={
            this.state.currentValue !== value ? styles.offBox : undefined
          }
          onClick={() => {
            this.setState({ currentValue: value });
            this.config.set(this.props.item, value);
          }}
        >
          {value}
        </p>
      );
    });

    return (
      <div className={styles.content}>
        <div>
          <p className={styles.title}>{this.props.title}</p>
          <p className={styles.description}>{this.props.description}</p>
        </div>

        <div className={styles.box}>{valueList}</div>
      </div>
    );
  }
}
