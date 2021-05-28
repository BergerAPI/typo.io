<script>
  import anime from "animejs/lib/anime.es.js";
  import { onMount } from "svelte";

  let text = "Cheesemans cheese is cheese from cheeseman";
  let writtenText = "";
  var invalid = [16, 91, 18, 9, 20, 38, 37, 39, 40];

  /**
   * Sets the new position fot he caret with an nice animation
   */
  function updateCaret(animation = true) {
    const currentLetter = document.getElementById(
      (writtenText.length !== 0 ? writtenText.length - 1 : 0).toString()
    );
    const caret = document.getElementById("caret");

    // The dimension of the current letter
    const boundingRect = currentLetter.getBoundingClientRect();

    // Setting the height of the caret to the font-height
    caret.style.height = currentLetter.offsetHeight + "px";

    const left =
      boundingRect.x +
      (writtenText.length !== 0 ? currentLetter.offsetWidth : 0);

    // Animating the movement with the anime.js library or just without any animation
    if (animation)
      anime({
        targets: caret,
        left,
        top: boundingRect.y,
        duration: 150,
        easing: "easeOutQuad",
      });
    else {
      caret.style.left = left + "px";
      caret.style.top = boundingRect.y + "px";
    }
  }

  function handleKeydown(event) {
    if (invalid.includes(event.keyCode)) return;

    // Checks if the game is finished
    if (writtenText.length >= text.length && event.key !== "Backspace") return;

    // Removes a letter and makes the normal letter white again
    if (event.key === "Backspace") {
      const element = document.getElementById(
        (writtenText.length > 0
          ? writtenText.length - 1
          : writtenText.length
        ).toString()
      );

      writtenText = writtenText.substring(0, writtenText.length - 1);
      element.style.color = "white";
      element.style.textDecoration = "";
    } else {
      const condition = text[writtenText.length] === event.key;
      const element = document.getElementById(writtenText.length.toString());

      console.log(element);

      writtenText += event.key;
      element.style.color = condition ? "#77dd77" : "red";

      if (!condition) element.style.textDecoration = "underline";
    }
    updateCaret();
  }

  onMount(() => {
    if (document.getElementById("caret")) {
      updateCaret(false);
    }
  });
</script>

<svelte:window on:keydown={handleKeydown} />

<div id="caret" />

<div id="textfield">
  {#each text as c, i}
    <letter id={i}>{c}</letter>
  {/each}
</div>

<style>
  #textfield {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-family: "Source Code Pro", serif;
    user-select: none;
  }

  #caret {
    position: fixed;
    width: 2px;
    height: 35px;
    background-color: white;
  }
</style>
