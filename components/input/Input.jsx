import React from "react";
import anime from "animejs";
import styles from "../../styles/components/Input.module.css";
import MoonLoader from "react-spinners/MoonLoader";

import { getQuote, getRandomText, randomString } from "../../util/helper.js";
import { initSounds, playSound } from "../../util/sound/sound-handler.js";
import { calculate } from "../../util/logic/type-logic.js";
import { db, auth } from "../../util/firebase/firebase.js";

import { Config } from "../../util/config.js";

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
    this.timer = undefined;
    this.config = new Config();
  }

  caret = React.createRef();

  /**
   * Starts the timer to calculate the wpm for example
   */
  startTimer() {
    this.setState({
      time: this.state.time,
      start: Date.now(),
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

      if (this.config.get("mode") !== "Text") {
        if (
          this.state.time >
          parseInt(this.state.timeText.split(" / ")[1].substring(0, 2)) * 1000
        ) {
          await this.handleFinish();
          clearInterval(this.timer);
        }
      }
    }, 1);
  }

  /**
   * Updates the caret
   */
  updateCaret() {
    if (typeof document !== "undefined") {
      let remainingIndex = this.state.index - this.state.typedText.length;
      if (remainingIndex === 0) remainingIndex = 0;

      let letterDoc = document.getElementById(remainingIndex);

      if (letterDoc) {
        let caret = document.getElementById("caret");

        let currentLetterLeftOffset = letterDoc.offsetLeft;
        let currentLetterTopOffset = letterDoc.offsetTop;

        let newLeft =
          currentLetterLeftOffset +
          Math.ceil(letterDoc.clientWidth) +
          caret.style.width / 2;

        let newTop = currentLetterTopOffset + Math.ceil(letterDoc.clientHeight);

        anime({
          targets: caret,
          left: newLeft,
          top: newTop,
          duration: 150,
          easing: "easeOutQuad",
        });
      }
    }
  }
  /**
   * Sets all states that are important for the component
   */
  async setupConfig() {
    let language = this.config.get("language");

    await this.config.loadTheme();
    this.state.unit = this.config.get("unit");

    if (this.config.get("mode") !== "Text")
      this.setState({ timeText: " / " + this.config.get("mode") });

    this.setState({
      fontSize: this.config.get("fontSize"),
      font: this.config.get("fontFamily"),
    });

    if (this.config.get("inputMode") === "Quotes") {
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
    this.updateCaret();
  }

  /**
   * Handles a input with a key that's not shift, command etc.
   * @see http://javascriptkeycode.com
   */
  async handleValidInput(event) {
    if (this.state.index == 0) this.startTimer();

    if (this.config.get("clickSounds")) playSound("click_sounds");

    if (event.key !== this.state.fullText[this.state.index]) {
      this.setState({ errorCount: this.state.errorCount + 1 });
      if (this.config.get("errorSounds")) playSound("error_sounds");
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

    this.updateCaret();

    if (this.state.index === this.state.fullText.length)
      await this.handleFinish();
  }

  /**
   * Handles a restart request by the user, and basically just
   * sets all states to the default and inits the config
   */
  handRestart() {
    if (this.timer) clearInterval(this.timer);

    this.setState({
      index: 0,
      typedText: "",
      remainingText: this.props.text,
      fullText: this.props.text,
      author: this.props.author,
      errorCount: 0,
      time: 0.0,
      start: 0.0,
      timeText: "",
      fontSize: "15px",
      font: "Arial",
      restartSelected: false,
      wpmData: [],
      rawData: [],
      number: [],
    });

    this.setupConfig();
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
        let userDoc = await db.collection("users").doc(authUser.uid);
        let doc = await userDoc.get();

        if (!doc.data().banned) {
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

          let userData = doc.data();
          let stats = userData.stats;
          stats.push(id);

          userDoc
            .update({
              stats: stats,
            })
            .then(() => this.props.finish(finishState));
        }
      } else this.props.finish(finishState);
    });
  }

  /**
   * @see https://reactjs.org/docs/react-component.html
   */
  async componentDidMount() {
    let letters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZöüäß.?!;’-:,'\"АаБбВвГгДдЕеЁёЖжЗзІіЙйКкЛлМмНнОоПпРрСсТтУуЎўФфХхЦцЧчШшЫыЬьЭэЮюЯя ";

    initSounds();

    // Im basically using the "normal" javascript way to detect
    // a click because the react way is shitty and can't replace
    // this method.
    document.addEventListener(
      "keydown",
      async (event) => {
        if (letters.includes(event.key)) this.handleValidInput(event);
        else if (event.keyCode == 8 && this.state.index > 0)
          this.handleBackspace();
        else if (event.keyCode == 13 && this.state.restartSelected)
          this.handRestart();
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

    for (let i = 0; i < this.state.remainingText.length; i++)
      remaining.push(
        <a className={styles.remaining} id={i}>
          {this.state.remainingText[i]}
        </a>
      );

    for (let i = 0; i < this.state.typedText.length; i++) {
      let value = this.state.typedText[i];
      if (value !== this.state.fullText[i])
        typed.push(
          <a key={i} className={styles.wrong}>
            {this.state.fullText[i]}
          </a>
        );
      else
        typed.push(
          <a key={i} className={styles.typed}>
            {value}
          </a>
        );
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
                    <div
                      className={styles.caret}
                      style={{ height: parseInt(this.state.fontSize, 10) }}
                      id="caret"
                    />
                    {typed}
                    {remaining}
                  </p>
                </div>
                <p
                  className={styles.author}
                  style={{ fontFamily: this.state.font }}
                >
                  ~ {this.state.author}
                </p>
              </div>
            );
        })()}
      </>
    );
  }
}
