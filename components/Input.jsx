import React from "react";
import styles from "../styles/components/Input.module.css";

export class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      typedText: "",
      remainingText: this.props.text,
      fullText: this.props.text,
      errorCount: 0,
      validLetters: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVW.?!;:,' ",
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyPressed.bind(this), false);

    String.prototype.removeCharAt = function (i) {
      var tmp = this.split("");
      tmp.splice(i - 1, 1);
      return tmp.join("");
    };
  }

  onKeyPressed(e) {
    if (this.state.index >= this.state.fullText.length) {
      alert("finished");
    } else {
      if (this.state.validLetters.includes(e.key)) {
        if (e.key === this.state.fullText[this.state.index]) {
          this.state.typedText += this.state.fullText[this.state.index];

          console.log("samuel!!");
        } else {
          this.state.errorCount += 1;
          this.state.typedText += e.key;
        }

        this.state.remainingText = this.state.remainingText.slice(
          1,
          this.state.remainingText.length
        );
        this.setState({ index: this.state.index + 1 });
      } else {
        if (e.keyCode == 8 && this.state.index > 0) {
          this.setState({
            remainingText:
              this.state.fullText[this.state.index - 1] + this.state.remainingText,
          });
          this.setState({ index: (this.state.index -= 1) });
          this.setState({
            typedText: this.state.typedText.removeCharAt(
              this.state.typedText.length
            ),
          });
        }
      }
    }
  }

  render() {
    return (
      <div>
        <p>
          <a className={styles.typed}>{this.state.typedText}</a>
          <a className={styles.remaining}>{this.state.remainingText}</a>
        </p>
      </div>
    );
  }
}
