import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-primary-700 text-white shadow-md">
      <div className="container mx-auto py-4 px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          AIデータ分析アプリ
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="hover:text-primary-300 transition-colors">
                ホーム
              </Link>
            </li>
            <li>
              <Link href="/history" className="hover:text-primary-300 transition-colors">
                履歴
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-primary-300 transition-colors">
                このアプリについて
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
