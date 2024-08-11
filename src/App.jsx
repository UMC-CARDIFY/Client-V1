import Router from './routes'
import { SaveProvider } from './pages/NoteEditor/components/SaveContext'

function App() {
  return (
    <SaveProvider>
      <Router />
    </SaveProvider>

    
  )
}

export default App