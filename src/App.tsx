import { forms } from './forms'

// The app's single page: every form in src/forms, which reqMgmt's Build writes.
export default function App() {
  return (
    <main className="app">
      {forms.length === 0 ? (
        <>
          <h1>Credit application</h1>
          <p>No form yet. Build one in reqMgmt and it appears here.</p>
        </>
      ) : (
        forms.map((Form, index) => <Form key={index} />)
      )}
    </main>
  )
}
