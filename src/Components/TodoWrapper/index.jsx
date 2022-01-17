import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import SingleTodoItem from "../SingleTodoItem"

export default function Index(){
    const [inputValue, setInputValue] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [editAble, setEditAble] = useState(false);
    const handleChange = (e)=>{
        const whiteSpace = e.target.value.indexOf(" ");
        if(whiteSpace !== 0){
            setInputValue(e.target.value);
        }
    }
    const habdleFormSubmit = (e) => {
        setTodoList(prevState=>{
            if(inputValue !== ""){
             const getNewTime = new Date().getTime();
              setTodoList([...todoList, {todoItem: inputValue, createdAt: getNewTime, id: uuidv4()}])
            }
        });
        setInputValue("");
        e.preventDefault();
    }

    const handleEdit = (id) => {
      const singleItem =  todoList.find(item=>item.id === id);
      setInputValue(singleItem.todoItem);
      todoList.filter(item=>item.id !== id)
      setTodoList(todoList.filter(item=>item.id !== id));
      setEditAble(true);
   }

   const handleUpdate = () => {
    setEditAble(false);
   }

   const handleDeleteTodo = (id) => {
    setTodoList(todoList.filter(item=>item.id !== id));
   }


   const getLocalTodoList = () => {
    if (localStorage.getItem("toDoList") == null) {
      localStorage.setItem("toDoList", JSON.stringify([]));
    } else {
      let toDoListLocal = JSON.parse(localStorage.getItem("toDoList"));
      setTodoList(toDoListLocal);
    }
  };

   useEffect(() => {
    getLocalTodoList();
  }, []);

  useEffect(() => {
    localStorage.setItem("toDoList", JSON.stringify(todoList));
  }, [todoList]);


    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6 mx-auto my-5">
                 <h2 className="pb-4">React todo application by : Rubel Hossain</h2>
                    <div className="todo-wrapper">
                        <form onSubmit={habdleFormSubmit}>
                            <input 
                            className="form-control mb-3" 
                            placeholder="Type Todo Here"
                            onChange={handleChange}
                            value={inputValue}
                            required  />
                            { editAble ? (
                            <button 
                            type="submit" 
                            disabled={inputValue === "" ? true : false} 
                            onClick={handleUpdate}
                            className="btn btn-success">Update Todo</button>
                            ) : (
                            <button 
                            type="submit" 
                            disabled={inputValue === "" ? true : false} 
                            className="btn btn-success">Add Todo</button>
                            )}

                        </form>
                    </div>
                    <div className="todo-lists-wrapper mt-4">
                    <SingleTodoItem 
                    todoList={todoList}
                    handleEdit={handleEdit}
                    editAble={editAble}
                    handleDeleteTodo={handleDeleteTodo}
                    />
                  </div>
                </div>
            </div>
        </div>
    )
}