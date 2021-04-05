import { Checkbox } from "../../components/config/Checkbox.jsx"
import { Mode } from "../../components/config/Mode.jsx"

export default function Home() {
  return (
    <>
      <Checkbox title="Error Sound" description="If this is enabled, you will hear a sound, every time you type a error. (Not reommend on Macbook's)" item="error_sounds" />
      <Checkbox title="Click Sound" description="If this is enabled, you will hear a sound, every time you press a key. (Not reommend on Macbook's)" item="click_sounds" />
      <Mode title="Mode" description="If you want to type quotes in you selected language, or just randomly placed words." item="mode" values={["Words", "Quotes"]} />
      <Mode title="Language" description="The Language, in which you want to type in" item="language" values={["English", "German", "France", "Russia"]} />
   </>
  )
}
