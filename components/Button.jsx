import Link from "next/link";
import React from "react";
import styles from '../styles/components/Button.css'

export class Button extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
      return (
          <Link href={this.props.href}>
            <button className={styles.button}>
                <a>{this.props.text}</a>
            </button>
          </Link>
        );
    }
  }