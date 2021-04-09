import { Input } from '../../components/input/Input.jsx'
import { auth } from "../../util/firebase/firebase";

export default function App() {
  if (auth.currentUser === undefined) auth.signInAnonymously();
  
  return (
    <div>
      <Input text="Loading..." author="Loading..." />
    </div>
  )
}