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
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZöüäß.?!;-:,'\" ",
      time: 0.0,
      start: 0.0,
      wpm: 0.0,
      lastSoundIndex: 0,
      clickSounds: [],
      errorSound: undefined,
      words: [],
      unit: undefined,
      timeText: "",
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
      if (localStorage.getItem("mode")) {
        if (localStorage.getItem("mode") !== "Time") {
          if (this.state.time > parseInt(localStorage.getItem("mode").substring(0, 2)) * 1000) this.handleFinish();
        }
      }
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

    this.state.unit = localStorage.getItem("unit")
      ? localStorage.getItem("unit")
      : "WPM";

    if (!localStorage.getItem("mode")) localStorage.setItem("mode", "15s");

    if (localStorage.getItem("mode") !== "Text")
      this.setState({ timeText: " / " + localStorage.getItem("mode") });

      console.log(this.state.timeText)

    if (
      localStorage.getItem("input_mode")
        ? localStorage.getItem("input_mode") == "Quotes"
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
      typedText: this.state.typedText.substring(
        0,
        this.state.typedText.length - 1
      ),
    });
  }

  handleValidInput(event) {
    if (this.state.index == 0) this.startTimer();

    if (localStorage.getItem("click_sounds") === "true")
      playSound("click_sounds");

    if (event.key !== this.state.fullText[this.state.index]) {
      this.setState({ errorCount: this.state.errorCount + 1 });
      if (localStorage.getItem("error_sounds") === "true")
        playSound("error_sounds");
    }

    this.state.typedText += event.key;
    this.state.remainingText = this.state.remainingText.slice(
      1,
      this.state.remainingText.length
    );
    this.setState({
      index: this.state.index + 1,
    });

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

    let typed = [];
    let remaining = [];

    for (let i = 0; i < this.state.fullText.length; i++)
      remaining.push(
        <a className={styles.remaining}>{this.state.remainingText[i]}</a>
      );

    for (let i = 0; i < this.state.typedText.length; i++) {
      let value = this.state.typedText[i];
      if (value !== this.state.fullText[i])
        typed.push(<a className={styles.wrong}>{this.state.fullText[i]}</a>);
      else {
        typed.push(<a>{value}</a>);
      }
    }
    typed.push(<img className={styles.carrot} src="/carrot.png"></img>);

    return (
      <div>
        <div className={styles.information}>
          <p className={styles.code}>Errors: {this.state.errorCount} </p>
          <p className={styles.code}>Letters: {this.state.typedText.length} </p>
          <p className={styles.code}>
            Time elapsed: {Math.round((this.state.time / 1000) * 1) / 1}s{" "}
            {this.state.timeText}
          </p>
          <p className={styles.code}>
            {this.state.unit}:{" "}
            {this.state.unit === "WPM" ? calculated.wpm : calculated.cpm}
          </p>
          <p className={styles.code}>Raw: {calculated.raw}</p>
          <p className={styles.code}>Accuracy: {calculated.accuracy}%</p>
        </div>
        <div className={styles.text}>
          <p>
            {typed}
            {remaining}
          </p>
        </div>
        <p className={styles.author}>~ {this.state.author}</p>
      </div>
    );
  }
}
