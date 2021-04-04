import { Checkbox } from "../../components/config/Checkbox.jsx"

export default function Home() {
  return (
    <>
      <Checkbox title="Error Sound" description="If this is enabled, you will hear a sound, every time you type a error." item="click_sounds" />
      <Checkbox title="Click Sound" description="If this is enabled, you will hear a sound, every time you press a key." item="click_sounds" />
    </>
  )
}
