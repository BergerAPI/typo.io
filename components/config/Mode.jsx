import React from "react";
import styles from "../../styles/components/config/Checkbox.module.css";

export class Mode extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: props.values,
      currentValue: props.values[0],
    };
  }

  componentDidMount() {
    this.setState({ currentValue: localStorage.getItem(this.props.item) });
  }

  render() {
    let valueList = this.state.values.map((value) => {
      return <p className={this.state.currentValue !== value ? styles.offBox : undefined} onClick={() => {
        this.setState({ currentValue: value });
        localStorage.setItem(this.props.item, value);
      }}>{value}</p>;
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
