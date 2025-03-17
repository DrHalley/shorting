import { Link } from '@prisma/client';

import Image from 'next/image';

import { useState } from 'react';
import { Button } from './ui/button';

export default function LinkComponent({ link }: { link: Link }) {
  const [responseMessage, setResponseMessage] = useState('');
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch('/api/url/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: link.id }),
    });
    const dataa = await response.json();
    setResponseMessage(`${dataa.shortUrl} is  succesfully deleted`);
  };
  return responseMessage ? (
    responseMessage
  ) : (
    <div className="border-2 shadow-2xl flex justify-between rounded-2xl px-5 my-5">
      <div className="flex items-center">{link.shortUrl}</div>
      <div className="flex items-center">
        <a href={link.original}>Redirected Link</a>
      </div>
      <div className="flex items-center my-2">
        <form onSubmit={handleSubmit}>
          <Button variant={'destructive'} type="submit">
            <Image src="/trash.png" alt={'tersh can'} width={25} height={25} />
          </Button>
        </form>
      </div>
    </div>
  );
}
