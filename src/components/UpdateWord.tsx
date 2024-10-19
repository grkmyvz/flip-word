import { useState } from 'react';
import { updateWord } from '@/dbFunctions';
import { CardData } from '@/types';

export default function UpdateWord({
  word,
  setUpdateComponent,
}: {
  word: CardData;
  setUpdateComponent: React.Dispatch<
    React.SetStateAction<React.ReactNode | null>
  >;
}) {
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const id = formData.get('id') as string;
    const front = formData.get('front') as string;
    const back = formData.get('back') as string;

    updateWord(Number(id), { front, back }).then((res) => {
      if (res) {
        setIsSuccess(true);

        setTimeout(() => {
          setIsSuccess(false);
          setUpdateComponent(null);
        }, 1000);
      } else {
        setIsSuccess(false);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <button onClick={() => setUpdateComponent(null)}>Return to back</button>
      <input type="hidden" name="id" value={word.id} />
      <input
        type="text"
        name="front"
        defaultValue={word.front}
        placeholder="Front"
      />
      <input
        type="text"
        name="back"
        defaultValue={word.back}
        placeholder="Back"
      />
      {isSuccess ? (
        <div>
          <h3 className="success">Success</h3>
          <p>Redirecting...</p>
        </div>
      ) : (
        <button type="submit">Edit Word</button>
      )}
    </form>
  );
}
