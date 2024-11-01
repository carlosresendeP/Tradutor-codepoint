import { useEffect, useState } from 'react'


const Languages = [
  { code: 'en', name: 'Inglês' },
  { code: 'es', name: 'Espanhou' },
  { code: 'fr', name: 'Frandês' },
  { code: 'de', name: 'Alemão' },
  { code: 'it', name: 'Italiano' },
  { code: 'pt', name: 'Português' },
]

/*
  LÓGICA DE PROGRAMAÇÃO
  
  [X] Selecionar idiomas iniciais corretamente
  [x] Saber quando o usuário digitou algo no textarea
  [x] Reuinr as informações para enviar para o servidor
      [x]Idioma atual
      [x]idioma a ser tarduzido
      [x]texto do idioma
  [x] ativar o loanding
  [x] mandar os dados para o servidor
  [x] desativar o loanding
      [x] ERRO - mostrar o erro na tela
      [x] Sucesso - mostrar texto traduzido  
  [x] inverter idiomas
      [x] reafazer busca de tradução



*/

function App() {
  const [sourceLang, setSourceLang] = useState('pt') //inicial
  const [TargetLang, setTargetLang] = useState('en') //alvo
  const [sourceText, setSourceText] = useState('') //Texto de origem
  const [isLoading, setIsLoading] = useState(false) //carregamento da animação
  const [traslatedText, setTraslatedText] = useState("") //tradução
  const [error, setError] = useState("") //erro


  //efeito colateral toda vez que ele roda chama a função
  useEffect(() => {
    //lingua de origem -sourceLang,
    //lingua que será traduzido -TargeteLang
    //do texto para traduzir - sourceText

    if (sourceText) {
      const delay = setTimeout(() => {
        handleTranslate()
      }, 300);

      return () => clearTimeout(delay)
    }

  }, [sourceText, TargetLang, sourceLang])



  const handleTranslate = async () => {
    //https://mymemory.translated.net/

    try {

      setIsLoading(true)
      setError('')
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${sourceText}!&langpair=${sourceLang}|${TargetLang}`)

      if (!response.ok) {
        throw new Error(`HTTP ERROR: ${response.status}`)

      }
      //dentro de responseData vai ter o translatedText
      const data = await response.json()
      //console.log(data)
      setTraslatedText(data.responseData.translatedText)

    } catch (err) {
      setError(`erro ao executar a tradução:${err.message}. Tente Novamente!`)

    } finally {
      setIsLoading(false)
    }



  }


  //botão de troca
  //inverssão de valores do set
  const swapTranslate = () => {
    setSourceLang(TargetLang)
    setTargetLang(sourceLang)
    setSourceText(traslatedText)
    setTraslatedText(sourceText)
  }


  return (
    <>
      <div className='min-h-screen bg-background flex flex-col'>
        <header className='bg-white shadow-sm'>
          <div className='max-w-5xl mx-auto px-4 py-3 flex items-center'>
            <h1 className='text-headerColor text-2xl  font-normal'>Tradutor CodePoint</h1>
          </div>
        </header>

        <div>

          <main className='flex-grow flex items-start justify-center px-4 py-8 font-semibold'>
            <div className='w-full max-w-5xl bg-white rounded-lg shadow-md overflow-hidden'>
              <div className='flex items-center justify-between p-4 border-b border-gray-200'>

                <select value={sourceLang} onChange={event => setSourceLang(event.target.value)} className='text-sm text-textColor bg-transparent border-none focus:outline-none cursor-pointer'>

                  {Languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}

                    </option>

                  ))}
                </select>

                <button className='p-2 rounder-full hover:bg-gray-100 outline-none rounded-sm' onClick={swapTranslate}>
                  <svg

                    className="w-5 h-5 text-headerColor"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                </button>

                <select value={TargetLang} onChange={event => setTargetLang(event.target.value)} className='text-sm text-textColor bg-transparent border-none focus:outline-none cursor-pointer'>
                  {Languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>

                  ))}
                </select>
              </div>



              <div className='grid grid-cols-1 md:grid-cols-2'>

                <div className='p-4'>
                  <textarea
                    value={sourceText}
                    onChange={event => setSourceText(event.target.value)}
                    placeholder='Digite seu texto'
                    className='w-full h-40 text-lg text-textColor bg-transparent resize-none border-none outline-none'>

                  </textarea>
                </div>

                <div className='p-4 relative bg-secondaryBackgroud border-l border-gray-200'>

                  {isLoading ? (
                    <div className='absolute inset-0 flex items-center justify-center'>

                      <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500'></div>

                    </div>

                  ) : (
                    <p className='text-lg text-textColor'>{traslatedText}</p>
                  )
                  }

                </div>
              </div>


              {error && (
                <div className='p-4 bg-red-100 border-t border-red-400 text-red-700'>

                  {error}

                </div>
              )}


            </div>
          </main>
        </div>

        <footer className='bg-white border-t border-gray-200 mt-auto'>
          <div className='max-w-5xl mx-auto py-3 px-4 text-sm text-headerColor'>
            &copy; {new Date().getFullYear()} Tradutor CodePoint
          </div>
        </footer>

      </div>
    </>
  )
}

export default App
