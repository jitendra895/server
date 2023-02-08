import Link from 'next/link';

const Navbar = () => (
  <nav>
    <ul>
      <li>
        <Link href="/">
          Questions
        </Link>
      </li>
      <li>
        <Link href="/countdownTime">
        CountdownTime
        </Link>
      </li>
      <li>
        <Link href="/winner">
         Winners
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
