export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 mt-auto py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-gray-600 dark:text-gray-300">
              &copy; {currentYear} AIデータ分析アプリ
            </p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              安全にデータ分析をお手伝いします
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
