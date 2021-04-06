import React from "react";
import styles from "../../styles/components/Input.module.css";

import { getQuote, getRandomText } from "../../util/helper.js";
import { initSounds, playSound } from "../../util/sound/sound-handler.js";
import { calculate } from "../../util/logic/type-logic.js";

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
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZöüäß.?!;:,'\" ",
      time: 0.0,
      start: 0.0,
      wpm: 0.0,
      lastSoundIndex: 0,
      clickSounds: [],
      errorSound: undefined,
      words: [],
    };

    this.state.fullText.split(" ").forEach((element) => {
      this.state.words.push(element);
    });
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
    }, 1);
  }

  async componentDidMount() {
    console.log("Component mounted.");
    initSounds();

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

    let language = localStorage.getItem("language")
      ? localStorage.getItem("language")
      : "english";

    if (
      localStorage.getItem("mode")
        ? localStorage.getItem("mode") == "Quotes"
        : true
    ) {
      let quote = await getQuote(language);
      console.log(quote);

      this.setState({
        fullText: quote.quote.toString(),
        author: quote.author.toString(),
        remainingText: quote.quote.toString(),
      });
    } else {
      let text = await getRandomText(language);

      this.setState({
        fullText: text,
        author: "Alphabet",
        remainingText: text,
      });
    }
  }

  handleBackspace() {
    this.setState({
      remainingText:
        this.state.fullText[this.state.index - 1] + this.state.remainingText,
    });
    this.setState({ index: (this.state.index -= 1) });
    this.setState({
      typedText: this.state.typedText.substring(0, this.state.typedText.length),
    });
  }

  handleValidInput(event) {
    if (event.key === this.state.fullText[this.state.index]) {
      if (this.state.index == 0) this.startTimer();

      if (localStorage.getItem("click_sounds") === "true")
        playSound("click_sounds");

      this.state.typedText += this.state.fullText[this.state.index];
      this.state.remainingText = this.state.remainingText.slice(
        1,
        this.state.remainingText.length
      );
      this.setState({
        index: this.state.index + 1,
      });
    } else {
      this.setState({ errorCount: this.state.errorCount + 1 });
      if (localStorage.getItem("error_sounds") === "true")
        playSound("error_sounds");
    }

    if (this.state.index + 1 > this.state.fullText.length) this.handleFinish();
  }

  handleFinish() {
    window.location.reload();
  }

  render() {
    let calculated = calculate(
      this.state.time,
      this.state.typedText,
      this.state.errorCount,
      this.state.words
    );

    return (
      <div>
        <div className={styles.information}>
          <p className={styles.code}>Errors: {this.state.errorCount} </p>
          <p className={styles.code}>Letters: {this.state.typedText.length} </p>
          <p className={styles.code}>
            Time elapsed:{" "}
            <code className={styles.timeElapsed}>
              {Math.round((this.state.time / 1000) * 1) / 1}
            </code>{" "}
            seconds
          </p>
          <p className={styles.code}>WPM: {calculated.wpm}</p>
          <p className={styles.code}>Raw: {calculated.raw}</p>
          <p className={styles.code}>Accuracy: {calculated.accuracy}%</p>
        </div>
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
