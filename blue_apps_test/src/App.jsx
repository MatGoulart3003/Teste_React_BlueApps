import { useState } from "react"

function App() {  

  const [title, setTitle] = useState ()
  const [anotation, setAnotation] = useState ();
  const [createAnotationButton, setCreateAnotationButton] = useState (false)
  const [anotationList, setAnotationList] = useState([])

  const handleCreateAnotationButton = () => {
    setCreateAnotationButton(!createAnotationButton)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescricaoChange = (event) => {
    setAnotation(event.target.value);
  };

  return (
    <div>
     <h1>App de Anotações</h1>
     {!createAnotationButton && (
      <button type="button" onClick={handleCreateAnotationButton}> Criar Anotação</button>
     )}
    
     {createAnotationButton && (
      <form>
        Criação de anotação:
        <label>
          Titulo: <input type="text" value={title} onChange={handleTitleChange}/>          
        </label>
        <label>
          Descrição: <input type="text" value={anotation} onChange={handleDescricaoChange} />
        </label>
        <button type="button" onClick={handleCreateAnotationButton}> Salvar </button>

      </form>
     )}

      <div>
        <h1> {title} </h1>
        <h1> {anotation} </h1>
      </div>

    </div>
  )
}

export default App
