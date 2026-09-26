
import Header from './components/Header'
import {useState} from "react";
import type {Page} from "./types.ts";
import {MainContentPage} from "./pages/MainContentPage.tsx";
import {StartPage} from "./pages/StartPage.tsx";
import {CreditsPage} from "./pages/CreditsPage.tsx";

export default function App() {
  const [currentPageId, setCurrentPageId] = useState<Page>('start')

  const goToPage = (page: Page) => {
    setCurrentPageId(page)
    window.scrollTo({ top: 0 })
  }

  if (currentPageId === 'start') {
    return (
      <StartPage
        onStart={() => goToPage('main')}
        onCredits={() => goToPage('credits')}
      />
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 pb-12">
      <Header onBack={() => goToPage('start')} />
      {currentPageId === 'main'
        ? <MainContentPage />
        : <CreditsPage />}
    </div>
  )
}
