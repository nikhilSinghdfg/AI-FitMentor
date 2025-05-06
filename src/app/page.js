import { redirect } from 'next/navigation';

export default function Home() {

  redirect('/authentications/Signup');


  return null;
}
