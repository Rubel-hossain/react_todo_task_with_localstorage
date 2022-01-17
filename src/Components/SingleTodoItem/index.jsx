import React from "react";
import { ListGroup } from "react-bootstrap";
import "./css/single_todo_item.css";

export default function Index({ 
    todoList,
     handleEdit,
     editAble, 
    handleDeleteTodo }){
   
    return (
        <ListGroup>
            {todoList.slice(0).reverse().map(item=>(
             <ListGroup.Item className="d-flex justify-content-between align-items-center" key={item.id}>
                <div>
                    { item.todoItem}
                </div>
                <div className="button-group">
                    <button 
                    className="btn btn-sm btn-info"
                    onClick={()=>handleEdit(item.id)}
                    disabled={editAble}
                    >Edit</button>
                    <button 
                    className="btn btn-sm btn-danger ms-2"
                    disabled={editAble}
                    onClick={()=>handleDeleteTodo(item.id)}
                    >Delete</button>
                </div>
              </ListGroup.Item>
            ))}

        </ListGroup>
    )
}