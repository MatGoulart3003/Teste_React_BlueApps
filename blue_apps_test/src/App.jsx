/* eslint-disable react/no-array-index-key */
import { useState } from "react"

function App() {  

  const [title, setTitle] = useState ('')
  const [anotation, setAnotation] = useState ('')
  const [createAnotationButton, setCreateAnotationButton] = useState (false)
  const [anotationList, setAnotationList] = useState([])
  const [isEditing, setIsEditing] = useState(false)

  const handleCreateAnotationButton = () => {
    setCreateAnotationButton(!createAnotationButton)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  };

  const handleDescricaoChange = (event) => {
    setAnotation(event.target.value)
  };

  const addAnotation = () => {
    if (title && anotation) {
      const newAnotation = { title, anotation }
      if (isEditing){
        setAnotationList([...anotationList, newAnotation]);
        setIsEditing(false);
      }
      setAnotationList([...anotationList, newAnotation])
      setTitle('')
      setAnotation('')
      handleCreateAnotationButton()
    } else {
      alert('Por favor, preencha o título e a descrição.')
    }
  };
  
  const deleteAnotation = (index) => {
    const auxList = [...anotationList];
    auxList.splice(index, 1);
    setAnotationList(auxList);
  };

  const editAnotation = (index) => {
    const anotationToEdit = anotationList[index]
    setTitle(anotationToEdit.title)
    setAnotation(anotationToEdit.anotation)
    setIsEditing(true)
    deleteAnotation(index)
    handleCreateAnotationButton()
  };

  

  return (
    <div>
     <h1>App de Anotações</h1>
     {!createAnotationButton && (
      <button type="button" onClick={handleCreateAnotationButton}> Criar Anotação</button>
     )}
    
     {createAnotationButton && (
      <form>
        <label>
          Titulo:
          <input type="text" value={title} onChange={handleTitleChange}/>          
        </label>
        <label>
          Descrição:
          <input type="text" value={anotation} onChange={handleDescricaoChange} />
        </label>       
            <button type="button" onClick={addAnotation}> Salvar </button>   
      </form>
     )}

    <h2>Lista de Anotações</h2>
      <ul>
        {anotationList.map((item, index) => (
          <li key={index}>
            <strong>{item.title}</strong>: {item.anotation}
            <button type="button" onClick={() => editAnotation(index)}> Editar </button>
            <button type="button" onClick={() => deleteAnotation(index)}> Remover </button>
          </li>
          
        ))}
      </ul>

    </div>
  )
}

export default App
