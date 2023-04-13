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
      <li>
        <Link href="/users">
         Users
        </Link>
      </li>
      <li>
        <Link href="/scorecard">
         ScoreCard
        </Link>
      </li>
      <li>
        <Link href="/transferData">
         BakupQuestions
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
