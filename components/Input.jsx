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
      author: this.props.author,
      errorCount: 0,
      validLetters:
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVW.?!;:,'\" ",
      time: 0.0,
      start: 0.0,
      wpm: 0.0,
    };
  }

  startTimer() {
    this.setState({
      time: this.state.time,
      start: Date.now() - this.state.time,
    });
    this.timer = setInterval(() => {
      this.setState({
        time: Date.now() - this.state.start,
      });
      console.log(this.state.time);
    }, 1);
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
      if (this.state.index == 0) {
        this.startTimer();
      }

      this.state.typedText += this.state.fullText[this.state.index];
      this.state.remainingText = this.state.remainingText.slice(
        1,
        this.state.remainingText.length
      );
      this.setState({
        index: this.state.index + 1,
      });
    } else this.setState({ errorCount: this.state.errorCount + 1 });

    if (this.state.index + 1 > this.state.fullText.length) this.handleFinish();
  }

  handleFinish() {
    window.location.reload();
  }

  render() {
    return (
      <div>
        <p className={styles.information}>
          <a>Errors: {this.state.errorCount} </a>
          <a>Letters: {this.state.typedText.length} </a>
          <a>
            WPM:{" "}
            {Math.round(this.state.typedText.length * (60 / this.state.time))}
          </a>
        </p>
        <div className={styles.text}>
          <p>
            <a className={styles.typed}>{this.state.typedText}</a>
            <a className={styles.remaining}>{this.state.remainingText}</a>
          </p>
        </div>
        <p className={styles.author}>~ {this.state.author}</p>
      </div>
    );
  }
}
