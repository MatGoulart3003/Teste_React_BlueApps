import { useEffect, useState } from "react"
import api from "./Service/Api"

function App() {  

  const [id, setId] = useState (0)
  const [idEdited, setIdEdited] = useState(0)
  const [title, setTitle] = useState ('')
  const [body, setbody] = useState ('')
  const [createbodyButton, setCreatebodyButton] = useState (false)
  const [anotationList, setAnotationList] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  

  const handleCreatebodyButton = () => {
    setCreatebodyButton(!createbodyButton)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  };

  const handleDescricaoChange = (event) => {
    setbody(event.target.value)
  };

  const addAnotation = () => {
    if (title && body) {         
      const newAnotation = { id, title, body }
      if (isEditing){
        const editedAnotation = {id:idEdited, title, body}
        setAnotationList([...anotationList, editedAnotation]);
        setIsEditing(false);
      }else{
        setAnotationList([...anotationList, newAnotation])
        setId((id) => id + 1)  
      }      
      setTitle('')
      setbody('')
     
      handleCreatebodyButton()
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
    setbody(anotationToEdit.body)
    setIdEdited(anotationToEdit.id)
    setIsEditing(true)
    deleteAnotation(index)
    handleCreatebodyButton()
  };

  

  const getAnotationL = async () => {
    try{
      
      const response = await api.get('/posts')
      const formattedData = response.data
      .filter(item => item.userId === 1)
      .map(item => ({
        id: item.id,
        title: item.title,
        body: item.body
      }))
      setAnotationList(formattedData)      
      if (formattedData.length > 0) {
       setId(formattedData[formattedData.length - 1].id + 1)      
      }  
      
    }catch (error){
      console.error(error)
    }
  }
  
  useEffect(() => {
    getAnotationL();
  }, []);

  return (
    <div>
     <h1>App de Anotações</h1>
     {!createbodyButton && (
      <button type="button" onClick={handleCreatebodyButton}> Criar Anotação</button>
     )}
    
     {createbodyButton && (
      <form>
        <label>
          Titulo:
          <input type="text" value={title} onChange={handleTitleChange}/>          
        </label>
        <label>
          Descrição:
          <input type="text" value={body} onChange={handleDescricaoChange} />
        </label>       
            <button type="button" onClick={addAnotation}> Salvar </button>   
      </form>
     )}

    <h2>Lista de Anotações</h2>
      <ul>
        {anotationList.map((item, index) => (
          <li key={index}>
            <h3>{item.id}= </h3> <h3>{item.title}: </h3> <h3>{item.body}</h3> 
            <button type="button" onClick={() => editAnotation(index)}> Editar </button>
            <button type="button" onClick={() => deleteAnotation(index)}> Remover </button>
          </li>
          
        ))}
      </ul>

    </div>
  )
}

export default App
