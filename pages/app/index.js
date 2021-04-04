import { Input } from '../../components/input/Input.jsx'
import { promises as fs } from 'fs'
import path from 'path'

export default function App({ text, author }) {
  return (
    <>
        <Input text={text} author={author} />
    </>
  )
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

export async function getServerSideProps() {
  const dataPath = path.join(process.cwd(), '/public/data/quotes.json')
  const data = await fs.readFile(dataPath, 'utf8')
  const jsonObject = JSON.parse(data);

  let quoteLenght = jsonObject.messages.length - 1;
  let quote =
    jsonObject.messages[
    Math.floor(randomNumber(0, quoteLenght))
    ];

  return {
    props: {
      text: quote.quote,
      author: quote.author,
    }
  };
}