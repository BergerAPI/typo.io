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
      validLetters: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVW.?!;:," ',
    };
  }

  componentDidMount() {
    document.addEventListener(
      "keydown",
      (event) => {
        if (this.state.validLetters.includes(event.key))
          this.handleValidInput(event);
        else if (event.keyCode == 8 && this.state.index > 0)
          this.handleBackspace();
      },
      false
    );

    String.prototype.removeCharAt = function (i) {
      var tmp = this.split("");
      tmp.splice(i - 1, 1);
      return tmp.join("");
    };
  }

  handleBackspace() {
    this.setState({
      remainingText:
        this.state.fullText[this.state.index - 1] + this.state.remainingText,
    });
    this.setState({ index: (this.state.index -= 1) });
    this.setState({
      typedText: this.state.typedText.removeCharAt(this.state.typedText.length),
    });
  }

  handleValidInput(event) {
    if (event.key === this.state.fullText[this.state.index]) {
      this.state.typedText += this.state.fullText[this.state.index];
      this.state.remainingText = this.state.remainingText.slice(
        1,
        this.state.remainingText.length
      );
      this.setState({ index: this.state.index + 1 });
    } else this.state.errorCount += 1;

    if(this.state.index + 1 > this.state.fullText.length)
        this.handleFinish()
  }

  handleFinish() {
    alert("finished");
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
