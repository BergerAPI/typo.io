<script>
  import anime from "animejs/lib/anime.es.js";
  import { onMount } from "svelte";

  const invalid = [16, 91, 18, 9, 20, 38, 37, 39, 40];
  const text = "Cheesemans cheese is cheese from cheeseman";
  let writtenText = "";

  /**
   * Sets the new position fot he caret with an nice animation
   */
  function updateCaret(animation = true) {
    if (!document.getElementById("caret")) return;

    const isLastLetter = writtenText.length === text.length;

    const currentLetter = document.getElementById(
      isLastLetter ? text.length - 1 : writtenText.length.toString()
    );

    const caret = document.getElementById("caret");

    // The dimension of the current letter
    const boundingRect = currentLetter.getBoundingClientRect();

    // Setting the height of the caret to the font-height
    caret.style.height = currentLetter.offsetHeight + "px";

    let left = boundingRect.x + (isLastLetter ? boundingRect.width : 0);

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

  /**
   * Basic Keyboard inout event handler
   * @param event
   */
  function handleKeydown(event) {
    if (invalid.includes(event.keyCode)) return;

    // Checks if the game is finished
    if (writtenText.length + 1 >= text.length && event.key !== "Backspace") {
      resetText();
      return;
    }

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

      writtenText += event.key;
      element.style.color = condition ? "#77dd77" : "red";

      if (!condition) element.style.textDecoration = "underline";
    }
    updateCaret();
  }

  /**
   * Resets the entire text
   */
  function resetText() {
    writtenText = "";

    for (let i = 0; i < text.length; i++) {
      const element = document.getElementById(i.toString());

      element.style.color = "white";
      element.style.textDecoration = "";
    }

    updateCaret();
  }

  onMount(() => {
    updateCaret(false);
  });
</script>

<svelte:window
  on:keydown={handleKeydown}
  on:resize={() => updateCaret(false)}
  on:load={() => updateCaret(false)}
/>

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
    font-size: 40px;
  }

  #caret {
    position: fixed;
    width: 2px;
    height: 35px;
    background-color: white;
  }
</style>
