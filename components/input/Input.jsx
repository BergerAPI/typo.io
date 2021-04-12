import React from "react";
import styles from "../../styles/components/Input.module.css";
import MoonLoader from "react-spinners/MoonLoader";

import { getQuote, getRandomText, randomString } from "../../util/helper.js";
import { initSounds, playSound } from "../../util/sound/sound-handler.js";
import { calculate } from "../../util/logic/type-logic.js";
import { db, auth } from "../../util/firebase/firebase.js";

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
      words: this.props.text.split(" "),
      unit: undefined,
      timeText: "",
      fontSize: "15px",
      font: "Arial",
      restartSelected: false,
      wpmData: [],
      rawData: [],
      number: [],
    };
  }

  /**
   * Starts the timer to calculate the wpm for example
   */
  startTimer() {
    this.setState({
      time: this.state.time,
      start: Date.now() - this.state.time,
    });
    this.timer = setInterval(async () => {
      this.setState({
        time: Date.now() - this.state.start,
      });

      if ((Math.round((this.state.time / 1000) * 1) / 1) % 1 === 0) {
        let calculated = calculate(
          this.state.time,
          this.state.typedText,
          this.state.errorCount,
          this.state.words
        );

        if (
          !this.state.number.includes(
            Math.round((this.state.time / 1000) * 1) / 1
          )
        ) {
          this.state.wpmData.push(calculated.wpm);
          this.state.rawData.push(calculated.raw);
          this.state.number.push(Math.round((this.state.time / 1000) * 1) / 1);

          this.setState({ wpmData: this.state.wpmData });
        }
      }

      if (localStorage.getItem("mode")) {
        if (localStorage.getItem("mode") !== "Time") {
          if (
            this.state.time >=
            parseInt(localStorage.getItem("mode").substring(0, 2)) * 1000
          ) {
            clearInterval(this.timer);
            await this.handleFinish();
          }
        }
      }
    }, 1);
  }

  /**
   * Sets all states that are important for the component
   * TODO: Clean this shitty peace of code and
   * TODO: use a json object in the localstorage
   */
  async setupConfig() {
    let language = localStorage.getItem("language")
      ? localStorage.getItem("language")
      : "english";

    this.state.unit = localStorage.getItem("unit")
      ? localStorage.getItem("unit")
      : "WPM";

    if (!localStorage.getItem("mode")) localStorage.setItem("mode", "15s");

    if (localStorage.getItem("mode") !== "Text")
      this.setState({ timeText: " / " + localStorage.getItem("mode") });

    if (!localStorage.getItem("font-size"))
      localStorage.setItem("font-size", "15px");

    this.setState({ fontSize: localStorage.getItem("font-size") });

    if (!localStorage.getItem("font-family"))
      localStorage.setItem("font-family", "Arial");

    this.setState({ font: localStorage.getItem("font-family") });

    if (
      localStorage.getItem("input_mode")
        ? localStorage.getItem("input_mode") == "Quotes"
        : true
    ) {
      let quote = await getQuote(language);

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

  /**
   * Handles a input with the keyCode of the backspace
   * @see http://javascriptkeycode.com
   */
  handleBackspace() {
    this.setState({
      remainingText:
        this.state.fullText[this.state.index - 1] + this.state.remainingText,
      index: (this.state.index -= 1),
      typedText: this.state.typedText.substring(
        0,
        this.state.typedText.length - 1
      ),
    });
  }

  /**
   * Handles a input with a key that's not shift, command etc.
   * @see http://javascriptkeycode.com
   */
  async handleValidInput(event) {
    if (this.state.index == 0) this.startTimer();

    if (localStorage.getItem("click_sounds") === "true")
      playSound("click_sounds");

    if (event.key !== this.state.fullText[this.state.index]) {
      this.setState({ errorCount: this.state.errorCount + 1 });
      if (localStorage.getItem("error_sounds") === "true")
        playSound("error_sounds");
    }

    this.state.typedText += event.key;
    this.setState({
      restartSelected: false,
      index: this.state.index + 1,
      remainingText: this.state.remainingText.slice(
        1,
        this.state.remainingText.length
      ),
    });

    if (this.state.index + 1 > this.state.fullText.length)
      await this.handleFinish();
  }

  /**
   * Handles the end of the game. Executed when the time runs out or the
   * User reaches the end of the text.
   */
  async handleFinish() {
    let calculated = calculate(
      this.state.time,
      this.state.typedText,
      this.state.errorCount,
      this.state.words
    );

    this.state.wpmData.push(calculated.wpm);
    this.state.rawData.push(calculated.raw);

    this.setState({ wpmData: this.state.wpmData });

    let finishState = {
      wpm: calculated.wpm,
      raw: calculated.raw,
      accuracy: calculated.accuracy,
      text: this.state.fullText,
      author: this.state.author,
      wpmData: this.state.wpmData,
      rawData: this.state.rawData,
    };

    await auth.onAuthStateChanged(async (authUser) => {
      let id = randomString();

      if (authUser !== null) {
        await db.collection("stats").add({
          displayName: authUser.displayName,
          userUid: authUser.uid,
          gameId: id,
          photo: authUser.photoURL,
          wpm: calculated.wpm,
          accuracy: calculated.accuracy,
          text: this.state.fullText,
          writtenText: this.state.typedText,
          time: this.state.time,
          timeStamp: Date.now(),
        });

        let userDoc = db.collection("users").doc(authUser.uid);

        userDoc.get().then((doc) => {
          let userData = doc.data();
          let stats = userData.stats;
          stats.push(id);

          userDoc
            .update({
              stats: stats,
            })
            .then(() => this.props.finish(finishState));
        });
      } else this.props.finish(finishState);
    });
  }

  /**
   * @see https://reactjs.org/docs/react-component.html
   */
  async componentDidMount() {
    initSounds();

    // Im basically using the "normal" javascript way to detect
    // a click because the react way is shitty and can't replace
    // this method.
    document.addEventListener(
      "keydown",
      async (event) => {
        if (this.state.validLetters.includes(event.key))
          this.handleValidInput(event);
        else if (event.keyCode == 8 && this.state.index > 0)
          this.handleBackspace();
        else if (event.keyCode == 13 && this.state.restartSelected)
          window.location.reload();
        else if (event.keyCode == 9) {
          event.preventDefault();
          this.setState({ restartSelected: true });
        }
      },
      false
    );

    await this.setupConfig();
  }

  /**
   * @see https://reactjs.org/docs/react-component.html
   */
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  /**
   * @see https://reactjs.org/docs/react-component.html
   */
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
        if (this.state.index - 1 === i)
          typed.push(<a style={{ "background-color": "grey" }}>{value}</a>);
        else typed.push(<a>{value}</a>);
      }
    }

    return (
      <>
        {(() => {
          if (this.state.author === this.props.text)
            return <MoonLoader color={"#FFF"} loading={true} />;
          else
            return (
              <div>
                <div className={styles.information}>
                  <p className={styles.code}>
                    Errors: {this.state.errorCount}{" "}
                  </p>
                  <p className={styles.code}>
                    Letters: {this.state.typedText.length}{" "}
                  </p>
                  <p className={styles.code}>
                    Time elapsed: {Math.round((this.state.time / 1000) * 1) / 1}
                    s {this.state.timeText}
                  </p>
                  <p className={styles.code}>
                    {this.state.unit}:{" "}
                    {this.state.unit === "WPM"
                      ? calculated.wpm
                      : calculated.cpm}
                  </p>
                  <p className={styles.code}>Raw: {calculated.raw}</p>
                  <p className={styles.code}>
                    Accuracy: {calculated.accuracy}%
                  </p>
                </div>
                <div className={styles.text}>
                  <p
                    style={{
                      fontSize: this.state.fontSize,
                      fontFamily: this.state.font,
                    }}
                  >
                    {typed}
                    {remaining}
                  </p>
                </div>
                <p className={styles.author}>~ {this.state.author}</p>
              </div>
            );
        })()}
      </>
    );
  }
}
