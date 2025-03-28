import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AIデータ分析アプリ',
  description: 'データを入力するとAIが分析してレポートを生成するアプリケーション',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow container mx-auto py-8 px-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
