'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/navbar';
import { Link } from '@prisma/client';
import LinkComponent from '@/components/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QRCodeSVG } from 'qrcode.react';
export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [url, setUrl] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [data, setData] = useState<Link[] | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/getmylinks')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setData(data);
          setLoading(false);
        } else {
          setData([]);
          setLoading(false);
        }
      });
  }, []);

  if (status === 'loading') {
    return <div>loading</div>;
  }

  if (!session) return router.push('/login');
  if (isLoading) return <p>Loading...</p>;
  if (!data) return router.push('/login');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch('/api/url/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });
    const dataa = await response.json();
    setResponseMessage(`Your url has shortened: ${dataa.shortUrl}`);
  };
  const handleSubmitQr = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const qrcode = document.getElementById('qrcode');
    if (!qrcode) return;
    qrcode.setAttribute('class', 'block');
  };
  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <Tabs defaultValue="link" className="w-[400px]">
          <div className=" flex justify-center">
            <TabsList>
              <TabsTrigger value="link">Shorten as a Link</TabsTrigger>
              <TabsTrigger value="qr">Shorten as a QR Code</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="link">
            <form onSubmit={handleSubmit} className="pt-5">
              <div className="flex justify-center">
                <label>
                  Link:{' '}
                  <input
                    className=" border-black border-2"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                  />
                </label>
              </div>
              <div className="flex justify-center pt-5">
                <Button type="submit">Short the Link</Button>
              </div>
              <p className="text-center pt-5">{responseMessage}</p>
            </form>
          </TabsContent>
          <TabsContent value="qr">
            <form onSubmit={handleSubmitQr} className="pt-5">
              <div className="flex justify-center">
                <label>
                  Link:{' '}
                  <input
                    className=" border-black border-2"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                  />
                </label>
              </div>
              <div className="flex justify-center pt-5">
                <Button type="submit">Short the Link</Button>
              </div>
              <div className="flex justify-center mt-5">
                <QRCodeSVG id="qrcode" className=" hidden" value={url} />
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </div>

      <div className="flex justify-center">
        <div className=" w-4/5 bg-green-300 rounded-2xl py-5 px-2">
          {data.map((link) => (
            <LinkComponent link={link} key={link.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
