import { useState } from 'react';
import { addWord } from '@/dbFunctions';

export default function AddWord() {
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const front = formData.get('front') as string;
    const back = formData.get('back') as string;

    addWord({ front, back }).then((res) => {
      if (res) {
        setIsSuccess(true);

        form.reset();
        setTimeout(() => {
          setIsSuccess(false);
        }, 1000);
      } else {
        setIsSuccess(false);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="front" placeholder="Front" />
      <input type="text" name="back" placeholder="Back" />
      {isSuccess && <h3 className="success">Success</h3>}
      <button type="submit">Add Word</button>
    </form>
  );
}
