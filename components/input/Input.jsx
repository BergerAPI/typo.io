import React from "react";
import styles from "../../styles/components/Input.module.css";
import axios from "axios";

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

  randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  componentDidMount() {
    console.log("Component mounted.");
    console.log(
      'Received Text: "' +
        this.state.fullText +
        '" by/from "' +
        this.state.author +
        '"'
    );
    for (let i = 1; i < 6; i++) {
      this.state.clickSounds.push(
        new Audio("/sound/click/click_" + i + ".wav")
      );
      console.log('Preloaded audio file: "/sound/click/click_' + i + '.wav"');
    }

    this.setState({ clickSounds: this.state.clickSounds });
    this.setState({ errorSound: new Audio("/sound/error.wav") });

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

    axios
      .get(
        "http://localhost:3000/api/language/" +
          (localStorage.getItem("language")
            ? localStorage.getItem("language")
            : "english")
      )
      .then((res) => {
        const data = res.data;

        if (localStorage.getItem("mode") ? localStorage.getItem("mode") == "Quotes" : true) {
          let quoteLenght = data.quotes.length - 1;
          let quote =
            data.quotes[Math.floor(this.randomNumber(0, quoteLenght))];

          this.setState({
            fullText: quote.quote.toString(),
            author: quote.author.toString(),
            remainingText: quote.quote.toString(),
          });
        }else {
          let text = "";

          for(let i = 0; i < this.randomNumber(10, 20); i++)
            text += data.words[Math.floor(Math.random() * data.words.length)] + " "
          text = text.substring(0, text.length - 1)

          this.setState({
            fullText: text,
            author: "Alphabet",
            remainingText: text,
          });
        }
      });

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
      if (this.state.index == 0) this.startTimer();

      if (localStorage.getItem("click_sounds") === "true")
        this.state.clickSounds[this.state.lastSoundIndex].play();
      this.setState({
        lastSoundIndex:
          this.state.lastSoundIndex + 1 >= 5
            ? 0
            : this.state.lastSoundIndex + 1,
      });

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
        this.state.errorSound.play();
    }

    if (this.state.index + 1 > this.state.fullText.length) this.handleFinish();
  }

  handleFinish() {
    window.location.reload();
  }

  calculateWpm() {}

  render() {
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
          <p className={styles.code}>
            WPM:{" "}
            <code className={styles.timeElapsed}>
              {(
                (this.state.typedText.length /
                  Math.round(((this.state.time / 1000) * 100) / 100)) *
                5
              ).toString()}
            </code>{" "}
          </p>
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
