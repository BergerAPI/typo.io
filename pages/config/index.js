import { Checkbox } from "../../components/config/Checkbox.jsx"
import { Mode } from "../../components/config/Mode.jsx"
import MovingLayout from "../../components/layout/Moving-Layout.js"

export default function Home() {
  return (
    <>
      <Checkbox title="Error Sound" description="If this is enabled, you will hear a sound, every time you type a error. (Not recommend on Macbook's)" item="errorSounds" />
      <Checkbox title="Click Sound" description="If this is enabled, you will hear a sound, every time you press a key. (Not recommend on Macbook's)" item="clickSounds" />
      <Mode title="Input Mode" description="If you want to type quotes in you selected language, or just randomly placed words." item="inputMode" values={["Words", "Quotes"]} />
      <Mode title="Unit" description="If you want to see your wpm or your cpm." item="unit" values={["WPM", "CPM"]} />
      <Mode title="Mode" description="If you want to play in time, or just write a text." item="mode" values={["Text", "10s", "15s", "30s", "60s"]} />
      <Mode title="Language" description="The Language, in which you want to type in" item="language" values={["English", "German", "France", "Russia"]} />
      <Mode title="Font-Size" description="The size of the font" item="fontSize" values={["15px", "20px", "25px", "30px"]} />
      <Mode title="Font" description="The font" item="fontFamily" values={["Arial", "monospace", "Roboto Mono", "Source Code Pro"]} />
    </>
  )
}

Home.Layout = MovingLayout;